import { NextResponse } from 'next/server';
import { db } from '@/db';
import { diagnosisRecords } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { verifyJwt } from '@/utils';

export async function GET(request: Request) {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json(
        { message: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const payload = verifyJwt(token);
    if (!payload) {
      return NextResponse.json(
        { message: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }

    const userId = payload.id;

    const records = await db.query.diagnosisRecords.findMany({
      where: eq(diagnosisRecords.userId, userId),
      orderBy: desc(diagnosisRecords.createdAt),
      columns: {
        id: true,
        symptoms: true,
        diagnosisResult: true,
        departments: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      message: '진단 기록 조회 성공',
      data: records,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: '진단 기록 조회 실패' },
      { status: 500 }
    );
  }
} 