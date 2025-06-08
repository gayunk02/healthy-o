import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { SupplementRecord } from '@/types/records';

export const useSupplementRecords = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoggedIn, initialized, token } = useAuth();
  const [records, setRecords] = useState<SupplementRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    setRefreshTrigger(prev => prev + 1);
    try {
      await fetchSupplementRecords();
    } finally {
      setLoading(false);
    }
  };

  const fetchSupplementRecords = async () => {
    try {
      if (!initialized || !isLoggedIn) return;

      const response = await fetch("/api/mypage/supplement-records", {
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-store'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("인증이 만료되었습니다. 다시 로그인해주세요.");
        }
        throw new Error("영양제 추천 기록을 불러오는데 실패했습니다.");
      }

      const data = await response.json();
      if (data.success) {
        setRecords(data.data);
        setError(null);
      } else {
        throw new Error(data.message || "영양제 추천 기록을 불러오는데 실패했습니다.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "오류가 발생했습니다.";
      setError(errorMessage);
      toast({
        title: "오류",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchSupplementRecords();
  }, [initialized, isLoggedIn, token, refreshTrigger]);

  return { records, loading, error, refresh };
}; 