import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { IUserProfileData } from '@/types/ui';
import { getCachedData, setCachedData } from '@/utils/cache';

const CACHE_KEY = 'mypage_data';

export const useUserData = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoggedIn, initialized, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<IUserProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!initialized || !isLoggedIn) return;

        // 캐시된 데이터 확인
        const cachedData = getCachedData<IUserProfileData>(CACHE_KEY);
        if (cachedData) {
          setUserData(cachedData);
          setLoading(false);
          return;
        }

        const response = await fetch('/api/mypage', {
          headers: {
            'Authorization': `Bearer ${token}`
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
          throw new Error('Failed to fetch user data');
        }

        const result = await response.json();
        if (!result.success) {
          if (result.message.includes('토큰이 만료')) {
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
          throw new Error(result.message);
        }

        const { user, healthInfo } = result.data;
        
        const updatedUserData = {
          id: user.id,
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          birthDate: user.birthDate || "",
          gender: user.gender || undefined,
          marketingAgree: user.marketingAgree || false,
          height: healthInfo?.height || "",
          weight: healthInfo?.weight || "",
          medicalHistory: healthInfo?.chronicDiseases || "없음",
          medications: healthInfo?.medications || "없음",
          smoking: healthInfo?.smoking || undefined,
          drinking: healthInfo?.drinking || undefined,
          lifestyle: {
            exercise: healthInfo?.exercise || undefined,
            sleep: healthInfo?.sleep || undefined,
            occupation: healthInfo?.occupation || "",
            workStyle: healthInfo?.workStyle || undefined,
            diet: healthInfo?.diet || undefined,
            mealRegularity: healthInfo?.mealRegularity || undefined
          },
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        };

        setCachedData(CACHE_KEY, updatedUserData);
        setUserData(updatedUserData);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('사용자 정보를 불러오는데 실패했습니다.');
        toast({
          title: "오류",
          description: err instanceof Error ? err.message : "사용자 정보를 불러오는데 실패했습니다.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (initialized && isLoggedIn) {
      fetchUserData();
    }
  }, [initialized, isLoggedIn, router, toast, token]);

  const updateUserData = async (updatedData: Partial<IUserProfileData>) => {
    try {
      const response = await fetch('/api/mypage', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '서버 응답이 실패했습니다.');
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message);
      }

      const { user, healthInfo } = result.data;
      const newUserData = {
        ...userData,
        ...user,
        ...(healthInfo && {
          height: healthInfo.height?.toString(),
          weight: healthInfo.weight?.toString(),
          medicalHistory: healthInfo.chronicDiseases,
          medications: healthInfo.medications,
          smoking: healthInfo.smoking,
          drinking: healthInfo.drinking,
          lifestyle: {
            exercise: healthInfo.exercise || undefined,
            sleep: healthInfo.sleep || undefined,
            occupation: healthInfo.occupation || "",
            workStyle: healthInfo.workStyle || undefined,
            diet: healthInfo.diet || undefined,
            mealRegularity: healthInfo.mealRegularity || undefined
          }
        })
      };

      setCachedData(CACHE_KEY, newUserData);
      setUserData(newUserData);

      toast({
        title: "정보가 수정되었습니다.",
        description: "변경사항이 성공적으로 저장되었습니다.",
      });
    } catch (err) {
      console.error('Error updating user data:', err);
      toast({
        variant: "destructive",
        title: "오류가 발생했습니다.",
        description: err instanceof Error ? err.message : "정보 수정에 실패했습니다. 다시 시도해주세요.",
      });
      throw err;
    }
  };

  return {
    userData,
    loading,
    error,
    updateUserData
  };
}; 