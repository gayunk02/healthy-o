import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  name: string;
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

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 사용자 정보 로드
  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await axios.get('/api/mypage');
        setUser(response.data.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await axios.post<LoginResponse>('/api/auth/login', {
        email,
        password,
      });

      setUser(response.data.data.user);
      router.push('/');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '로그인 실패');
    }
  }, [router]);

  const signup = useCallback(async (data: SignupData) => {
    try {
      const response = await axios.post('/api/auth/signup', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '회원가입 실패');
    }
  }, []);

  const logout = useCallback(() => {
    // 쿠키 삭제
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setUser(null);
    router.push('/');
  }, [router]);

  return {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };
} 