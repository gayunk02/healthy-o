'use server';

import jwt from 'jsonwebtoken';
import { IJwtPayload } from '@/types/jwt';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export async function signJwt(payload: Omit<IJwtPayload, 'iat' | 'exp'>) {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1d',
  });
}

export async function verifyJwt(token: string): Promise<IJwtPayload | null> {
  if (!JWT_SECRET) {
    return null;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as IJwtPayload;
  } catch (error) {
    return null;
  }
} 