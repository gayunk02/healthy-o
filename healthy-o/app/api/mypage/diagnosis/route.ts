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

        const formattedResult = {
          id: result.id,
          diagnosisId: diagnosis.id,
          createdAt: diagnosis.submittedAt.toISOString(),
          // 기본 정보
          height: diagnosis.height.toString(),
          weight: diagnosis.weight.toString(),
          bmi: diagnosis.bmi.toString(),
          chronicDiseases: diagnosis.chronicDiseases || null,
          medications: diagnosis.medications || null,
          // 생활습관 정보
          smoking: diagnosis.smoking || "NON",
          drinking: diagnosis.drinking || "NON",
          exercise: diagnosis.exercise || "NONE",
          sleep: diagnosis.sleep || "",
          occupation: diagnosis.occupation || null,
          workStyle: diagnosis.workStyle || "",
          diet: diagnosis.diet || "",
          mealRegularity: diagnosis.mealRegularity || "",
          // 증상 정보
          symptoms: diagnosis.symptoms || "",
          symptomStartDate: diagnosis.symptomStartDate || "",
          // 진단 결과
          diseases: Array.isArray(result.diseases) ? result.diseases : [],
          recommendedDepartments: Array.isArray(result.recommendedDepartments) ? result.recommendedDepartments : [],
          supplements: Array.isArray(result.supplements) ? result.supplements : []
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