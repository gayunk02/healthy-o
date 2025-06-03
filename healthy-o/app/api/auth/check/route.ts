import { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { ApiResponse } from '@/utils/api-response';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return ApiResponse.unauthorized();
    }

    const token = authHeader.split(' ')[1];
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    try {
      const { payload } = await jwtVerify(token, secret);
      
      if (!payload.sub || typeof payload.sub !== 'string') {
        console.error('[Auth Check API] Invalid token payload:', payload);
        return ApiResponse.unauthorized();
      }

      const userId = Number(payload.sub);
      if (isNaN(userId) || userId <= 0) {
        console.error('[Auth Check API] Invalid user ID in token:', payload.sub);
        return ApiResponse.unauthorized();
      }

      // 데이터베이스에서 최신 사용자 정보 조회
      const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
        columns: {
          id: true,
          email: true,
          name: true,
        }
      });

      if (!user) {
        console.error('[Auth Check API] User not found:', userId);
        return ApiResponse.unauthorized();
      }

      // 토큰의 사용자 정보와 데이터베이스의 정보를 모두 반환
      return ApiResponse.success('유효한 인증 상태입니다.', {
        user: {
          ...user,
          tokenInfo: {
            name: payload.name as string,
            email: payload.email as string,
          }
        }
      });
    } catch (error) {
      console.error('[Auth Check API] Token verification failed:', error);
      return ApiResponse.unauthorized();
    }
  } catch (error) {
    console.error('[Auth Check API] Unexpected error:', error);
    return ApiResponse.unauthorized();
  }
} 