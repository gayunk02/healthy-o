import { NextResponse } from 'next/server';
import { db } from '@/db';
import { diagnosisResults, hospitalRecommendations, supplementRecommendations } from '@/db/schema';
import { eq, and, gte, lte } from 'drizzle-orm';
import { jwtVerify } from 'jose';
import { ApiResponse } from '@/utils/api-response';

// GET: 건강 기록 조회
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      console.error('[Health Records API] No authorization header or invalid format');
      return ApiResponse.unauthorized('인증이 필요합니다.');
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const verified = await jwtVerify(token, secret);
      
      if (!verified.payload.sub || typeof verified.payload.sub !== 'string') {
        console.error('[Health Records API] Invalid token payload:', verified.payload);
        return ApiResponse.unauthorized('유효하지 않은 토큰입니다.');
      }

      const userId = Number(verified.payload.sub);

      // URL에서 검색 파라미터 추출
      const url = new URL(request.url);
      const startDate = url.searchParams.get('startDate');
      const endDate = url.searchParams.get('endDate');
      const searchQuery = url.searchParams.get('query')?.toLowerCase();

      const startDateTime = startDate ? new Date(startDate) : undefined;
      const endDateTime = endDate ? new Date(endDate) : undefined;

      // 진단 결과 조회
      const diagnosisResultsData = await db.query.diagnosisResults.findMany({
        with: {
          diagnosis: true,
        },
        where: startDateTime && endDateTime ? 
          and(
            gte(diagnosisResults.createdAt, startDateTime),
            lte(diagnosisResults.createdAt, endDateTime)
          ) : undefined,
        orderBy: (diagnosisResults, { desc }) => [desc(diagnosisResults.createdAt)],
      });

      // 병원 추천 조회
      const hospitalRecsData = await db.query.hospitalRecommendations.findMany({
        where: startDateTime && endDateTime ? 
          and(
            eq(hospitalRecommendations.userId, userId),
            gte(hospitalRecommendations.recommendedAt, startDateTime),
            lte(hospitalRecommendations.recommendedAt, endDateTime)
          ) : 
          eq(hospitalRecommendations.userId, userId),
        orderBy: (hospitalRecommendations, { desc }) => [desc(hospitalRecommendations.recommendedAt)],
      });

      // 영양제 추천 조회
      const supplementRecsData = await db.query.supplementRecommendations.findMany({
        where: startDateTime && endDateTime ? 
          and(
            eq(supplementRecommendations.userId, userId),
            gte(supplementRecommendations.recommendedAt, startDateTime),
            lte(supplementRecommendations.recommendedAt, endDateTime)
          ) : 
          eq(supplementRecommendations.userId, userId),
        orderBy: (supplementRecommendations, { desc }) => [desc(supplementRecommendations.recommendedAt)],
      });

      // 검색어 필터링
      const filteredResults = {
        diagnosisResults: searchQuery
          ? diagnosisResultsData.filter(result => 
              result.diseases.some(disease => 
                disease.diseaseName.toLowerCase().includes(searchQuery) ||
                disease.description.toLowerCase().includes(searchQuery)
              )
            )
          : diagnosisResultsData,
        hospitalRecommendations: searchQuery
          ? hospitalRecsData.filter(rec =>
              rec.hospitals.some(hospital =>
                hospital.hospitalName.toLowerCase().includes(searchQuery) ||
                hospital.department.toLowerCase().includes(searchQuery)
              )
            )
          : hospitalRecsData,
        supplementRecommendations: searchQuery
          ? supplementRecsData.filter(rec =>
              rec.supplements.some(supplement =>
                supplement.supplementName.toLowerCase().includes(searchQuery) ||
                supplement.description.toLowerCase().includes(searchQuery)
              )
            )
          : supplementRecsData,
      };

      return ApiResponse.success('건강 기록 조회 성공', filteredResults);

    } catch (error) {
      console.error('[Health Records API] Token verification failed:', error);
      return ApiResponse.unauthorized('토큰이 만료되었거나 유효하지 않습니다.');
    }
  } catch (error) {
    console.error('[Health Records API] Unexpected error:', error);
    return ApiResponse.error('서버 오류가 발생했습니다.');
  }
} 