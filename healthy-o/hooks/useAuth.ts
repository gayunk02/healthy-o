import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuthStore } from '@/store/auth';
import { toast } from '@/hooks/use-toast';

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
  requireConsent?: boolean;
  redirectTo?: string;
}

export function useAuth({ requireConsent = false, redirectTo = '/login' }: UseAuthOptions = {}) {
  const router = useRouter();
  const { isLoggedIn, user, setLoggedIn, setLoggedOut } = useAuthStore();
  const [loading, setLoading] = useState(true);

  // 사용자 정보 로드 및 인증 상태 체크
  useEffect(() => {
    const loadUser = async () => {
      try {
        // 먼저 로컬 스토리지의 토큰 체크
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        
        if (!token || !userStr) {
          setLoggedOut();
          setLoading(false);
          return;
        }

        // 동의 여부 체크
        if (requireConsent) {
          const consent = localStorage.getItem('consent');
          if (consent !== 'true') {
            router.push('/disclaimer');
            setLoading(false);
            return;
          }
        }

        try {
          // API로 사용자 정보 갱신
          const response = await fetch('/api/mypage', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            if (response.status === 401) {
              setLoggedOut();
              if (redirectTo) {
                router.push(redirectTo);
              }
              toast({
                description: '로그인이 만료되었습니다. 다시 로그인해주세요.',
                variant: 'destructive',
              });
              return;
            }
            throw new Error('Failed to fetch user info');
          }

          const data = await response.json();
          setLoggedIn(token, data.data);
        } catch (error) {
          console.error('Failed to fetch user info:', error);
          // API 호출 실패 시에도 토큰이 있다면 로그인 상태 유지
          try {
            const savedUser = JSON.parse(userStr);
            setLoggedIn(token, savedUser);
          } catch (parseError) {
            console.error('Failed to parse saved user:', parseError);
            setLoggedOut();
            if (redirectTo) {
              router.push(redirectTo);
            }
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setLoggedOut();
        if (redirectTo) {
          router.push(redirectTo);
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [router, requireConsent, redirectTo, setLoggedIn, setLoggedOut]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await axios.post<LoginResponse>('/api/auth/login', {
        email,
        password,
      });

      setLoggedIn(response.data.data.token, response.data.data.user);
      router.push('/');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '로그인 실패');
    }
  }, [router, setLoggedIn]);

  const signup = useCallback(async (data: SignupData) => {
    try {
      const response = await axios.post('/api/auth/signup', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '회원가입 실패');
    }
  }, []);

  const logout = useCallback(() => {
    setLoggedOut();
    router.push('/');
  }, [router, setLoggedOut]);

  return {
    user,
    loading,
    isLoggedIn,
    login,
    signup,
    logout,
  };
} 