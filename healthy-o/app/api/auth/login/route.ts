import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { ApiResponse } from '@/utils/api-response';

// 입력값 검증을 위한 Zod 스키마
const loginSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 입력값 검증
    const { email, password } = loginSchema.parse(body);

    // 사용자 조회
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return ApiResponse.error('이메일 또는 비밀번호가 일치하지 않습니다.', 401);
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return ApiResponse.error('이메일 또는 비밀번호가 일치하지 않습니다.', 401);
    }

    // JWT 토큰 생성 (24시간 유효)
    const token = await new SignJWT({
      sub: user.id.toString(),  // sub 클레임에는 사용자 ID만 포함
      name: user.name,          // 사용자 이름
      email: user.email,        // 사용자 이메일
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .setIssuedAt()
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    // 응답 데이터 준비
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      token,
      redirectTo: '/',
    };

    // 쿠키 설정
    const response = ApiResponse.success('로그인에 성공했습니다.', userData);
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24시간
    });

    return response;
  } catch (error) {
    console.error('[Login API] Error:', error);
    
    if (error instanceof z.ZodError) {
      return ApiResponse.error('입력값이 올바르지 않습니다.', 400);
    }

    return ApiResponse.error('로그인 중 오류가 발생했습니다.', 500);
  }
} 