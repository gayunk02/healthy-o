import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ApiResponse } from '@/utils/api-response';
import { z } from 'zod';

// 입력값 검증을 위한 Zod 스키마
const signupSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  name: z.string().min(2, '이름은 2자 이상이어야 합니다.'),
  password: z.string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .regex(/[0-9]/, '숫자를 포함해야 합니다.')
    .regex(/[a-z]/, '소문자를 포함해야 합니다.')
    .regex(/[^A-Za-z0-9]/, '특수문자를 포함해야 합니다.'),
  phone: z.string().regex(/^\d{3}-\d{4}-\d{4}$/, '올바른 전화번호 형식이 아닙니다.'),
  gender: z.enum(['MALE', 'FEMALE'], {
    errorMap: () => ({ message: '성별을 선택해주세요.' }),
  }),
  birthDate: z.string().refine((date) => {
    const birthDate = new Date(date);
    const now = new Date();
    return birthDate < now;
  }, '올바른 생년월일을 입력해주세요.'),
  marketingAgree: z.boolean().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 입력값 검증
    const validatedData = signupSchema.parse(body);

    // 이메일 중복 검사
    const existingUser = await db.select()
      .from(users)
      .where(eq(users.email, validatedData.email));

    if (existingUser.length > 0) {
      return ApiResponse.error('이미 사용 중인 이메일입니다.', 400);
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // 사용자 생성
    const [newUser] = await db.insert(users).values({
      email: validatedData.email,
      name: validatedData.name,
      password: hashedPassword,
      phone: validatedData.phone,
      gender: validatedData.gender,
      birthDate: new Date(validatedData.birthDate),
      marketingAgree: validatedData.marketingAgree || false,
    }).returning();

    // 민감한 정보 제외하고 응답
    const { password: _, ...userWithoutPassword } = newUser;

    return ApiResponse.success(
      '회원가입이 완료되었습니다.',
      { user: userWithoutPassword }
    );

  } catch (error) {
    console.error('[Signup API] Error:', error);
    
    if (error instanceof z.ZodError) {
      return ApiResponse.error('입력값이 올바르지 않습니다.', 400);
    }

    return ApiResponse.error('회원가입 처리 중 오류가 발생했습니다.', 500);
  }
} 