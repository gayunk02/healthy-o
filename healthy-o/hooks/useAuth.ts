import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
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

export function useAuth({ requireAuth = true, redirectTo = '/login' } = {}) {
  const router = useRouter();
  const { isLoggedIn, token, user, setLoggedIn, setLoggedOut } = useAuthStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (!storedToken || !storedUser) {
        setLoggedOut();
        if (requireAuth) {
          router.push(redirectTo);
        }
        return;
      }

      try {
        const response = await fetch('/api/mypage', {
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Token validation failed');
        }

        const data = await response.json();
        if (data.success) {
          setLoggedIn(storedToken, data.data.user);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setLoggedOut();
        if (requireAuth) {
          router.push(redirectTo);
        }
      }
    };

    checkAuth();
  }, [requireAuth, redirectTo, router, setLoggedIn, setLoggedOut]);

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
    token,
    login,
    signup,
    logout,
  };
} 