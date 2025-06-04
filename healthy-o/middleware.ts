import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { getTokenFromCookies, shouldRefreshToken, refreshToken, setTokenCookie } from '@/lib/auth';

// 로그인이 필요한 페이지 목록
const protectedPages = ['/mypage'];

// 인증이 필요하지 않은 API 경로
const publicApiPaths = [
  '/api/auth/login',
  '/api/auth/signup',
  '/api/auth/check',
  '/api/question/submit',  // question API는 비로그인도 허용
  '/api/health/diagnosis', // health diagnosis API도 비로그인 허용
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // API 요청 처리
  if (pathname.startsWith('/api/')) {
    if (publicApiPaths.includes(pathname)) {
      return NextResponse.next();
    }

    const apiToken = getTokenFromCookies(request);
    if (!apiToken) {
      return NextResponse.next();
    }

    // 토큰 갱신이 필요한지 확인
    const needsRefresh = await shouldRefreshToken(apiToken);
    if (!needsRefresh) {
      return NextResponse.next();
    }

    // 토큰 갱신
    const newToken = await refreshToken(apiToken);
    if (!newToken) {
      return NextResponse.next();
    }

    // 새 토큰으로 응답 헤더 설정
    const response = NextResponse.next();
    setTokenCookie(response, newToken);
    return response;
  }

  // 페이지 요청 처리
  const isProtectedPage = protectedPages.some(page => pathname.startsWith(page));
  if (!isProtectedPage) {
    return NextResponse.next();
  }

  const pageToken = getTokenFromCookies(request);
  
  // 토큰이 없는 경우 로그인 페이지로 리다이렉트
  if (!pageToken) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  try {
    // 토큰 검증
    await jwtVerify(pageToken, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.next();
  } catch (error) {
    // 토큰이 유효하지 않은 경우 로그인 페이지로 리다이렉트
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }
}

// 미들웨어를 적용할 경로 설정
export const config = {
  matcher: ['/login', '/signup', '/mypage', '/api/:path*']
}; 