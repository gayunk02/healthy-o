import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { healthInfos } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { verifyAuth } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedError, notFoundError } from '@/utils/api-response';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await verifyAuth(req);
    if (!userId) {
      return unauthorizedError();
    }

    const {
      name,
      age,
      gender,
      height,
      weight,
      bmi,
      chronicDiseases,
      medications,
      smoking,
      drinking,
      exercise,
      sleep,
      occupation,
      workStyle,
      diet,
      mealRegularity,
    } = await req.json();

    const userIdInt = parseInt(userId);
    
    // 기존 데이터가 있다면 업데이트, 없다면 새로 생성
    const existingInfo = await db.select().from(healthInfos).where(eq(healthInfos.userId, userIdInt));
    
    if (existingInfo.length > 0) {
      await db.update(healthInfos)
        .set({
          name,
          age,
          gender,
          height,
          weight,
          bmi,
          chronicDiseases,
          medications,
          smoking,
          drinking,
          exercise,
          sleep,
          occupation,
          workStyle,
          diet,
          mealRegularity,
          updatedAt: new Date()
        })
        .where(eq(healthInfos.userId, userIdInt));
    } else {
      await db.insert(healthInfos).values({
        userId: userIdInt,
        name,
        age,
        gender,
        height,
        weight,
        bmi,
        chronicDiseases,
        medications,
        smoking,
        drinking,
        exercise,
        sleep,
        occupation,
        workStyle,
        diet,
        mealRegularity,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    return successResponse(undefined, '건강 정보가 저장되었습니다.');
  } catch (error) {
    console.error('Error saving health info:', error);
    return errorResponse('건강 정보 저장 중 오류가 발생했습니다.', undefined, 500);
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = await verifyAuth(req);
    if (!userId) {
      return unauthorizedError();
    }

    const userIdInt = parseInt(userId);
    const healthInfo = await db.select().from(healthInfos).where(eq(healthInfos.userId, userIdInt));
    
    if (healthInfo.length === 0) {
      return notFoundError('저장된 건강 정보가 없습니다.');
    }

    return successResponse(healthInfo[0], '건강 정보를 불러왔습니다.');
  } catch (error) {
    console.error('Error loading health info:', error);
    return errorResponse('건강 정보 불러오기 중 오류가 발생했습니다.', undefined, 500);
  }
} 