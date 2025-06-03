import { NextResponse } from 'next/server';
import { db } from '@/db';
import { diagnosisResults, diagnoses, users } from '@/db/schema';
import { jwtVerify } from 'jose';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    // 인증 확인
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: '로그인이 필요한 서비스입니다.' },
        { status: 401 }
      );
    }

    // 토큰 검증
    const token = authHeader.split(' ')[1];
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    
    let userId: number;
    try {
      const { payload } = await jwtVerify(token, secret);
      if (!payload.id || typeof payload.id !== 'number') {
        return NextResponse.json(
          { message: '유효하지 않은 인증 토큰입니다.' },
          { status: 401 }
        );
      }
      userId = payload.id;
    } catch (error) {
      return NextResponse.json(
        { message: '유효하지 않은 인증 토큰입니다.' },
        { status: 401 }
      );
    }

    // 사용자 정보 확인
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    // 해당 사용자의 진단 기록 확인
    const userDiagnoses = await db
      .select()
      .from(diagnoses)
      .where(eq(diagnoses.userId, userId));

    // 모든 진단 결과 확인
    const allDiagnosisResults = await db
      .select()
      .from(diagnosisResults);

    // 해당 사용자의 진단 결과 확인 (JOIN 사용)
    const userDiagnosisResults = await db
      .select()
      .from(diagnosisResults)
      .innerJoin(diagnoses, eq(diagnosisResults.diagnosisId, diagnoses.id))
      .where(eq(diagnoses.userId, userId));

    return NextResponse.json({
      success: true,
      data: {
        userId,
        user: user[0] || null,
        userDiagnosesCount: userDiagnoses.length,
        userDiagnoses: userDiagnoses,
        allDiagnosisResultsCount: allDiagnosisResults.length,
        allDiagnosisResults: allDiagnosisResults,
        userDiagnosisResultsCount: userDiagnosisResults.length,
        userDiagnosisResults: userDiagnosisResults
      }
    });

  } catch (error) {
    console.error('[Debug API] Error:', error);
    return NextResponse.json(
      { message: '디버그 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 