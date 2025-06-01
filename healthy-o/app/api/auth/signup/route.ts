import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password, name, phone, gender, birthDate } = await request.json();

    // 1. 필수 필드 검증
    if (!email || !password || !name || !phone || !gender || !birthDate) {
      return NextResponse.json(
        { message: '모든 필수 정보를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 2. 이메일 중복 확인
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return NextResponse.json(
        { message: '이미 가입된 이메일입니다.' },
        { status: 400 }
      );
    }

    // 3. 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. 유저 생성
    const newUser = await db.insert(users).values({
      email,
      password: hashedPassword,
      name,
      phone,
      gender,
      birthDate: new Date(birthDate),
      updatedAt: new Date(),
    }).returning();

    return NextResponse.json({
      message: '회원가입 성공',
      data: { userId: newUser[0].id }
    });
  } catch (err) {
    console.error('회원가입 오류:', err);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 