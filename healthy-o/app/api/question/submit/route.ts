import { NextRequest } from 'next/server';
import { db } from '@/db';
import { diagnoses } from '@/db/schema';
import { verifyJwtToken } from '@/lib/auth';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/api-response';
import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

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

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // 사용자 인증 확인
    let userId: number | null = null;
    const authHeader = request.headers.get('authorization');
    
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const token = authHeader.split(' ')[1];
        const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key') as { id: number };
        userId = decoded.id;
      } catch (err) {
        console.error('[Question Submit API] Token verification failed:', err);
      }
    }

    // 로그인한 사용자인 경우에만 DB에 저장
    let diagnosisId = null;
    if (userId) {
      try {
        const diagnosisData = {
          user_id: userId,
          name: String(data.name),
          age: Number(data.age),
          gender: String(data.gender),
          height: data.height.toString(),
          weight: data.weight.toString(),
          bmi: data.bmi.toString(),
          chronicDiseases: String(data.chronicDiseases || '없음'),
          medications: String(data.medications || '없음'),
          smoking: String(data.smoking),
          drinking: String(data.drinking),
          exercise: String(data.exercise),
          sleep: String(data.sleep),
          occupation: String(data.occupation || ''),
          workStyle: String(data.workStyle),
          diet: String(data.diet),
          mealRegularity: String(data.mealRegularity),
        };

        const newDiagnosis = await db.insert(diagnoses).values(diagnosisData).returning();
        diagnosisId = newDiagnosis[0].id;
      } catch (err) {
        console.error('[Question Submit API] Failed to save diagnosis:', err);
        return NextResponse.json(
          { message: '설문 저장에 실패했습니다.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      message: userId ? '설문이 저장되었습니다.' : '설문이 제출되었습니다.',
      diagnosisId
    });
  } catch (err) {
    console.error('[Question Submit API] Unexpected error:', err);
    return NextResponse.json(
      { message: '예기치 않은 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 