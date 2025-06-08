import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { DiagnosisRecord } from '@/types/records';
import { getCachedData, setCachedData } from '@/utils/cache';

const CACHE_KEY = 'mypage_diagnosis_data';

export const useDiagnosisRecords = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoggedIn, initialized, token } = useAuth();
  const [records, setRecords] = useState<DiagnosisRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiagnosisResults = async () => {
      try {
        if (!initialized || !isLoggedIn) return;

        // 캐시된 데이터 확인
        const cachedData = getCachedData<DiagnosisRecord[]>(CACHE_KEY);
        if (cachedData) {
          setRecords(cachedData);
          setLoading(false);
          return;
        }

        const response = await fetch('/api/mypage/diagnosis', {
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
          throw new Error('진단 결과를 불러오는데 실패했습니다.');
        }

        const result = await response.json();
        if (!result.success) {
          throw new Error(result.message);
        }

        if (!Array.isArray(result.data)) {
          throw new Error('잘못된 데이터 형식입니다.');
        }

        const diagnosisData = result.data.map((record: any) => {
          if (!record.id || !record.createdAt) return null;

          try {
            const diseases = typeof record.diseases === 'string' 
              ? JSON.parse(record.diseases) 
              : (record.diseases || []);

            const departments = typeof record.recommendedDepartments === 'string'
              ? JSON.parse(record.recommendedDepartments)
              : (record.recommendedDepartments || []);

            const supplements = typeof record.supplements === 'string'
              ? JSON.parse(record.supplements)
              : (record.supplements || []);

            return {
              id: record.id,
              diagnosisId: record.diagnosisId || record.id,
              createdAt: new Date(record.createdAt).toISOString().split('T')[0],
              name: record.name || "",
              age: record.age || 0,
              gender: record.gender || "",
              height: record.height?.toString() || "",
              weight: record.weight?.toString() || "",
              bmi: record.bmi?.toString() || "",
              chronicDiseases: record.chronicDiseases || "없음",
              medications: record.medications || "없음",
              smoking: record.smoking || "NON",
              drinking: record.drinking || "NON",
              exercise: record.exercise || "NONE",
              sleep: record.sleep || "",
              occupation: record.occupation || "",
              workStyle: record.workStyle || "",
              diet: record.diet || "",
              mealRegularity: record.mealRegularity || "",
              symptoms: record.symptoms || "",
              symptomStartDate: record.symptomStartDate || "",
              diseases: Array.isArray(diseases) ? diseases : [],
              recommendedDepartments: Array.isArray(departments) ? departments : [],
              supplements: Array.isArray(supplements) ? supplements : []
            };
          } catch (error) {
            console.error('레코드 처리 중 에러:', error);
            return null;
          }
        }).filter(Boolean);

        setCachedData(CACHE_KEY, diagnosisData);
        setRecords(diagnosisData);
      } catch (error) {
        console.error('Error fetching diagnosis records:', error);
        toast({
          title: "진단 기록 로드 실패",
          description: "진단 기록을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (initialized && isLoggedIn) {
      fetchDiagnosisResults();
    }
  }, [initialized, isLoggedIn, router, toast, token]);

  return {
    records,
    loading
  };
}; 