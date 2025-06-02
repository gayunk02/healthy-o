import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { successResponse, errorResponse } from '@/utils/api-response';

export async function POST() {
  try {
    // 응답 객체 생성
    const response = successResponse(undefined, '로그아웃되었습니다.');
    
    // 토큰 쿠키 삭제
    response.cookies.delete("token");

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return errorResponse('로그아웃 중 오류가 발생했습니다.', undefined, 500);
  }
} 