import { NextRequest } from 'next/server';
import { db } from '@/db';
import { healthInfos, users } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { verifyJwtToken } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedError, notFoundError } from '@/utils/api-response';

export async function GET(req: NextRequest) {
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

    // userId를 정수로 변환
    const userId = parseInt(payload.id, 10);

    // 사용자 정보와 가장 최근 건강 정보 조회
    const result = await db.select({
      // 사용자 정보
      name: users.name,
      gender: users.gender,
      birthDate: users.birthDate,
      // 건강 정보
      height: healthInfos.height,
      weight: healthInfos.weight,
      bmi: healthInfos.bmi,
      chronicDiseases: healthInfos.chronicDiseases,
      medications: healthInfos.medications,
      smoking: healthInfos.smoking,
      drinking: healthInfos.drinking,
      exercise: healthInfos.exercise,
      sleep: healthInfos.sleep,
      occupation: healthInfos.occupation,
      workStyle: healthInfos.workStyle,
      diet: healthInfos.diet,
      mealRegularity: healthInfos.mealRegularity,
      updatedAt: healthInfos.updatedAt,
    })
    .from(users)
    .leftJoin(healthInfos, eq(users.id, healthInfos.userId))
    .where(eq(users.id, userId))
    .orderBy(desc(healthInfos.updatedAt))
    .limit(1);

    if (!result || result.length === 0) {
      return notFoundError("사용자 정보를 찾을 수 없습니다.");
    }

    // 생년월일로 나이 계산
    const birthDate = new Date(result[0].birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // 응답 데이터 구성
    const responseData = {
      ...result[0],
      age,
      birthDate: undefined, // 생년월일은 제외하고 나이만 전달
      // numeric 타입을 number로 변환
      height: result[0].height ? parseFloat(result[0].height) : null,
      weight: result[0].weight ? parseFloat(result[0].weight) : null,
      bmi: result[0].bmi ? parseFloat(result[0].bmi) : null,
    };

    return successResponse(responseData, "최근 건강 정보를 불러왔습니다.");

  } catch (error) {
    console.error('Error fetching latest health info:', error);
    return errorResponse("서버 오류가 발생했습니다.", undefined, 500);
  }
} 