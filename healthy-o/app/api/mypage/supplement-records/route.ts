import { db } from "@/db";
import { supplementRecommendations, diagnoses, diagnosisResults } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { jwtVerify } from 'jose';
import { ApiResponse } from '@/utils/api-response';

export async function GET(request: Request) {
  try {
    console.log('[Supplement Records API] Starting request');

    // 1. 인증 확인
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      console.log('[Supplement Records API] No auth header found');
      return ApiResponse.unauthorized('인증이 필요합니다.');
    }

    const token = authHeader.split(' ')[1];
    let userId: number;

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      
      if (!payload.sub) {
        console.log('[Supplement Records API] Invalid token payload');
        return ApiResponse.unauthorized('유효하지 않은 토큰입니다.');
      }

      userId = Number(payload.sub);
      if (isNaN(userId) || userId <= 0) {
        console.log('[Supplement Records API] Invalid user ID:', userId);
        return ApiResponse.unauthorized('유효하지 않은 사용자 ID입니다.');
      }
      
      console.log('[Supplement Records API] Authenticated user ID:', userId);
    } catch (error) {
      console.error('[Supplement Records API] Token verification failed:', error);
      return ApiResponse.unauthorized('토큰이 만료되었거나 유효하지 않습니다.');
    }

    // 2. 사용자의 영양제 추천 기록 조회
    const records = await db.query.supplementRecommendations.findMany({
      where: eq(supplementRecommendations.userId, userId),
      with: {
        diagnosis: {
          with: {
            diagnosisResult: true
          }
        }
      },
      orderBy: [desc(supplementRecommendations.recommendedAt)]
    });

    console.log('[Supplement Records API] Raw records data:', JSON.stringify(records, null, 2));

    if (!records.length) {
      console.log('[Supplement Records API] No supplement records found');
      return ApiResponse.success('영양제 추천 기록이 없습니다.', []);
    }

    // 3. 응답 데이터 형식화
    const formattedRecords = records.map(record => {
      try {
        console.log('[Supplement Records API] Processing record:', record.id);

        const formattedRecord = {
          id: record.id,
          userId: record.userId,
          diagnosisId: record.diagnosisId,
          supplements: record.supplements,
          recommendedAt: record.recommendedAt?.toISOString() || new Date().toISOString()
        };

        console.log('[Supplement Records API] Formatted record:', JSON.stringify(formattedRecord, null, 2));
        return formattedRecord;
      } catch (error) {
        console.error('[Supplement Records API] Error formatting record:', error);
        return null;
      }
    }).filter(Boolean);

    console.log('[Supplement Records API] Formatted records count:', formattedRecords.length);

    return ApiResponse.success('영양제 추천 기록 조회 성공', formattedRecords);

  } catch (error) {
    console.error('[Supplement Records API] Unexpected error:', error);
    return ApiResponse.error('서버 오류가 발생했습니다.');
  }
} 