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
      id: user.id.toString(),   // 기존 코드와의 호환성을 위해 id도 포함
      name: user.name,          // 사용자 이름
      email: user.email,        // 사용자 이메일
    })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .setNotBefore(new Date()) // 토큰이 즉시 유효하도록 설정
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    // 응답 데이터 준비
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      token,
      redirectTo: '/',
    };

    // 쿠키 설정 (토큰과 동일한 만료 시간 설정)
    const response = ApiResponse.success('로그인에 성공했습니다.', userData);
    const cookieMaxAge = 60 * 60 * 24; // 24시간 (초 단위)
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: cookieMaxAge,
      path: '/',
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