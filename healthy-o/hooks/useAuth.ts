import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { useAuthStore } from '@/store/auth';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: number;
  email: string;
  name: string;
  gender?: string;
  birthDate?: string;
  height?: number;
  weight?: number;
}

interface LoginResponse {
  message: string;
  data: {
    token: string;
    user: User;
  };
}

interface SignupData {
  email: string;
  password: string;
  name: string;
  gender: 'M' | 'F';
  birthDate: string;
}

interface UseAuthOptions {
  requireAuth?: boolean;
  redirectTo?: string;
}

interface ApiError {
  message: string;
}

export function useAuth({ requireAuth = true, redirectTo = '/login' } = {}) {
  const router = useRouter();
  const { isLoggedIn, token, user, setLoggedIn, setLoggedOut } = useAuthStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // 초기 인증 상태 설정
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUserStr = localStorage.getItem('user');

        if (!storedToken || !storedUserStr) {
          console.log('[useAuth] No stored credentials found');
          setLoggedOut();
          setInitialized(true);
          setLoading(false);
          if (requireAuth) {
            router.push(redirectTo);
          }
          return;
        }

        // 저장된 사용자 정보 파싱
        let storedUser;
        try {
          storedUser = JSON.parse(storedUserStr);
        } catch (e) {
          console.error('[useAuth] Failed to parse stored user:', e);
          setLoggedOut();
          setInitialized(true);
          setLoading(false);
          if (requireAuth) {
            router.push(redirectTo);
          }
          return;
        }

        // 토큰 유효성 검증
        try {
          console.log('[useAuth] Validating stored token');
          const response = await fetch('/api/auth/check', {
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              response.status === 401 
                ? (errorData.message || 'Token expired') 
                : 'Token validation failed'
            );
          }

          const data = await response.json();
          if (!data.success) {
            throw new Error(data.message || 'Token validation failed');
          }

          // 토큰 검증이 성공하면 서버에서 받은 최신 사용자 정보로 업데이트
          const updatedUser = {
            ...storedUser,
            ...data.data.user
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          console.log('[useAuth] Token validated successfully');
          setLoggedIn(storedToken, updatedUser);
        } catch (error) {
          console.error('[useAuth] Token validation failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setLoggedOut();
          
          if (requireAuth) {
            const errorMessage = error instanceof Error ? error.message : '인증에 실패했습니다';
            if (errorMessage === 'Token expired') {
              toast({
                title: "세션이 만료되었습니다",
                description: "다시 로그인해주세요.",
                variant: "destructive",
              });
            }
            router.push(redirectTo);
          }
        }
      } finally {
        setInitialized(true);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post<LoginResponse>('/api/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setLoggedIn(token, user);
      router.push('/');
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(
        axiosError.response?.data?.message || '로그인 실패'
      );
    } finally {
      setLoading(false);
    }
  }, [router, setLoggedIn]);

  const signup = useCallback(async (data: SignupData) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/signup', data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(
        axiosError.response?.data?.message || '회원가입 실패'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedOut();
    router.push('/login');
  }, [router, setLoggedOut]);

  return {
    user,
    loading,
    isLoggedIn,
    token,
    initialized,
    login,
    signup,
    logout,
  };
} 