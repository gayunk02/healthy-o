import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      return new NextResponse(null, { status: 401 });
    }

    // 토큰 검증
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    if (!verified) {
      return new NextResponse(null, { status: 401 });
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    return new NextResponse(null, { status: 401 });
  }
} 