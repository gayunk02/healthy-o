import { NextResponse } from 'next/server';
import { db } from '@/db';
import { diagnoses } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { jwtVerify } from 'jose';

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
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    
    let userId: number;
    try {
      const { payload } = await jwtVerify(token, secret);
      if (!payload.id || typeof payload.id !== 'string') {
        return NextResponse.json(
          { message: '유효하지 않은 인증 토큰입니다.' },
          { status: 401 }
        );
      }
      userId = Number(payload.id);
    } catch (error) {
      return NextResponse.json(
        { message: '유효하지 않은 인증 토큰입니다.' },
        { status: 401 }
      );
    }

    const records = await db.query.diagnoses.findMany({
      where: eq(diagnoses.userId, userId),
      orderBy: desc(diagnoses.submittedAt),
      columns: {
        id: true,
        chronicDiseases: true,
        medications: true,
        submittedAt: true,
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