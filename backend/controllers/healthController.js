import axios from 'axios';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { success, error } from '../utils/response.js';

dotenv.config();
const prisma = new PrismaClient();

/**
 * GPT 진단 결과 생성 및 DB 저장
 */
export const getSafeHealthInfo = async (req, res) => {
  try {
    const { sex, age, height, weight, chronic, symptoms } = req.body;

    const prompt = `
당신은 의료인이 아니며, 건강 정보 검색을 도와주는 AI 도우미입니다.

아래 사용자의 정보를 참고하여, 증상과 유사할 수 있는 건강 상태 예시, 일반적으로 상담하는 진료과, 참고 가능한 영양제 성분 목록을 아래 JSON 형식으로 작성하세요.

주의사항:
- 진단, 질병, 치료, 처방 등의 단정적인 표현 금지
- 실제 질병명이 아니라 유사한 건강 상태나 일반 용어 사용
- 영양제는 성분 기준으로만 추천하며, 효과 표현은 하지 않음

응답 형식:
{
  "possible_conditions": ["감기", "피로 누적"],
  "recommended_departments": ["이비인후과", "내과"],
  "supplement_ingredients": ["비타민 C", "아연", "마그네슘"]
}

사용자 정보:
- 성별: ${sex}
- 나이: ${age}
- 키: ${height}
- 몸무게: ${weight}
- 기존 질환: ${chronic}
- 증상: ${symptoms}
`;

    const gptRes = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.4,
        max_tokens: 700,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    let gptReply = gptRes.data.choices[0].message.content.trim();
    if (gptReply.startsWith('```')) {
      gptReply = gptReply.replace(/```(?:json)?\s*/, '').replace(/```$/, '').trim();
    }

    let parsedResult;
    try {
      parsedResult = JSON.parse(gptReply);
    } catch (err) {
      return error(res, 500, 'GPT 응답이 JSON 형식이 아닙니다.', gptReply);
    }

    const userId = req.userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return error(res, 404, '사용자를 찾을 수 없습니다.');

    const diagnosisText = parsedResult.possible_conditions?.join(', ') || '';
    const departmentsText = parsedResult.recommended_departments?.join(', ') || '';

    await prisma.diagnosisRecord.create({
      data: {
        userId,
        symptoms,
        diagnosisResult: diagnosisText,
        departments: departmentsText,
        heightAtDiagnosis: height,
        weightAtDiagnosis: weight,
        smokingAtDiagnosis: user.smoking || false,
        drinkingFrequencyAtDiagnosis: user.drinkingFrequency || null,
        chronicDiseaseAtDiagnosis: user.chronicDisease || null,
        medicationsAtDiagnosis: user.medications || null,
      },
    });

    return success(res, '건강 정보 제공 및 저장 완료', {
      result: parsedResult,
      disclaimer:
        '이 정보는 건강 상식 제공용이며, 진단이나 치료를 대신하지 않습니다. 증상이 지속되면 반드시 병원을 방문해주세요.',
    });
  } catch (err) {
    console.error('GPT 오류:', err.response?.data || err.message);
    return error(res, 500, 'GPT 연결 실패');
  }
};

/**
 * 사용자 진단 이력 조회
 */
export const getDiagnosisHistory = async (req, res) => {
  try {
    const userId = req.userId;

    const records = await prisma.diagnosisRecord.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        symptoms: true,
        diagnosisResult: true,
        departments: true,
        createdAt: true,
      },
    });

    return success(res, '진단 기록 조회 성공', records);
  } catch (err) {
    console.error(err);
    return error(res, 500, '진단 기록 조회 실패');
  }
};

/**
 * 특정 진단 상세 조회
 */
export const getDiagnosisDetail = async (req, res) => {
  try {
    const userId = req.userId;
    const recordId = Number(req.params.id);

    const record = await prisma.diagnosisRecord.findUnique({
      where: { id: recordId },
    });

    if (!record) {
      return error(res, 404, '진단 기록을 찾을 수 없습니다.');
    }

    if (record.userId !== userId) {
      return error(res, 403, '이 진단 기록에 접근할 수 없습니다.');
    }

    return success(res, '진단 기록 상세 조회 성공', record);
  } catch (err) {
    console.error(err);
    return error(res, 500, '진단 기록 상세 조회 실패');
  }
};