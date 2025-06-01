import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const { email, name, password, phone, gender, birthDate } = await req.json();

    // 필수 필드 검증
    if (!email || !name || !password || !phone || !gender || !birthDate) {
      return NextResponse.json(
        { message: '모든 필수 정보를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: '올바른 이메일 형식이 아닙니다.' },
        { status: 400 }
      );
    }

    // 이메일 중복 검사
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: '이미 사용 중인 이메일입니다.' },
        { status: 400 }
      );
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const [newUser] = await db.insert(users).values({
      email,
      name,
      password: hashedPassword,
      phone,
      gender,
      birthDate: new Date(birthDate),
    }).returning();

    // 민감한 정보 제외하고 응답
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      message: '회원가입이 완료되었습니다.',
      user: userWithoutPassword
    }, { status: 201 });

  } catch (error) {
    console.error('회원가입 에러:', error);
    return NextResponse.json(
      { message: '회원가입 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 