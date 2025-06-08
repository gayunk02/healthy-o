import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { SupplementRecord } from '@/types/records';
import { getCachedData, setCachedData } from '@/utils/cache';

const CACHE_KEY = 'mypage_supplement_data';

export const useSupplementRecords = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoggedIn, initialized, token } = useAuth();
  const [records, setRecords] = useState<SupplementRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupplementRecords = async () => {
      try {
        if (!initialized || !isLoggedIn) return;

        // 캐시된 데이터 확인
        const cachedData = getCachedData<SupplementRecord[]>(CACHE_KEY);
        if (cachedData) {
          setRecords(cachedData);
          setLoading(false);
          return;
        }

        const response = await fetch('/api/mypage/supplement-records', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast({
              title: "세션이 만료되었습니다",
              description: "다시 로그인해주세요.",
              variant: "destructive",
            });
            router.push('/login');
            return;
          }
          throw new Error('영양제 추천 기록을 불러오는데 실패했습니다.');
        }

        const result = await response.json();
        if (!result.success) {
          throw new Error(result.message);
        }

        setCachedData(CACHE_KEY, result.data);
        setRecords(result.data);
      } catch (error) {
        console.error('Error fetching supplement records:', error);
        toast({
          title: "오류",
          description: error instanceof Error ? error.message : "영양제 추천 기록을 불러오는데 실패했습니다.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (initialized && isLoggedIn) {
      fetchSupplementRecords();
    }
  }, [initialized, isLoggedIn, router, toast, token]);

  return {
    records,
    loading
  };
}; 