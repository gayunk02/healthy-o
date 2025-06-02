import { SignJWT, jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { JWTPayload as JoseJWTPayload } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
const EXPIRATION_TIME = '24h';
const REFRESH_THRESHOLD = 60 * 60; // 1시간

interface CustomJWTPayload extends JoseJWTPayload {
  id: string;
  email: string;
  name: string;
}

export async function createToken(payload: Omit<CustomJWTPayload, 'exp' | 'iat'>) {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(EXPIRATION_TIME)
    .setIssuedAt()
    .sign(new TextEncoder().encode(SECRET_KEY));

  return token;
}

export async function verifyToken(token: string): Promise<CustomJWTPayload | null> {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(SECRET_KEY)
    );

    return payload as CustomJWTPayload;
  } catch (error) {
    return null;
  }
}

export async function shouldRefreshToken(token: string): Promise<boolean> {
  const payload = await verifyToken(token);
  if (!payload || !payload.exp) return false;

  const now = Math.floor(Date.now() / 1000);
  const timeUntilExpiry = payload.exp - now;

  return timeUntilExpiry < REFRESH_THRESHOLD;
}

export async function refreshToken(oldToken: string): Promise<string | null> {
  const payload = await verifyToken(oldToken);
  if (!payload) return null;

  const { id, email, name } = payload;
  return createToken({ id, email, name });
}

export function setTokenCookie(response: NextResponse, token: string) {
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24시간
  });
}

export function getTokenFromCookies(request: Request): string | undefined {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return undefined;

  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as { [key: string]: string });

  return cookies['token'];
}

export function removeTokenCookie(response: NextResponse) {
  response.cookies.delete('token');
}

export async function verifyAuth(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return { userId: null };
  }

  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
    const payload = verified.payload as unknown as CustomJWTPayload;
    return {
      userId: payload.id,
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return { userId: null };
  }
}

export async function verifyJwtToken(token: string): Promise<CustomJWTPayload | null> {
  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
    return verified.payload as unknown as CustomJWTPayload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export async function signJwtToken(payload: CustomJWTPayload): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(new TextEncoder().encode(SECRET_KEY));
  
  return token;
} 