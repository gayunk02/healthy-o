import { NextResponse } from 'next/server';

interface ISuccessResponse<T = any> {
  success: true;
  message?: string;
  data?: T;
}

interface IErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, any>;
}

type ApiResponse<T = any> = ISuccessResponse<T> | IErrorResponse;

export function successResponse<T = any>(
  data?: T,
  message?: string,
  status: number = 200
): NextResponse<ISuccessResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      message,
      ...(data !== undefined && { data }),
    },
    { status }
  );
}

export function errorResponse(
  message: string,
  errors?: Record<string, any>,
  status: number = 400
): NextResponse<IErrorResponse> {
  return NextResponse.json(
    {
      success: false,
      message,
      ...(errors && { errors }),
    },
    { status }
  );
}

// HTTP 상태 코드별 에러 응답 헬퍼 함수들
export const unauthorizedError = (message: string = '인증이 필요합니다.') =>
  errorResponse(message, undefined, 401);

export const forbiddenError = (message: string = '접근 권한이 없습니다.') =>
  errorResponse(message, undefined, 403);

export const notFoundError = (message: string = '리소스를 찾을 수 없습니다.') =>
  errorResponse(message, undefined, 404);

export const serverError = (message: string = '서버 오류가 발생했습니다.') =>
  errorResponse(message, undefined, 500); 