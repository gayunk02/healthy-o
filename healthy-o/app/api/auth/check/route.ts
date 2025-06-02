import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { successResponse, unauthorizedError } from '@/utils/api-response';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return unauthorizedError();
    }

    // 토큰 검증
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    if (!verified) {
      return unauthorizedError();
    }

    return successResponse(undefined, '유효한 인증 상태입니다.');
  } catch (error) {
    return unauthorizedError();
  }
} 