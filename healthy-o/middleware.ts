import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// 로그인이 필요한 페이지 목록
const authRequiredPages = ['/mypage'];
// 비로그인 상태에서만 접근 가능한 페이지 목록
const nonAuthPages = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  try {
    // 토큰이 있는 경우 (로그인 상태)
    if (token) {
      // 토큰 검증
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      // 로그인/회원가입 페이지 접근 시도시 메인으로 리다이렉트
      if (nonAuthPages.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      return NextResponse.next();
    } 
    // 토큰이 없는 경우 (비로그인 상태)
    else {
      // 인증이 필요한 페이지 접근 시도시 로그인으로 리다이렉트
      if (authRequiredPages.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      return NextResponse.next();
    }
  } catch (error) {
    // 토큰이 유효하지 않은 경우
    if (authRequiredPages.includes(pathname)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  }
}

// 미들웨어를 적용할 경로 설정
export const config = {
  matcher: ['/login', '/signup', '/mypage']
}; 