import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { verify } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// GET: 내 정보 조회
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

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
      columns: {
        id: true,
        email: true,
        name: true,
        gender: true,
        birthDate: true,
        height: true,
        weight: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: '내 정보 조회 성공',
      data: user,
    });
  } catch (err) {
    return NextResponse.json(
      { message: '서버 오류' },
      { status: 500 }
    );
  }
}

// PATCH: 내 정보 수정
export async function PATCH(request: Request) {
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

    const { name, gender, birthDate, height, weight, currentPassword, newPassword } = await request.json();

    // 업데이트할 일반 정보 구성
    const updateData: any = {
      ...(name && { name }),
      ...(gender && { gender }),
      ...(birthDate && { birthDate: new Date(birthDate) }),
      ...(height && { height }),
      ...(weight && { weight }),
      updatedAt: new Date(),
    };

    // 비밀번호 변경 요청이 있는 경우
    if (currentPassword && newPassword) {
      const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
      });

      if (!user) {
        return NextResponse.json(
          { message: '사용자를 찾을 수 없습니다.' },
          { status: 404 }
        );
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { message: '현재 비밀번호가 일치하지 않습니다.' },
          { status: 401 }
        );
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      updateData.password = hashedNewPassword;
    }

    await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, userId));

    const updatedUser = await db.query.users.findFirst({
      where: eq(users.id, userId),
      columns: {
        id: true,
        email: true,
        name: true,
        gender: true,
        birthDate: true,
        height: true,
        weight: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      message: '내 정보 수정 성공',
      data: updatedUser,
    });
  } catch (err) {
    console.error('프로필 수정 오류:', err);
    return NextResponse.json(
      { message: '내 정보 수정 실패' },
      { status: 500 }
    );
  }
} 