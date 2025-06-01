import { NextResponse } from 'next/server';
import { db } from '@/db';
import { diagnosisRecords, supplementRecommendations } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { verify } from 'jsonwebtoken';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: number };
    const userId = decoded.userId;

    // 1. 가장 최근 DiagnosisRecord 조회
    const recentDiagnosis = await db.query.diagnosisRecords.findFirst({
      where: eq(diagnosisRecords.userId, userId),
      orderBy: desc(diagnosisRecords.createdAt),
    });

    if (!recentDiagnosis) {
      return NextResponse.json(
        { message: '최근 진단 기록이 없습니다.' },
        { status: 404 }
      );
    }

    // 2. 해당 진단 기록에 연결된 SupplementRecommendation 조회
    const recommendation = await db.query.supplementRecommendations.findFirst({
      where: eq(supplementRecommendations.basedOnDiagnosisId, recentDiagnosis.id),
      orderBy: desc(supplementRecommendations.createdAt),
    });

    if (!recommendation) {
      return NextResponse.json(
        { message: '추천된 영양제가 없습니다.' },
        { status: 404 }
      );
    }

    // 3. 아직 안 본 추천이면 wasViewed = true로 업데이트
    if (!recommendation.wasViewed) {
      await db
        .update(supplementRecommendations)
        .set({ wasViewed: true })
        .where(eq(supplementRecommendations.id, recommendation.id));
    }

    // 4. JSON.parse 해서 supplements 리스트로 응답
    const supplements = JSON.parse(recommendation.recommendations);

    return NextResponse.json({
      message: '영양제 추천 결과 조회 성공',
      data: { supplements }
    });
  } catch (err) {
    console.error('추천 조회 오류:', err);
    return NextResponse.json(
      { message: '영양제 추천 조회 실패' },
      { status: 500 }
    );
  }
} 