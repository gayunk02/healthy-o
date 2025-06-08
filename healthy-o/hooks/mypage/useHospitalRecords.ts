import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { HospitalRecord } from '@/types/records';

export const useHospitalRecords = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoggedIn, initialized, token } = useAuth();
  const [records, setRecords] = useState<HospitalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    setRefreshTrigger(prev => prev + 1);
    try {
      await fetchHospitalRecords();
    } finally {
      setLoading(false);
    }
  };

  const fetchHospitalRecords = async () => {
    try {
      if (!initialized || !isLoggedIn) return;

      const response = await fetch("/api/mypage/hospital-records", {
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-store'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("인증이 만료되었습니다. 다시 로그인해주세요.");
        }
        throw new Error("병원 추천 기록을 불러오는데 실패했습니다.");
      }

      const data = await response.json();
      if (data.success) {
        setRecords(data.data);
        setError(null);
      } else {
        throw new Error(data.message || "병원 추천 기록을 불러오는데 실패했습니다.");
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
    fetchHospitalRecords();
  }, [initialized, isLoggedIn, token, refreshTrigger]);

  return { records, loading, error, refresh };
}; 