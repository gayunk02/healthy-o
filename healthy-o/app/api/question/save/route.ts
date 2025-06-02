import { NextRequest } from 'next/server';
import { db } from '@/db';
import { healthInfos } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { verifyJwtToken } from '@/lib/auth';
import { z } from 'zod';
import { successResponse, errorResponse, unauthorizedError } from '@/utils/api-response';

// 입력값 검증을 위한 Zod 스키마
const healthInfoSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  age: z.number().min(1, "나이를 입력해주세요."),
  gender: z.enum(["MALE", "FEMALE"]),
  height: z.number().min(1, "키를 입력해주세요.").max(300, "올바른 키를 입력해주세요."),
  weight: z.number().min(1, "몸무게를 입력해주세요.").max(300, "올바른 몸무게를 입력해주세요."),
  bmi: z.number(),
  chronicDiseases: z.string().optional(),
  medications: z.string().optional(),
  smoking: z.enum(["NON", "ACTIVE", "QUIT"]),
  drinking: z.enum(["NON", "LIGHT", "MODERATE", "HEAVY"]),
  exercise: z.enum(["NONE", "LIGHT", "MODERATE", "HEAVY"]),
  sleep: z.enum(["LESS_5", "5_TO_6", "6_TO_7", "7_TO_8", "MORE_8"]),
  occupation: z.string().optional(),
  workStyle: z.enum(["SITTING", "STANDING", "ACTIVE", "MIXED"]),
  diet: z.enum(["BALANCED", "MEAT", "FISH", "VEGGIE", "INSTANT"]),
  mealRegularity: z.enum(["REGULAR", "MOSTLY", "IRREGULAR", "VERY_IRREGULAR"]),
});

export async function POST(req: NextRequest) {
  try {
    // 토큰 검증
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return unauthorizedError();
    }

    const payload = await verifyJwtToken(token);
    if (!payload) {
      return unauthorizedError();
    }

    const body = await req.json();
    
    // 입력값 검증
    const validatedData = healthInfoSchema.parse(body);

    // userId를 정수로 변환
    const userId = parseInt(payload.id, 10);

    // 기존 건강 정보 조회
    const existingHealthInfo = await db.select()
      .from(healthInfos)
      .where(eq(healthInfos.userId, userId))
      .limit(1);

    const healthData = {
      height: validatedData.height.toString(),
      weight: validatedData.weight.toString(),
      bmi: validatedData.bmi.toString(),
      chronicDiseases: validatedData.chronicDiseases || '없음',
      medications: validatedData.medications || '없음',
      smoking: validatedData.smoking,
      drinking: validatedData.drinking,
      exercise: validatedData.exercise,
      sleep: validatedData.sleep,
      occupation: validatedData.occupation || null,
      workStyle: validatedData.workStyle,
      diet: validatedData.diet,
      mealRegularity: validatedData.mealRegularity,
    };

    let result;
    if (existingHealthInfo.length > 0) {
      // 기존 정보 업데이트
      result = await db.update(healthInfos)
        .set({
          ...healthData,
          updatedAt: new Date(),
        })
        .where(eq(healthInfos.userId, userId))
        .returning();
    } else {
      // 새로운 정보 생성
      result = await db.insert(healthInfos)
        .values({
          userId: userId,
          name: validatedData.name,
          age: validatedData.age,
          gender: validatedData.gender,
          ...healthData,
        })
        .returning();
    }

    return successResponse(
      result[0],
      "건강 정보가 성공적으로 저장되었습니다."
    );

  } catch (error) {
    console.error('Error saving health info:', error);
    
    if (error instanceof z.ZodError) {
      return errorResponse("입력값이 올바르지 않습니다.", {
        validation: error.errors,
      }, 400);
    }

    return errorResponse("서버 오류가 발생했습니다.", undefined, 500);
  }
} 