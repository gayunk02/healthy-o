import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users, healthInfos } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { jwtVerify } from 'jose';
import { ApiResponse } from '@/utils/api-response';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// 입력값 검증을 위한 Zod 스키마
const lifestyleSchema = z.object({
  exercise: z.enum(["NONE", "LIGHT", "MODERATE", "HEAVY"]).optional(),
  sleep: z.enum(["LESS_5", "5_TO_6", "6_TO_7", "7_TO_8", "MORE_8"]).optional(),
  occupation: z.string().optional(),
  workStyle: z.enum(["SITTING", "STANDING", "ACTIVE", "MIXED"]).optional(),
  diet: z.enum(["BALANCED", "MEAT", "FISH", "VEGGIE", "INSTANT"]).optional(),
  mealRegularity: z.enum(["REGULAR", "MOSTLY", "IRREGULAR", "VERY_IRREGULAR"]).optional(),
});

const updateUserSchema = z.object({
  // 기본 정보
  name: z.string().min(1, "이름을 입력해주세요.").optional(),
  gender: z.enum(["M", "F"]).optional(),
  birthDate: z.string().optional(),
  phone: z.string().optional(),
  marketingAgree: z.boolean().optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(8, "비밀번호는 8자 이상이어야 합니다.").optional(),
  
  // 건강 정보
  height: z.string().optional(),
  weight: z.string().optional(),
  medicalHistory: z.string().optional(),
  medications: z.string().optional(),
  smoking: z.enum(["NON", "ACTIVE", "QUIT"]).optional(),
  drinking: z.enum(["NON", "LIGHT", "MODERATE", "HEAVY"]).optional(),
  
  // 생활습관 정보
  lifestyle: lifestyleSchema.optional(),
});

// GET: 내 정보 조회
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      console.error('[Mypage API] No authorization header or invalid format');
      return ApiResponse.unauthorized('인증이 필요합니다.');
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const verified = await jwtVerify(token, secret);
      
      if (!verified.payload.sub) {
        console.error('[Mypage API] Invalid token payload:', verified.payload);
        return ApiResponse.unauthorized('유효하지 않은 토큰입니다.');
      }

      const userId = Number(verified.payload.sub);
      
      // 사용자 정보 조회
      const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
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
        console.error('[Mypage API] User not found:', userId);
        return ApiResponse.notFound('사용자를 찾을 수 없습니다.');
      }

      // 건강 정보 조회
      const healthInfo = await db.query.healthInfos.findFirst({
        where: eq(healthInfos.userId, userId),
      });

      // 사용자 정보 포맷팅
      const formattedUser = {
        ...user,
        birthDate: user.birthDate ? user.birthDate.toISOString().split('T')[0] : null,
        gender: user.gender || null,
        marketingAgree: user.marketingAgree || false,
      };

      return ApiResponse.success('내 정보 조회 성공', {
        user: formattedUser,
        healthInfo: healthInfo || null
      });

    } catch (error) {
      console.error('[Mypage API] Token verification failed:', error);
      return ApiResponse.unauthorized('토큰이 만료되었거나 유효하지 않습니다.');
    }
  } catch (error) {
    console.error('[Mypage API] Unexpected error:', error);
    return ApiResponse.error('서버 오류가 발생했습니다.');
  }
}

// PATCH: 내 정보 수정
export async function PATCH(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return ApiResponse.unauthorized();
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const verified = await jwtVerify(token, secret);
      
      if (!verified.payload.sub) {
        console.error('[Mypage API] Invalid token payload:', verified.payload);
        return ApiResponse.unauthorized('유효하지 않은 토큰입니다.');
      }

      const userId = Number(verified.payload.sub);
      if (isNaN(userId) || userId <= 0) {
        console.error('[Mypage API] Invalid user ID in token:', verified.payload.sub);
        return ApiResponse.unauthorized();
      }

      const body = await request.json();
      const validatedData = updateUserSchema.parse(body);

      // 업데이트할 일반 정보 구성
      const userUpdateData: any = {
        ...(validatedData.name && { name: validatedData.name }),
        ...(validatedData.gender && { gender: validatedData.gender }),
        ...(validatedData.birthDate && { birthDate: new Date(validatedData.birthDate) }),
        ...(validatedData.phone !== undefined && { phone: validatedData.phone }),
        ...(validatedData.marketingAgree !== undefined && { marketingAgree: validatedData.marketingAgree }),
        updatedAt: new Date(),
      };

      // 비밀번호 변경 요청이 있는 경우
      if (validatedData.currentPassword && validatedData.newPassword) {
        const user = await db.query.users.findFirst({
          where: eq(users.id, userId),
          columns: {
            password: true
          }
        });

        if (!user) {
          return ApiResponse.error('사용자를 찾을 수 없습니다.', 404);
        }

        const isMatch = await bcrypt.compare(validatedData.currentPassword, user.password);
        if (!isMatch) {
          return ApiResponse.error('현재 비밀번호가 일치하지 않습니다.', 401);
        }

        const hashedNewPassword = await bcrypt.hash(validatedData.newPassword, 10);
        userUpdateData.password = hashedNewPassword;
      }

      // 사용자 정보 업데이트
      await db
        .update(users)
        .set(userUpdateData)
        .where(eq(users.id, userId));

      // 건강 정보 업데이트 데이터 구성
      const healthInfoUpdateData = {
        userId,
        ...(validatedData.height && { height: validatedData.height }),
        ...(validatedData.weight && { weight: validatedData.weight }),
        ...(validatedData.medicalHistory && { chronicDiseases: validatedData.medicalHistory }),
        ...(validatedData.medications && { medications: validatedData.medications }),
        ...(validatedData.smoking && { smoking: validatedData.smoking }),
        ...(validatedData.drinking && { drinking: validatedData.drinking }),
        ...(validatedData.lifestyle?.exercise && { exercise: validatedData.lifestyle.exercise }),
        ...(validatedData.lifestyle?.sleep && { sleep: validatedData.lifestyle.sleep }),
        ...(validatedData.lifestyle?.occupation && { occupation: validatedData.lifestyle.occupation }),
        ...(validatedData.lifestyle?.workStyle && { workStyle: validatedData.lifestyle.workStyle }),
        ...(validatedData.lifestyle?.diet && { diet: validatedData.lifestyle.diet }),
        ...(validatedData.lifestyle?.mealRegularity && { mealRegularity: validatedData.lifestyle.mealRegularity }),
        updatedAt: new Date(),
      };

      // 건강 정보가 있는지 확인
      const existingHealthInfo = await db.query.healthInfos.findFirst({
        where: eq(healthInfos.userId, userId),
      });

      // 건강 정보 upsert
      if (existingHealthInfo) {
        await db
          .update(healthInfos)
          .set(healthInfoUpdateData)
          .where(eq(healthInfos.userId, userId));
      } else {
        // BMI 계산
        const height = Number(validatedData.height) || 0;
        const weight = Number(validatedData.weight) || 0;
        const bmi = height > 0 ? (weight / Math.pow(height / 100, 2)).toFixed(1) : "0";

        // 필수 필드를 포함한 새 건강 정보 생성
        const newHealthInfo = {
          ...healthInfoUpdateData,
          name: validatedData.name || "", // 필수
          gender: validatedData.gender || "M", // 필수
          age: 0, // 필수
          height: validatedData.height || "0", // 필수
          weight: validatedData.weight || "0", // 필수
          bmi, // 필수
          smoking: validatedData.smoking || "NON", // 기본값
          drinking: validatedData.drinking || "NON", // 기본값
          exercise: validatedData.lifestyle?.exercise || "NONE", // 기본값
          sleep: validatedData.lifestyle?.sleep || "7_TO_8", // 필수
          workStyle: validatedData.lifestyle?.workStyle || "SITTING", // 필수
          diet: validatedData.lifestyle?.diet || "BALANCED", // 필수
          mealRegularity: validatedData.lifestyle?.mealRegularity || "REGULAR", // 필수
          chronicDiseases: validatedData.medicalHistory || "없음", // 기본값
          medications: validatedData.medications || "없음", // 기본값
          createdAt: new Date(),
        };
        await db.insert(healthInfos).values(newHealthInfo);
      }

      // 업데이트된 정보 조회
      const updatedUser = await db.query.users.findFirst({
        where: eq(users.id, userId),
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

      const updatedHealthInfo = await db.query.healthInfos.findFirst({
        where: eq(healthInfos.userId, userId),
      });

      // 사용자 정보 포맷팅
      const formattedUser = updatedUser ? {
        ...updatedUser,
        birthDate: updatedUser.birthDate ? updatedUser.birthDate.toISOString().split('T')[0] : null,
        gender: updatedUser.gender || null,
        marketingAgree: updatedUser.marketingAgree || false,
      } : null;

      return ApiResponse.success('내 정보 수정 성공', {
        user: formattedUser,
        healthInfo: updatedHealthInfo || null
      });
    } catch (error) {
      console.error('Token verification failed:', error);
      return ApiResponse.unauthorized();
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ApiResponse.error('입력값이 올바르지 않습니다.', 400, error.errors);
    }
    console.error('프로필 수정 오류:', error);
    return ApiResponse.error('내 정보 수정 실패', 500);
  }
} 