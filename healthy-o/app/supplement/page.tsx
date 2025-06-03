'use client';

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabNavigation } from "@/components/layout/TabNavigation";
import { AlertTriangle, ChevronDown, Pill, Zap, Stethoscope } from "lucide-react";
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

  // 영양제 데이터 불러오기
  useEffect(() => {
    const fetchSupplements = async () => {
      try {
        setIsLoading(true);

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

        const response = await fetch('/api/supplements/recommendations', {
          credentials: 'include',
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
        if (!data.success) {
          throw new Error(data.message || '영양제 데이터를 불러오는데 실패했습니다.');
        }

        setSupplements(data.data.supplements);
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

    if (isLoggedIn) {
      fetchSupplements();
    }
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
                            주요 효능
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
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
} 