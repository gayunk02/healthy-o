import { NextRequest } from 'next/server';
import { db } from '@/db';
import { diagnoses } from '@/db/schema';
import { verifyJwtToken } from '@/lib/auth';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/api-response';

// 입력값 검증을 위한 Zod 스키마
const diagnosisSchema = z.object({
  // 개인 정보
  name: z.string().min(1, "이름을 입력해주세요."),
  age: z.number().min(1, "나이를 입력해주세요.").max(150, "올바른 나이를 입력해주세요."),
  gender: z.enum(["MALE", "FEMALE"]),
  
  // 건강 정보
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
    const body = await req.json();
    
    // 입력값 검증
    const validatedData = diagnosisSchema.parse(body);

    // 토큰 검증
    const token = req.cookies.get('token')?.value;
    let userId = null;
    
    if (token) {
      const payload = await verifyJwtToken(token);
      if (payload) {
        userId = parseInt(payload.id, 10);
      }
    }

    // 진단 데이터 생성
    const diagnosisData = {
      userId: userId,
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
      occupation: validatedData.occupation || null,
      workStyle: validatedData.workStyle,
      diet: validatedData.diet,
      mealRegularity: validatedData.mealRegularity,
    };

    // 로그인한 사용자만 DB에 저장
    let savedData = null;
    if (userId) {
      const result = await db.insert(diagnoses).values(diagnosisData).returning();
      savedData = result[0];
    }

    return successResponse(
      savedData || diagnosisData,
      userId 
        ? "진단이 성공적으로 저장되었습니다." 
        : "진단이 완료되었습니다. 결과를 저장하려면 로그인해주세요."
    );

  } catch (error) {
    console.error('Error submitting diagnosis:', error);
    
    if (error instanceof z.ZodError) {
      return errorResponse("입력값이 올바르지 않습니다.", {
        validation: error.errors,
      }, 400);
    }

    return errorResponse("서버 오류가 발생했습니다.", undefined, 500);
  }
} 