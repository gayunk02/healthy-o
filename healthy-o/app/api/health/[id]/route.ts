import { NextResponse } from 'next/server';
import { db } from '@/db';
import { diagnosisRecords } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { verify } from 'jsonwebtoken';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const recordId = Number(params.id);
    if (isNaN(recordId)) {
      return NextResponse.json(
        { message: '잘못된 진단 기록 ID입니다.' },
        { status: 400 }
      );
    }

    const record = await db.query.diagnosisRecords.findFirst({
      where: eq(diagnosisRecords.id, recordId),
    });

    if (!record) {
      return NextResponse.json(
        { message: '진단 기록을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    if (record.userId !== userId) {
      return NextResponse.json(
        { message: '이 진단 기록에 접근할 수 없습니다.' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      message: '진단 기록 상세 조회 성공',
      data: record,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: '진단 기록 상세 조회 실패' },
      { status: 500 }
    );
  }
} 