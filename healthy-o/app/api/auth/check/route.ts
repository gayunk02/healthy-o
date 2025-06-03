import { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { successResponse, unauthorizedError } from '@/utils/api-response';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return unauthorizedError();
    }

    const token = authHeader.split(' ')[1];
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    try {
      const { payload } = await jwtVerify(token, secret);
      
      if (!payload.sub || typeof payload.sub !== 'string') {
        console.error('[Auth Check API] Invalid token payload:', payload);
        return unauthorizedError();
      }

      const userId = Number(payload.sub);
      if (isNaN(userId) || userId <= 0) {
        console.error('[Auth Check API] Invalid user ID in token:', payload.sub);
        return unauthorizedError();
      }

      return successResponse({ userId }, '유효한 인증 상태입니다.');
    } catch (error) {
      console.error('[Auth Check API] Token verification failed:', error);
      return unauthorizedError();
    }
  } catch (error) {
    console.error('[Auth Check API] Unexpected error:', error);
    return unauthorizedError();
  }
} 