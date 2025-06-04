import { NextRequest } from "next/server";
import { db } from "@/db";
import { diagnoses, diagnosisResults, supplementRecommendations } from "@/db/schema";
import { desc, eq, and } from "drizzle-orm";
import { verifyAuth } from "@/lib/auth";
import { ApiResponse } from "@/utils/api-response";

interface Supplement {
  supplementName: string;
  description: string;
  benefits: string[];
  matchingSymptoms: string[];
}

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

    if (!diagnosisResult || !diagnosisResult.diseases) {
      return ApiResponse.notFound("영양제 추천 정보를 찾을 수 없습니다.");
    }

    // 질병 정보에서 영양제 추천 정보 추출
    const diseases = diagnosisResult.diseases;
    const supplementsList: Supplement[] = diseases.flatMap(disease => {
      if (disease.mainSymptoms && disease.managementTips) {
        return [{
          supplementName: `${disease.diseaseName} 관련 영양제`,
          description: `${disease.diseaseName} 증상 개선을 위한 영양제`,
          benefits: disease.managementTips,
          matchingSymptoms: disease.mainSymptoms
        }];
      }
      return [];
    });

    // 4. 이미 저장된 추천 정보가 있는지 확인
    let existingRecommendation = await db.query.supplementRecommendations.findFirst({
      where: and(
        eq(supplementRecommendations.userId, userId),
        eq(supplementRecommendations.diagnosisId, latestDiagnosis.id)
      ),
    });

    // 5. 없을 때만 새로 저장
    if (!existingRecommendation) {
      console.log('[Supplement API] Creating new recommendation for diagnosis:', latestDiagnosis.id);
      try {
        const [newRecommendation] = await db.insert(supplementRecommendations)
          .values({
            userId,
            diagnosisId: latestDiagnosis.id,
            supplements: supplementsList
          })
          .returning();
        
        existingRecommendation = newRecommendation;
        console.log('[Supplement API] Successfully created recommendation');
      } catch (error) {
        // 동시에 여러 요청이 들어왔을 때 중복 저장 방지
        console.log('[Supplement API] Error while creating recommendation:', error);
        existingRecommendation = await db.query.supplementRecommendations.findFirst({
          where: and(
            eq(supplementRecommendations.userId, userId),
            eq(supplementRecommendations.diagnosisId, latestDiagnosis.id)
          ),
        });
        
        if (!existingRecommendation) {
          throw error;
        }
      }
    } else {
      console.log('[Supplement API] Found existing recommendation for diagnosis:', latestDiagnosis.id);
    }

    // 6. 응답 데이터 구성
    const responseData = {
      supplements: supplementsList,
      recommendedAt: existingRecommendation.recommendedAt?.toISOString() || new Date().toISOString(),
    };

    return ApiResponse.success("영양제 추천 정보를 성공적으로 조회했습니다.", responseData);

  } catch (error) {
    console.error("[Supplement Recommendations API Error]:", error);
    return ApiResponse.error("영양제 추천 정보 조회 중 오류가 발생했습니다.");
  }
} 