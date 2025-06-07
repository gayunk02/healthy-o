'use client';

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabNavigation } from "@/components/layout/TabNavigation";
import { AlertTriangle, ChevronDown, Pill, Zap, Stethoscope, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface Supplement {
  supplementName: string;
  description: string;
  benefits: string[];
  matchingSymptoms: string[];
}

export default function SupplementPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [supplements, setSupplements] = useState<Supplement[]>([]);

  // 비로그인 사용자 체크
  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        title: "로그인이 필요한 서비스입니다.",
        description: "로그인 페이지로 이동합니다.",
        variant: "destructive",
        duration: 3000,
      });
      router.push('/login');
      return;
    }
  }, [isLoggedIn, router, toast]);

  // 캐시된 데이터 확인
  useEffect(() => {
    const cachedSupplements = localStorage.getItem('cached_supplements');
    const cacheTimestamp = localStorage.getItem('supplements_cache_timestamp');
    const cachedDiagnosisId = localStorage.getItem('cached_diagnosis_id');
    const questionSubmitted = localStorage.getItem('question_submitted');
    
    // 현재 진단 ID 확인 (쿠키에서)
    const currentDiagnosisId = document.cookie
      .split('; ')
      .find(row => row.startsWith('diagnosis_id='))
      ?.split('=')[1];
    
    // 새로운 진단 ID가 있으면 캐시 무효화
    if (currentDiagnosisId && cachedDiagnosisId !== currentDiagnosisId) {
      console.log('[Supplement Page] New diagnosis detected, clearing cache');
      localStorage.removeItem('cached_supplements');
      localStorage.removeItem('supplements_cache_timestamp');
      localStorage.removeItem('cached_diagnosis_id');
      return;
    }
    
    // 캐시가 30분 이내면 사용
    if (cachedSupplements && cacheTimestamp) {
      const cacheAge = Date.now() - parseInt(cacheTimestamp);
      const thirtyMinutes = 30 * 60 * 1000;
      
      if (cacheAge < thirtyMinutes) {
        console.log('[Supplement Page] Using cached data');
        setSupplements(JSON.parse(cachedSupplements));
        setIsLoading(false);
        return;
      }
    }
  }, []);

  // 영양제 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn) return;

      try {
        setIsLoading(true);

        // 캐시된 데이터가 있으면 API 호출 건너뛰기
        const cachedSupplements = localStorage.getItem('cached_supplements');
        const cacheTimestamp = localStorage.getItem('supplements_cache_timestamp');
        if (cachedSupplements && cacheTimestamp) {
          const cacheAge = Date.now() - parseInt(cacheTimestamp);
          const thirtyMinutes = 30 * 60 * 1000;
          
          if (cacheAge < thirtyMinutes) {
            console.log('[Supplement Page] Using cached data, skipping API call');
            return;
          }
        }

        // 토큰 확인
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('[Supplement Page] No token found, redirecting to login');
          toast({
            title: "로그인이 필요합니다",
            description: "영양제 추천 서비스를 이용하려면 로그인이 필요합니다.",
            duration: 3000,
          });
          router.push('/login');
          return;
        }

        console.log('[Supplement Page] Fetching new data');
        const response = await fetch('/api/supplements/recommendations', {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          
          if (response.status === 404 && errorData.message.includes('진단 결과가 없습니다')) {
            toast({
              title: "건강 설문 필요",
              description: "맞춤형 영양제 추천을 위해 건강 설문이 필요합니다.",
              duration: 3000,
            });
            router.push('/question');
            return;
          }
          
          throw new Error(errorData.message || '영양제 정보를 불러오는데 실패했습니다.');
        }

        const data = await response.json();
        if (!data.success || !data.data.supplements || data.data.supplements.length === 0) {
          console.log('[Supplement Page] No supplements data received');
          toast({
            title: "영양제 추천을 생성 중입니다",
            description: "잠시 후 다시 시도해주세요.",
            duration: 3000,
          });
          return;
        }

        // 새로운 데이터 설정 및 캐싱
        console.log('[Supplement Page] New data received, updating cache');
        setSupplements(data.data.supplements);

        const currentDiagnosisId = document.cookie
          .split('; ')
          .find(row => row.startsWith('diagnosis_id='))
          ?.split('=')[1];

        if (currentDiagnosisId) {
          localStorage.setItem('cached_supplements', JSON.stringify(data.data.supplements));
          localStorage.setItem('supplements_cache_timestamp', Date.now().toString());
          localStorage.setItem('cached_diagnosis_id', currentDiagnosisId);
          console.log('[Supplement Page] Cache updated with new diagnosis ID:', currentDiagnosisId);
        }

      } catch (error) {
        console.error('[Supplement Page] 영양제 데이터 로딩 실패:', error);
        toast({
          title: "영양제 정보 로딩 실패",
          description: error instanceof Error ? error.message : "영양제 정보를 불러오는데 실패했습니다.",
          variant: "destructive",
          duration: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn, router, toast]);

  return (
    <div className="w-full pt-[100px] pb-20">
      <div className="w-full max-w-[800px] mx-auto">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="border-b">
            <TabNavigation />
          </div>
          <div className="px-6 py-10">
            <CardHeader className="space-y-3 text-center">
              <CardTitle className="text-3xl font-bold text-[#0B4619]">
                💊 맞춤 영양제 추천
              </CardTitle>
              <div className="flex flex-col items-center gap-3">
                <CardDescription className="text-base text-gray-600">
                  입력하신 건강 정보를 바탕으로 맞춤형 영양제를 추천해드립니다.
                </CardDescription>
                <CardDescription className="text-sm text-yellow-600 font-medium mb-6">
                  <AlertTriangle className="w-4 h-4 inline-block mb-1 mr-1" />
                  본 정보는 참고용이며, 정확한 복용은 반드시 전문가와 상담하시기 바랍니다.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin text-[#0B4619]" />
                  <p className="text-sm text-gray-500">맞춤 영양제를 분석하고 있습니다...</p>
                </div>
              ) : (
                <>
                  <div className="grid gap-4">
                    {supplements.map((supplement, index) => (
                      <div 
                        key={index} 
                        className="p-5 rounded-lg border bg-white hover:shadow-md transition-shadow"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-3 pb-3 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                              <h3 className="flex items-center gap-2 text-lg font-bold tracking-wide text-[#0B4619]">
                                <Pill className="w-4 h-4 text-[#0B4619]/90" />
                                {supplement.supplementName}
                              </h3>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <p className="text-sm text-gray-600 leading-relaxed">{supplement.description}</p>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-bold text-sm text-[#0B4619] mb-2 flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                개선 효과
                              </h4>
                              <ul className="space-y-1.5">
                                {supplement.benefits.map((benefit, idx) => (
                                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-1.5">
                                    <span className="text-[#0B4619] font-medium">•</span>
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-bold text-sm text-[#0B4619] mb-2 flex items-center gap-2">
                                <Stethoscope className="w-4 h-4" />
                                관련 증상
                              </h4>
                              <ul className="space-y-1.5">
                                {supplement.matchingSymptoms.map((symptom, idx) => (
                                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-1.5">
                                    <span className="text-[#0B4619] font-medium">•</span>
                                    {symptom}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center space-y-4 pt-6">
                    <div className="flex items-center justify-center gap-2 text-base text-gray-600">
                      <ChevronDown className="w-5 h-5 animate-bounce" />
                      <span>아래에서 다른 건강 정보도 확인해보세요</span>
                      <ChevronDown className="w-5 h-5 animate-bounce" />
                    </div>
                    <div className="flex justify-center gap-4">
                      <Button
                        onClick={() => router.push('/')}
                        variant="outline"
                        className="border-[#0B4619] text-[#0B4619] hover:bg-[#0B4619]/5"
                      >
                        메인으로
                      </Button>
                      <Button
                        onClick={() => router.push('/hospital')}
                        className="bg-[#0B4619] hover:bg-[#0B4619]/90 text-white font-medium"
                      >
                        병원 찾기
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
} 