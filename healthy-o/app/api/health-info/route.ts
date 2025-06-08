import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { healthInfos } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { verifyAuth } from '@/lib/auth';
import { z } from 'zod';
import { ApiResponse } from '@/utils/api-response';

// 입력값 검증을 위한 Zod 스키마
const healthInfoSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  age: z.number().min(1, "나이를 입력해주세요.").max(150, "올바른 나이를 입력해주세요."),
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
    // 사용자 인증
    const { userId } = await verifyAuth(req);
    if (!userId) {
      return ApiResponse.unauthorized();
    }

    // 요청 데이터 파싱 및 검증
    const body = await req.json();
    const validatedData = healthInfoSchema.parse(body);
    
    const userIdInt = parseInt(userId);
    
    // 기존 데이터 확인
    const existingInfo = await db.select()
      .from(healthInfos)
      .where(eq(healthInfos.userId, userIdInt))
      .limit(1);

    // 저장할 데이터 준비
    const healthData = {
      name: validatedData.name,
      age: validatedData.age,
      gender: validatedData.gender,
      height: validatedData.height.toString(),
      weight: validatedData.weight.toString(),
      bmi: validatedData.bmi.toString(),
      chronicDiseases: validatedData.chronicDiseases || '없음',
      medications: validatedData.medications || '없음',
      smoking: validatedData.smoking,
      drinking: validatedData.drinking,
      exercise: validatedData.exercise,
      sleep: validatedData.sleep,
      occupation: validatedData.occupation || '',
      workStyle: validatedData.workStyle,
      diet: validatedData.diet,
      mealRegularity: validatedData.mealRegularity,
      updatedAt: new Date()
    };

    let result;
    if (existingInfo.length > 0) {
      // 기존 정보 업데이트
      result = await db.update(healthInfos)
        .set(healthData)
        .where(eq(healthInfos.userId, userIdInt))
        .returning();
    } else {
      // 새로운 정보 생성
      result = await db.insert(healthInfos)
        .values({
          userId: userIdInt,
          ...healthData,
          createdAt: new Date()
        })
        .returning();
    }

    const message = existingInfo.length > 0 
      ? "건강 정보가 업데이트되었습니다." 
      : "건강 정보가 저장되었습니다.";

    return ApiResponse.success(message, result[0]);

  } catch (error) {
    console.error('Error saving health info:', error);
    
    if (error instanceof z.ZodError) {
      return ApiResponse.error("입력값이 올바르지 않습니다.", 400, {
        validation: error.errors
      });
    }

    return ApiResponse.error(
      "건강 정보 저장 중 오류가 발생했습니다.",
      500,
      { error: error instanceof Error ? error.message : "Unknown error" }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // 사용자 인증
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return ApiResponse.unauthorized();
    }

    const token = authHeader.split(' ')[1];
    const { userId } = await verifyAuth(req);
    if (!userId) {
      return ApiResponse.unauthorized();
    }

    const userIdInt = parseInt(userId);
    const healthInfo = await db.select()
      .from(healthInfos)
      .where(eq(healthInfos.userId, userIdInt))
      .limit(1);
    
    if (healthInfo.length === 0) {
      return ApiResponse.notFound('저장된 건강 정보가 없습니다.');
    }

    // numeric 타입을 number로 변환
    const responseData = {
      ...healthInfo[0],
      height: healthInfo[0].height ? parseFloat(healthInfo[0].height) : null,
      weight: healthInfo[0].weight ? parseFloat(healthInfo[0].weight) : null,
      bmi: healthInfo[0].bmi ? parseFloat(healthInfo[0].bmi) : null,
    };

    return ApiResponse.success('건강 정보를 불러왔습니다.', responseData);
  } catch (error) {
    console.error('Error loading health info:', error);
    return ApiResponse.error(
      '건강 정보를 불러오는 중 오류가 발생했습니다.',
      500,
      { error: error instanceof Error ? error.message : "Unknown error" }
    );
  }
} 