import { NextResponse } from 'next/server';
import { ApiResponse } from '@/utils/api-response';

export async function POST() {
  try {
    // 쿠키에서 토큰 삭제
    const response = ApiResponse.success('로그아웃되었습니다.');
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(0),
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('[Logout API] Error:', error);
    return ApiResponse.error('로그아웃 처리 중 오류가 발생했습니다.', 500);
  }
} 