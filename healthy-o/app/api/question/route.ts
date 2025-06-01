import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, age, gender, status } = body;

    // 여기에서 데이터베이스 저장 또는 다른 처리를 할 수 있습니다.
    console.log("받은 문진표 정보:", { name, age, gender, status });

    // 임시로 성공 응답을 반환합니다.
    return NextResponse.json({
      message: `${name}님의 문진 정보가 정상적으로 수신되었습니다.`,
    });
  } catch (error) {
    console.error("문진표 처리 중 오류 발생:", error);
    return NextResponse.json(
      { error: "문진표 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
} 