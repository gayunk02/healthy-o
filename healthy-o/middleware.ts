import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

// 인증이 필요한 경로 목록
const protectedPaths = [
  '/api/mypage',
  '/api/hospital',
  '/api/supplements',
];

// 인증이 필요하지 않은 API 경로 목록
const publicApiPaths = [
  '/api/auth/login',
  '/api/auth/signup',
  '/api/health/diagnosis',
  '/api/question',
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 공개 API는 통과
  if (publicApiPaths.some(publicPath => path.startsWith(publicPath))) {
    return NextResponse.next();
  }

  // 보호된 경로인지 확인
  const isProtectedPath = protectedPaths.some(protectedPath => 
    path === protectedPath || path.startsWith(`${protectedPath}/`)
  );

  if (!isProtectedPath) {
    return NextResponse.next();
  }

  // 토큰 확인 (쿠키 또는 Authorization 헤더)
  const token = request.cookies.get('token')?.value || 
                request.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    // API 요청인 경우 401 응답
    if (path.startsWith('/api/')) {
      return NextResponse.json(
        { message: '인증이 필요합니다.' },
        { status: 401 }
      );
    }
    // 페이지 요청인 경우 로그인 페이지로 리다이렉트
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // 토큰 검증
    verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // API 요청에 토큰 추가
    if (path.startsWith('/api/')) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('Authorization', `Bearer ${token}`);
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }
    
    return NextResponse.next();
  } catch (error) {
    // 토큰이 유효하지 않은 경우
    if (path.startsWith('/api/')) {
      return NextResponse.json(
        { message: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }
    // 쿠키 삭제
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    return response;
  }
}

export const config = {
  matcher: [
    '/api/mypage/:path*',
    '/api/hospital/:path*',
    '/api/supplements/:path*',
  ],
}; 