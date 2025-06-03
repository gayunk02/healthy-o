import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { jwtVerify } from 'jose';
import { successResponse, errorResponse, unauthorizedError } from '@/utils/api-response';
import bcrypt from 'bcryptjs';

// GET: 내 정보 조회
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return unauthorizedError();
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const verified = await jwtVerify(token, secret);
      const payload = verified.payload as { id: number };

      const user = await db.query.users.findFirst({
        where: eq(users.id, payload.id),
        columns: {
          id: true,
          email: true,
          name: true,
          phone: true,
          gender: true,
          birthDate: true,
          createdAt: true,
          updatedAt: true,
          marketingAgree: true,
        },
      });

      if (!user) {
        return errorResponse('사용자를 찾을 수 없습니다.', undefined, 404);
      }

      return successResponse(user, '내 정보 조회 성공');
    } catch (error) {
      console.error('Token verification failed:', error);
      return unauthorizedError();
    }
  } catch (error) {
    console.error('Error in mypage API:', error);
    return errorResponse('서버 오류가 발생했습니다.', undefined, 500);
  }
}

// PATCH: 내 정보 수정
export async function PATCH(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return unauthorizedError();
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const verified = await jwtVerify(token, secret);
      const payload = verified.payload as { id: number };

      const { name, gender, birthDate, currentPassword, newPassword } = await request.json();

      // 업데이트할 일반 정보 구성
      const updateData: any = {
        ...(name && { name }),
        ...(gender && { gender }),
        ...(birthDate && { birthDate: new Date(birthDate) }),
        updatedAt: new Date(),
      };

      // 비밀번호 변경 요청이 있는 경우
      if (currentPassword && newPassword) {
        const user = await db.query.users.findFirst({
          where: eq(users.id, payload.id),
        });

        if (!user) {
          return errorResponse('사용자를 찾을 수 없습니다.', undefined, 404);
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
          return errorResponse('현재 비밀번호가 일치하지 않습니다.', undefined, 401);
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        updateData.password = hashedNewPassword;
      }

      await db
        .update(users)
        .set(updateData)
        .where(eq(users.id, payload.id));

      const updatedUser = await db.query.users.findFirst({
        where: eq(users.id, payload.id),
        columns: {
          id: true,
          email: true,
          name: true,
          phone: true,
          gender: true,
          birthDate: true,
          createdAt: true,
          updatedAt: true,
          marketingAgree: true,
        },
      });

      return successResponse(updatedUser, '내 정보 수정 성공');
    } catch (error) {
      console.error('Token verification failed:', error);
      return unauthorizedError();
    }
  } catch (error) {
    console.error('프로필 수정 오류:', error);
    return errorResponse('내 정보 수정 실패', undefined, 500);
  }
} 