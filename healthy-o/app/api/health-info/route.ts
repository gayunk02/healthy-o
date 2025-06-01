import { NextResponse } from 'next/server';
import { db } from '@/db';
import { healthInfo } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import type { Session } from 'next-auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions) as Session | null;
    if (!session?.user?.id) {
      return NextResponse.json({ error: '인증되지 않은 사용자입니다.' }, { status: 401 });
    }

    const data = await req.json();
    const userId = parseInt(session.user.id, 10);
    
    // 기존 데이터가 있다면 업데이트, 없다면 새로 생성
    const existingInfo = await db.select().from(healthInfo).where(eq(healthInfo.userId, userId));
    
    if (existingInfo.length > 0) {
      await db.update(healthInfo)
        .set({
          data: data,
          updatedAt: new Date()
        })
        .where(eq(healthInfo.userId, userId));
    } else {
      await db.insert(healthInfo).values({
        userId: userId,
        data: data,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    return NextResponse.json({ message: '건강 정보가 저장되었습니다.' });
  } catch (error) {
    console.error('Error saving health info:', error);
    return NextResponse.json({ error: '건강 정보 저장 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions) as Session | null;
    if (!session?.user?.id) {
      return NextResponse.json({ error: '인증되지 않은 사용자입니다.' }, { status: 401 });
    }

    const userId = parseInt(session.user.id, 10);
    const data = await db.select().from(healthInfo).where(eq(healthInfo.userId, userId));
    
    if (data.length === 0) {
      return NextResponse.json({ error: '저장된 건강 정보가 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(data[0].data);
  } catch (error) {
    console.error('Error loading health info:', error);
    return NextResponse.json({ error: '건강 정보 불러오기 중 오류가 발생했습니다.' }, { status: 500 });
  }
} 