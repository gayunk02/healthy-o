import { PrismaClient } from '@prisma/client';
import { success, error } from '../utils/response.js';

const prisma = new PrismaClient();

/**
 * 최근 진단 기록 기반 영양제 추천 조회
 */
export const getSupplementRecommendations = async (req, res) => {
  try {
    const userId = req.userId;

    // 1. 가장 최근 DiagnosisRecord 조회
    const recentDiagnosis = await prisma.diagnosisRecord.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (!recentDiagnosis) {
      return error(res, 404, '최근 진단 기록이 없습니다.');
    }

    // 2. 해당 진단 기록에 연결된 SupplementRecommendation 조회
    const recommendation = await prisma.supplementRecommendation.findFirst({
      where: {
        userId,
        basedOnDiagnosisId: recentDiagnosis.id,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!recommendation) {
      return error(res, 404, '추천된 영양제가 없습니다.');
    }

    // 3. 아직 안 본 추천이면 wasViewed = true로 업데이트
    if (!recommendation.wasViewed) {
      await prisma.supplementRecommendation.update({
        where: { id: recommendation.id },
        data: { wasViewed: true },
      });
    }

    // 4. JSON.parse 해서 supplements 리스트로 응답
    const supplements = JSON.parse(recommendation.recommendations);

    return success(res, '영양제 추천 결과 조회 성공', { supplements });
  } catch (err) {
    console.error('추천 조회 오류:', err);
    return error(res, 500, '영양제 추천 조회 실패');
  }
};
