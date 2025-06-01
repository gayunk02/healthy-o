import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 이메일로 사용자 찾기
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return NextResponse.json(
        { message: '이메일 또는 비밀번호가 일치하지 않습니다.' },
        { status: 401 }
      );
    }

    // 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: '이메일 또는 비밀번호가 일치하지 않습니다.' },
        { status: 401 }
      );
    }

    // JWT 토큰 생성
    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      name: user.name,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    // 쿠키에 토큰 저장
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24시간
    });

    // 사용자 정보 반환 (비밀번호 제외)
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: '로그인 성공',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: '로그인 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 