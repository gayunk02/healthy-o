import { db } from "@/db";
import { hospitalRecommendations, diagnoses, diagnosisResults } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { jwtVerify } from 'jose';
import { ApiResponse } from '@/utils/api-response';

export async function GET(request: Request) {
  try {
    console.log('[Hospital Records API] Starting request');

    // 1. 인증 확인
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      console.log('[Hospital Records API] No auth header found');
      return ApiResponse.unauthorized('인증이 필요합니다.');
    }

    const token = authHeader.split(' ')[1];
    let userId: number;

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      
      if (!payload.sub) {
        console.log('[Hospital Records API] Invalid token payload');
        return ApiResponse.unauthorized('유효하지 않은 토큰입니다.');
      }

      userId = Number(payload.sub);
      if (isNaN(userId) || userId <= 0) {
        console.log('[Hospital Records API] Invalid user ID:', userId);
        return ApiResponse.unauthorized('유효하지 않은 사용자 ID입니다.');
      }
      
      console.log('[Hospital Records API] Authenticated user ID:', userId);
    } catch (error) {
      console.error('[Hospital Records API] Token verification failed:', error);
      return ApiResponse.unauthorized('토큰이 만료되었거나 유효하지 않습니다.');
    }

    // 2. 사용자의 병원 추천 기록 조회
    const records = await db.query.hospitalRecommendations.findMany({
      where: eq(hospitalRecommendations.userId, userId),
      with: {
        diagnosis: {
          with: {
            diagnosisResult: true
          }
        }
      },
      orderBy: [desc(hospitalRecommendations.recommendedAt)]
    });

    console.log('[Hospital Records API] Raw records data:', JSON.stringify(records, null, 2));

    if (!records.length) {
      console.log('[Hospital Records API] No hospital records found');
      return ApiResponse.success('병원 추천 기록이 없습니다.', []);
    }

    // 3. 응답 데이터 형식화
    const formattedRecords = records.map(record => {
      try {
        console.log('[Hospital Records API] Processing record:', record.id);

        // diagnosisResult가 있는지 확인
        if (!record.diagnosis.diagnosisResult) {
          console.log('[Hospital Records API] No diagnosis result found for record:', record.id);
          return null;
        }

        // diseases 배열 파싱
        let diseases = [];
        try {
          diseases = typeof record.diagnosis.diagnosisResult.diseases === 'string' 
            ? JSON.parse(record.diagnosis.diagnosisResult.diseases)
            : record.diagnosis.diagnosisResult.diseases;
        } catch (error) {
          console.error('[Hospital Records API] Error parsing diseases:', error);
          diseases = [];
        }

        const formattedRecord = {
          id: record.id,
          createdAt: record.recommendedAt?.toISOString() || new Date().toISOString(),
          recommendedDepartment: record.hospitals[0]?.department || '',
          hospitals: record.hospitals.map(hospital => ({
            name: hospital.hospitalName,
            specialty: hospital.department,
            distance: "계산 필요",
            rating: 0,
            availableTime: "09:00 - 18:00",
            reservation: "예약 가능",
            address: hospital.address,
            contact: hospital.phone,
            hospitalUrl: hospital.placeUrl,
            phoneNumber: hospital.phone
          })),
          reason: diseases[0]?.mainSymptoms?.join(', ') || "",
          healthRecordId: record.diagnosisId,
          diagnosisId: record.diagnosis.diagnosisResult.id,
          diagnosisResults: diseases.map((disease: any) => ({
            id: record.diagnosis.diagnosisResult?.id || 0,
            diseaseName: disease.diseaseName,
            description: disease.description,
            riskLevel: disease.riskLevel as "high" | "medium" | "low",
            createdAt: record.diagnosis.diagnosisResult?.createdAt?.toISOString() || new Date().toISOString(),
            symptoms: disease.mainSymptoms?.join(', ') || ""
          }))
        };

        console.log('[Hospital Records API] Formatted record:', JSON.stringify(formattedRecord, null, 2));
        return formattedRecord;
      } catch (error) {
        console.error('[Hospital Records API] Error formatting record:', error);
        return null;
      }
    }).filter(Boolean);

    console.log('[Hospital Records API] Formatted records count:', formattedRecords.length);

    return ApiResponse.success('병원 추천 기록 조회 성공', formattedRecords);

  } catch (error) {
    console.error('[Hospital Records API] Unexpected error:', error);
    return ApiResponse.error('서버 오류가 발생했습니다.');
  }
} 