import { NextResponse } from 'next/server';
import { db } from '@/db';
import { diagnosisRecords, supplementRecommendations, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { verify } from 'jsonwebtoken';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    // 사용자 인증 확인
    let userId: number | null = null;
    const authHeader = request.headers.get('authorization');
    
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const token = authHeader.split(' ')[1];
        const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: number };
        userId = decoded.userId;
      } catch (err) {
        // 토큰이 유효하지 않으면 userId는 null (비회원 처리)
      }
    }

    const { sex, age, height, weight, chronic, symptoms } = await request.json();

    const prompt = `
당신은 의료인이 아니며, 건강 정보 검색을 도와주는 AI 도우미입니다.

아래 사용자의 정보를 참고하여, 다음 JSON 형식으로 응답하세요.
예시:
{
  "possible_conditions": ["감기", "피로 누적"],
  "recommended_departments": ["이비인후과", "내과"],
  "supplement_recommendations": [
    { "name": "비타민 C", "effect": "면역력 강화" },
    { "name": "마그네슘", "effect": "근육 이완 및 스트레스 완화" }
  ]
}

주의사항:
- 진단, 질병, 치료, 처방 등의 단정적인 표현 금지
- 실제 질병명이 아니라 유사한 건강 상태나 일반 용어 사용
- 가능한 건강 상태 예시
- 일반적으로 상담하는 진료과
- 참고 가능한 영양제 성분 목록 (각 성분에 효능 포함)

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
        model: 'gpt-4',
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
      return NextResponse.json(
        { message: 'GPT 응답이 JSON 형식이 아닙니다.', debug: gptReply },
        { status: 500 }
      );
    }

    const {
      possible_conditions = [],
      recommended_departments = [],
      supplement_recommendations = [],
    } = parsedResult;

    // 비회원은 진단 결과만 응답
    if (!userId) {
      return NextResponse.json({
        message: '건강 정보 제공 완료 (비회원)',
        data: {
          result: { possible_conditions },
          disclaimer: '이 정보는 건강 상식 제공용이며, 진단이나 치료를 대신하지 않습니다. 증상이 지속되면 반드시 병원을 방문해주세요.',
        }
      });
    }

    // 회원인 경우 DB 저장
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      return NextResponse.json(
        { message: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const diagnosis = await db.insert(diagnosisRecords).values({
      userId,
      symptoms,
      diagnosisResult: possible_conditions.join(', '),
      departments: recommended_departments.join(', '),
      heightAtDiagnosis: height,
      weightAtDiagnosis: weight,
      smokingAtDiagnosis: user.smoking || false,
      drinkingFrequencyAtDiagnosis: user.drinkingFrequency || null,
      chronicDiseaseAtDiagnosis: user.chronicDisease || null,
      medicationsAtDiagnosis: user.medications || null,
    }).returning();

    if (supplement_recommendations.length > 0) {
      await db.insert(supplementRecommendations).values({
        userId,
        basedOnDiagnosisId: diagnosis[0].id,
        recommendations: JSON.stringify(supplement_recommendations),
        wasViewed: false,
      });
    }

    return NextResponse.json({
      message: '건강 정보 제공 및 저장 완료',
      data: {
        result: { possible_conditions },
        disclaimer: '이 정보는 건강 상식 제공용이며, 진단이나 치료를 대신하지 않습니다. 증상이 지속되면 반드시 병원을 방문해주세요.',
      }
    });
  } catch (err: any) {
    console.error('GPT 오류:', err.response?.data || err.message);
    return NextResponse.json(
      { message: 'GPT 연결 실패' },
      { status: 500 }
    );
  }
} 