import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UseAuthOptions {
  requireConsent?: boolean;
}

export function useAuth({ requireConsent = false }: UseAuthOptions = {}) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const consent = localStorage.getItem('consent');

    if (!token) {
      alert('로그인이 필요한 서비스입니다.');
      router.push('/login');
      return;
    }

    if (requireConsent && consent !== 'true') {
      alert('서비스 이용을 위해 동의가 필요합니다.');
      router.push('/disclaimer');
      return;
    }

    setIsAuth(true);
    setLoading(false);
  }, [router, requireConsent]);

  return { isAuth, loading };
} 