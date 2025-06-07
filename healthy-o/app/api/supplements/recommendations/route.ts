import { NextRequest } from "next/server";
import { db } from "@/db";
import { diagnoses, diagnosisResults, supplementRecommendations } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { verifyAuth } from "@/lib/auth";
import { ApiResponse } from "@/utils/api-response";

export async function GET(req: NextRequest) {
  try {
    // 1. 인증 확인
    const authResult = await verifyAuth(req);
    const userId = Number(authResult.userId);
    
    if (!userId) {
      return ApiResponse.unauthorized();
    }

    // 2. 최근 진단 기록 조회
    const latestDiagnosis = await db.query.diagnoses.findFirst({
      where: eq(diagnoses.userId, userId),
      orderBy: [desc(diagnoses.submittedAt)],
    });

    if (!latestDiagnosis) {
      return ApiResponse.notFound("진단 결과가 없습니다. 건강 설문을 먼저 진행해주세요.");
    }

    // 3. 진단 결과 조회
    const diagnosisResult = await db.query.diagnosisResults.findFirst({
      where: eq(diagnosisResults.diagnosisId, latestDiagnosis.id),
    });

    if (!diagnosisResult || !diagnosisResult.supplements) {
      return ApiResponse.notFound("영양제 추천 정보를 찾을 수 없습니다.");
    }

    // 4. supplementRecommendations 테이블에 저장
    try {
      await db.insert(supplementRecommendations).values({
        userId: userId,
        diagnosisId: latestDiagnosis.id,
        supplements: diagnosisResult.supplements,
        recommendedAt: new Date(),
      });
      console.log('[Supplement Recommendations API] New recommendation saved');
    } catch (error) {
      // 유니크 제약조건 위반 에러 코드 23505
      if (error instanceof Error && error.message.includes('23505')) {
        console.log('[Supplement Recommendations API] Recommendation already exists');
      } else {
        console.error('[Supplement Recommendations API] Error saving to supplementRecommendations:', error);
      }
      // 저장 실패해도 사용자에게는 데이터 반환
    }

    // 5. 응답 데이터 구성
    const responseData = {
      supplements: diagnosisResult.supplements,
      recommendedAt: diagnosisResult.createdAt?.toISOString() || new Date().toISOString()
    };

    return ApiResponse.success("영양제 추천 정보를 성공적으로 조회했습니다.", responseData);

  } catch (error) {
    console.error("[Supplement Recommendations API Error]:", error);
    return ApiResponse.error("영양제 추천 정보 조회 중 오류가 발생했습니다.");
  }
} 