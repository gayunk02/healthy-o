import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/utils/api-response';
import { db } from '@/db';
import { diagnoses } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { jwtVerify } from 'jose';

type RouteParams = { id: string };

// GET 요청 핸들러
export async function GET(
  req: NextRequest,
  { params }: { params: RouteParams }
):Promise<NextResponse> {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return ApiResponse.error('인증이 필요합니다.', 401);
    }

    const token = authHeader.split(' ')[1];
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    let userId: number;

    try {
      const { payload } = await jwtVerify(token, secret);
      if (!payload.id || typeof payload.id !== 'string') {
        return ApiResponse.error('유효하지 않은 인증 토큰입니다.', 401);
      }
      userId = Number(payload.id);
    } catch (error) {
      return ApiResponse.error('유효하지 않은 인증 토큰입니다.', 401);
    }

    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return ApiResponse.error('유효하지 않은 ID입니다.', 400);
    }

    const diagnosis = await db.query.diagnoses.findFirst({
      where: eq(diagnoses.id, id),
    });

    if (!diagnosis) {
      return ApiResponse.error('진단 기록을 찾을 수 없습니다.', 404);
    }

    if (diagnosis.userId !== userId) {
      return ApiResponse.error('이 진단 기록에 접근할 수 없습니다.', 403);
    }

    return ApiResponse.success('진단 기록을 성공적으로 조회했습니다.', diagnosis);
  } catch (error) {
    console.error('[Health Diagnosis API] Error:', error);
    return ApiResponse.error('진단 기록 조회 중 오류가 발생했습니다.', 500);
  }
} 