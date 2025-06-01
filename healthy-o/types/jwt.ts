import jwt from 'jsonwebtoken';

// 타입 정의
export interface IJwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface ITokenResponse {
  accessToken: string;
  refreshToken?: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function signJwt(payload: Omit<IJwtPayload, 'iat' | 'exp'>) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1d', // 토큰 만료 시간 1일
  });
}

export function verifyJwt(token: string): IJwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as IJwtPayload;
  } catch (error) {
    return null;
  }
} 