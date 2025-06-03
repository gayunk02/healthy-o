import { NextResponse } from 'next/server';
import { db } from '@/db';
import { diagnosisResults } from '@/db/schema';
import { jwtVerify } from 'jose';
import axios, { AxiosError } from 'axios';

export async function POST(request: Request) {
  try {
    console.log('[Health Diagnosis API] Received request');
    
    const body = await request.json();
    console.log('[Health Diagnosis API] Request body:', body);

    if (!body.data) {
      return NextResponse.json(
        { message: '요청 데이터가 없습니다.' },
        { status: 400 }
      );
    }

    // GPT 분석 수행
    try {
      const result = await performGptAnalysis(body.data);
      
      // 로그인 여부 확인
      const authHeader = request.headers.get('authorization');
      const isLoggedIn = authHeader?.startsWith('Bearer ') && body.diagnosisId;
      
      console.log('[Health Diagnosis API] User status:', isLoggedIn ? 'Logged in' : 'Not logged in');
      
      // 로그인 사용자인 경우에만 결과 저장
      if (isLoggedIn) {
        try {
          const token = authHeader!.split(' ')[1];
          const secret = new TextEncoder().encode(process.env.JWT_SECRET);
          await jwtVerify(token, secret);

          // 결과 저장
          await db.insert(diagnosisResults).values({
            diagnosisId: body.diagnosisId,
            recommendedDepartments: result.recommendedDepartments,
            diseases: result.results,
            supplements: result.supplement_recommendations
          });
          
          console.log('[Health Diagnosis API] Result saved for logged-in user');
        } catch (error) {
          console.error('[Health Diagnosis API] Error saving result:', error);
          // 결과 저장 실패해도 분석 결과는 반환
        }
      } else {
        console.log('[Health Diagnosis API] Skipping result save for non-logged-in user');
      }

      // 모든 사용자에게 동일한 응답 형식 제공
      return NextResponse.json({
        success: true,
        message: '건강 정보 분석 완료',
        data: {
          ...result,
          disclaimer: '이 정보는 건강 상식 제공용이며, 진단이나 치료를 대신하지 않습니다. 증상이 지속되면 반드시 병원을 방문해주세요.'
        }
      });
    } catch (error) {
      console.error('[Health Diagnosis API] Error processing request:', error);
      return NextResponse.json(
        { message: '건강 정보 분석 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('[Health Diagnosis API] Unexpected error:', error);
    return NextResponse.json(
      { message: '예기치 않은 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

async function performGptAnalysis(data: any) {
  const prompt = `
주의: 반드시 JSON 형식으로만 응답하세요. 다른 텍스트나 설명을 포함하지 마세요.

분석할 사용자 정보:
핵심 정보 (우선적으로 고려):
- 주요 증상: ${data.mainSymptoms}
- 증상 지속 기간: ${data.symptomDuration}

부가 정보 (참고 사항):
- 나이: ${data.age}
- 성별: ${data.gender}
- 키: ${data.height}cm
- 몸무게: ${data.weight}kg
- BMI: ${data.bmi}
- 만성 질환: ${data.chronicDiseases || '없음'}
- 복용 중인 약물: ${data.medications || '없음'}
- 흡연: ${data.smoking}
- 음주: ${data.drinking}
- 운동: ${data.exercise}
- 수면: ${data.sleep}
- 직업: ${data.occupation || '미입력'}
- 근무 형태: ${data.workStyle}
- 식사 형태: ${data.diet}
- 식사 규칙성: ${data.mealRegularity}

응답 규칙:
1. results 배열: 1-3개의 질환
2. recommendedDepartments 배열: 정확히 1개의 진료과
3. 각 질환의 mainSymptoms 배열: 1-3개의 증상
4. 각 질환의 managementTips 배열: 1-3개의 관리수칙
5. supplement_recommendations 배열: 1-3개의 영양제
6. 각 영양제의 benefits 배열: 1-3개의 효능
7. 각 영양제의 matchingSymptoms 배열: 1-3개의 증상

응답 형식:
{
  "results": [
    {
      "diseaseName": "질환명",
      "description": "주요 증상과 관련된 상세 설명",
      "riskLevel": "low/medium/high",
      "mainSymptoms": ["주요 증상 1", "주요 증상 2"],
      "managementTips": ["관리 수칙 1", "관리 수칙 2"]
    }
  ],
  "recommendedDepartments": ["권장 진료과"],
  "supplement_recommendations": [
    {
      "supplementName": "영양제 이름",
      "description": "영양제 설명",
      "benefits": ["효능 1", "효능 2"],
      "matchingSymptoms": ["매칭 증상 1", "매칭 증상 2"]
    }
  ]
}`;

  const makeRequest = async (attempt = 1) => {
    try {
      console.log(`[Health Diagnosis API] Attempt ${attempt} - Making GPT request`);
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4-turbo-preview',
          messages: [
            {
              role: 'system',
              content: '당신은 건강 정보 검색을 도와주는 AI 도우미입니다. 반드시 JSON 형식으로만 응답해야 하며, 다른 어떤 설명이나 텍스트도 포함하지 않습니다. 응답이 JSON 형식이 아닌 경우 시스템이 작동하지 않습니다.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.2,
          max_tokens: 1500,
          presence_penalty: 0,
          frequency_penalty: 0,
          top_p: 1,
          response_format: { type: "json_object" }
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          timeout: 50000 // 50초 타임아웃
        }
      );
      return response;
    } catch (error) {
      console.error(`[Health Diagnosis API] Attempt ${attempt} failed:`, error instanceof Error ? error.message : 'Unknown error');
      
      // AxiosError 타입 가드
      const isAxiosError = (error: unknown): error is AxiosError => {
        return axios.isAxiosError(error);
      };

      // 재시도 가능한 에러인지 확인
      const retryableError = isAxiosError(error) && (
        error.response?.status === 429 || // Rate limit
        error.response?.status === 500 || // Server error
        error.code === 'ECONNABORTED' || // Timeout
        error.code === 'ETIMEDOUT' // Timeout
      );
      
      if (attempt < 3 && retryableError) {
        // 재시도 간격을 점진적으로 증가
        const delay = attempt * 2000; // 2초, 4초, 6초
        console.log(`[Health Diagnosis API] Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return makeRequest(attempt + 1);
      }
      
      throw error;
    }
  };

  try {
    const gptResponse = await makeRequest();
    let gptReply = gptResponse.data.choices[0].message.content.trim();
    
    try {
      const parsedResult = JSON.parse(gptReply);
      
      // 결과 검증
      if (!parsedResult.results || parsedResult.results.length < 1 || parsedResult.results.length > 3) {
        throw new Error('질환 결과는 1개 이상 3개 이하여야 합니다.');
      }
      if (!parsedResult.recommendedDepartments || parsedResult.recommendedDepartments.length !== 1) {
        throw new Error('권장 진료과는 정확히 1개여야 합니다.');
      }
      if (!parsedResult.supplement_recommendations || 
          parsedResult.supplement_recommendations.length < 1 || 
          parsedResult.supplement_recommendations.length > 3) {
        throw new Error('영양제 추천은 1개 이상 3개 이하여야 합니다.');
      }

      return {
        results: parsedResult.results,
        recommendedDepartments: parsedResult.recommendedDepartments,
        supplement_recommendations: parsedResult.supplement_recommendations,
        disclaimer: '이 정보는 건강 상식 제공용이며, 진단이나 치료를 대신하지 않습니다. 증상이 지속되면 반드시 병원을 방문해주세요.'
      };
    } catch (parseError) {
      console.error('[Health Diagnosis API] JSON Parse Error:', parseError);
      throw new Error('AI 응답 형식이 올바르지 않습니다.');
    }
  } catch (error) {
    console.error('[Health Diagnosis API] GPT Analysis Error:', error);
    throw new Error('AI 분석 중 오류가 발생했습니다.');
  }
} 