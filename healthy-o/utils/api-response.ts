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

type ApiResponseType<T = any> = ISuccessResponse<T> | IErrorResponse;

export class ApiResponse {
  static success(message: string, data?: any) {
    return NextResponse.json({
      success: true,
      message,
      data
    }, { status: 200 });
  }

  static error(message: string, status: number = 500, errors?: any) {
    return NextResponse.json({
      success: false,
      message,
      errors
    }, { status });
  }

  static unauthorized(message: string = '인증이 필요합니다.') {
    return NextResponse.json({
      success: false,
      message
    }, { status: 401 });
  }

  static notFound(message: string = '리소스를 찾을 수 없습니다.') {
    return NextResponse.json({
      success: false,
      message
    }, { status: 404 });
  }
}

// HTTP 상태 코드별 에러 응답 헬퍼 함수들
export const unauthorizedError = (message: string = '인증이 필요합니다.') =>
  ApiResponse.error(message, 401);

export const forbiddenError = (message: string = '접근 권한이 없습니다.') =>
  ApiResponse.error(message, 403);

export const notFoundError = (message: string = '리소스를 찾을 수 없습니다.') =>
  ApiResponse.error(message, 404);

export const serverError = (message: string = '서버 오류가 발생했습니다.') =>
  ApiResponse.error(message, 500); 