import { db } from "@/db";
import { diagnoses, diagnosisResults } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { jwtVerify } from 'jose';
import { ApiResponse } from '@/utils/api-response';

export async function GET(request: Request) {
  try {
    console.log('[Diagnosis API] Starting request');

    // 1. 인증 확인
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      console.log('[Diagnosis API] No auth header found');
      return ApiResponse.unauthorized('인증이 필요합니다.');
    }

    const token = authHeader.split(' ')[1];
    let userId: number;
    
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      
      if (!payload.sub) {
        console.log('[Diagnosis API] Invalid token payload');
        return ApiResponse.unauthorized('유효하지 않은 토큰입니다.');
      }

      userId = Number(payload.sub);
      if (isNaN(userId) || userId <= 0) {
        console.log('[Diagnosis API] Invalid user ID:', userId);
        return ApiResponse.unauthorized('유효하지 않은 사용자 ID입니다.');
      }
      
      console.log('[Diagnosis API] Authenticated user ID:', userId);
    } catch (error) {
      console.error('[Diagnosis API] Token verification failed:', error);
      return ApiResponse.unauthorized('토큰이 만료되었거나 유효하지 않습니다.');
    }

    // 2. 사용자의 진단 기록 조회 (진단 결과와 함께)
    const userDiagnoses = await db.query.diagnoses.findMany({
      where: eq(diagnoses.userId, userId),
      orderBy: [desc(diagnoses.submittedAt)],
      with: {
        diagnosisResult: true
      }
    });

    console.log('[Diagnosis API] Raw diagnoses data:', JSON.stringify(userDiagnoses, null, 2));

    if (!userDiagnoses.length) {
      console.log('[Diagnosis API] No diagnosis records found');
      return ApiResponse.success('진단 기록이 없습니다.', []);
    }

    // 3. 응답 데이터 형식화
    const formattedResults = userDiagnoses.map(diagnosis => {
      const result = diagnosis.diagnosisResult;
      if (!result) {
        console.log('[Diagnosis API] No result found for diagnosis:', diagnosis.id);
        return null;
      }

      try {
        console.log('[Diagnosis API] Processing diagnosis:', diagnosis.id);
        console.log('[Diagnosis API] Raw diagnosis data:', JSON.stringify(diagnosis, null, 2));
        console.log('[Diagnosis API] Raw result data:', JSON.stringify(result, null, 2));

        // 질병 정보에서 추천 진료과 추출
        const recommendedDepts = result.diseases.map(disease => {
          switch (disease.diseaseName.toLowerCase()) {
            case '긴장성 두통':
              return '신경과';
            case '빈혈':
              return '내과';
            case '감기':
              return '이비인후과';
            default:
              return '가정의학과';
          }
        });

        const formattedResult = {
          id: result.id,
          diagnosisId: diagnosis.id,
          createdAt: diagnosis.submittedAt.toISOString(),
          // 기본 정보
          name: diagnosis.name,
          age: diagnosis.age,
          gender: diagnosis.gender,
          height: diagnosis.height?.toString(),
          weight: diagnosis.weight?.toString(),
          bmi: diagnosis.bmi?.toString(),
          chronicDiseases: diagnosis.chronicDiseases || "없음",
          medications: diagnosis.medications || "없음",
          // 생활습관 정보
          smoking: diagnosis.smoking === "NON" ? "비흡연" : 
                  diagnosis.smoking === "ACTIVE" ? "흡연" : 
                  diagnosis.smoking === "QUIT" ? "금연" : diagnosis.smoking || "정보 없음",
          drinking: diagnosis.drinking === "NON" ? "비음주" :
                   diagnosis.drinking === "LIGHT" ? "주 1-2회" :
                   diagnosis.drinking === "MODERATE" ? "주 3-4회" :
                   diagnosis.drinking === "HEAVY" ? "주 5회 이상" : diagnosis.drinking || "정보 없음",
          exercise: diagnosis.exercise === "NONE" ? "운동 안함" :
                   diagnosis.exercise === "LIGHT" ? "가벼운 운동 (주 1-2회)" :
                   diagnosis.exercise === "MODERATE" ? "적당한 운동 (주 3-4회)" :
                   diagnosis.exercise === "HEAVY" ? "활발한 운동 (주 5회 이상)" : diagnosis.exercise || "정보 없음",
          sleep: diagnosis.sleep === "LESS_5" ? "5시간 미만" :
                 diagnosis.sleep === "5_TO_6" ? "5-6시간" :
                 diagnosis.sleep === "6_TO_7" ? "6-7시간" :
                 diagnosis.sleep === "7_TO_8" ? "7-8시간" :
                 diagnosis.sleep === "MORE_8" ? "8시간 이상" : diagnosis.sleep || "정보 없음",
          occupation: diagnosis.occupation,
          workStyle: diagnosis.workStyle === "SITTING" ? "주로 앉아서 근무" :
                     diagnosis.workStyle === "STANDING" ? "주로 서서 근무" :
                     diagnosis.workStyle === "ACTIVE" ? "활동적인 근무" :
                     diagnosis.workStyle === "MIXED" ? "복합적인 근무" : diagnosis.workStyle || "정보 없음",
          diet: diagnosis.diet === "BALANCED" ? "균형 잡힌 식단" :
                diagnosis.diet === "MEAT" ? "육류 위주" :
                diagnosis.diet === "FISH" ? "생선 위주" :
                diagnosis.diet === "VEGGIE" ? "채식 위주" :
                diagnosis.diet === "INSTANT" ? "인스턴트 위주" : diagnosis.diet || "정보 없음",
          mealRegularity: diagnosis.mealRegularity === "REGULAR" ? "규칙적" :
                          diagnosis.mealRegularity === "MOSTLY" ? "대체로 규칙적" :
                          diagnosis.mealRegularity === "IRREGULAR" ? "불규칙적" :
                          diagnosis.mealRegularity === "VERY_IRREGULAR" ? "매우 불규칙적" : diagnosis.mealRegularity || "정보 없음",
          // 증상 정보
          symptoms: diagnosis.symptoms || "",
          symptomStartDate: diagnosis.symptomStartDate || "",
          // 진단 결과
          diseases: Array.isArray(result.diseases) ? result.diseases : [],
          recommendedDepartments: recommendedDepts,
          supplements: recommendedDepts.map(dept => `${dept} 관련 영양제`)
        };

        console.log('[Diagnosis API] Formatted result:', JSON.stringify(formattedResult, null, 2));
        return formattedResult;
      } catch (error) {
        console.error('[Diagnosis API] Error formatting result:', error);
        return null;
      }
    }).filter(Boolean);

    console.log('[Diagnosis API] Formatted results count:', formattedResults.length);

    return ApiResponse.success('진단 기록 조회 성공', formattedResults);

  } catch (error) {
    console.error('[Diagnosis API] Unexpected error:', error);
    return ApiResponse.error('서버 오류가 발생했습니다.');
  }
} 