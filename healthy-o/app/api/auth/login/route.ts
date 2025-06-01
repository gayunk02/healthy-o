import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. 유저 찾기
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return NextResponse.json(
        { message: '존재하지 않는 이메일입니다.' },
        { status: 404 }
      );
    }

    // 2. 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: '비밀번호가 일치하지 않습니다.' },
        { status: 401 }
      );
    }

    // 3. JWT 발급
    const token = sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // 4. 응답
    const response = NextResponse.json({
      message: '로그인 성공',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
    });

    // 5. 쿠키에 토큰 저장
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7일
    });

    return response;
  } catch (err) {
    console.error('로그인 오류:', err);
    return NextResponse.json(
      { message: '서버 오류' },
      { status: 500 }
    );
  }
} 