'use client';

import { useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabNavigation } from "@/components/layout/TabNavigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ChevronDown, Stethoscope, Lightbulb, ArrowRight } from "lucide-react";
import { IHealthDiagnosisResultUI, IHealthResult } from "@/types/ui";
import { useToast } from "@/hooks/use-toast"
import { useAuth } from '@/hooks/useAuth';
import { clearMypageCache } from '@/utils/cache';

export default function ResultPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [diagnosisResult, setDiagnosisResult] = useState<IHealthDiagnosisResultUI>({
    results: [],
    recommendedDepartments: [],
    supplement_recommendations: [],
    disclaimer: ''
  });
  const fetchedRef = useRef(false);

  const checkAnalysisStatus = async () => {
    try {
      console.log('[Result Page] Checking analysis status...');
      
      const status = localStorage.getItem('analysis_status');
      const savedResult = localStorage.getItem('diagnosis_result');
      
      console.log('[Result Page] Current status:', status);
      console.log('[Result Page] Has saved result:', !!savedResult);
      
      if (status === 'completed' && savedResult) {
        try {
          const parsedResult = JSON.parse(savedResult);
          setDiagnosisResult(parsedResult);
          setLoading(false);
          console.log('[Result Page] Successfully loaded result');
          
          // 진단 결과가 완료되면 마이페이지 캐시를 무효화
          clearMypageCache();
        } catch (error) {
          console.error('[Result Page] Error parsing result:', error);
          throw new Error('결과 데이터 형식이 올바르지 않습니다.');
        }
      } else if (status === 'error') {
        // 에러 발생한 경우
        const errorMessage = localStorage.getItem('analysis_error') || '분석 중 오류가 발생했습니다.';
        console.error('[Result Page] Analysis failed:', errorMessage);
        toast({
          title: "분석 실패",
          description: errorMessage,
          variant: "destructive",
          duration: 5000,
        });
        router.push('/question');
      } else if (!status) {
        // 분석 상태가 없는 경우 (직접 URL 접근 등)
        console.log('[Result Page] No analysis status found');
        toast({
          title: "잘못된 접근",
          description: "먼저 건강 설문을 작성해주세요.",
          variant: "destructive",
          duration: 5000,
        });
        router.push('/question');
      }
    } catch (error) {
      console.error('[Result Page] Error:', error);
      toast({
        title: "오류 발생",
        description: error instanceof Error ? error.message : "결과를 불러오는 중 오류가 발생했습니다.",
        variant: "destructive",
        duration: 5000,
      });
      router.push('/question');
    }
  };

  useEffect(() => {
    if (!fetchedRef.current) {
      fetchedRef.current = true;
      
      // 초기 상태 확인
      const initialCheck = async () => {
        const status = localStorage.getItem('analysis_status');
        const savedResult = localStorage.getItem('diagnosis_result');
        
        if (status === 'completed' && savedResult) {
          // 이미 결과가 있는 경우 바로 표시
          await checkAnalysisStatus();
        } else if (status === 'pending') {
          // 결과 대기 중인 경우 주기적으로 확인
          const statusCheck = setInterval(async () => {
            const currentStatus = localStorage.getItem('analysis_status');
            if (currentStatus === 'completed' || currentStatus === 'error') {
              clearInterval(statusCheck);
              await checkAnalysisStatus();
            }
          }, 1000);

          // 60초 후에도 결과가 없으면 사용자에게 선택권 제공
          setTimeout(() => {
            clearInterval(statusCheck);
            if (loading) {
              const finalStatus = localStorage.getItem('analysis_status');
              if (finalStatus === 'pending') {
                toast({
                  title: "분석이 예상보다 오래 걸리고 있습니다",
                  description: "계속 기다리시겠습니까?",
                  action: (
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push('/question')}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        취소
                      </button>
                      <button
                        onClick={() => {
                          toast({
                            title: "분석을 계속 진행합니다",
                            description: "결과가 나오면 자동으로 표시됩니다",
                            duration: 3000,
                          });
                        }}
                        className="bg-[#0B4619] text-white px-3 py-1 rounded"
                      >
                        계속 기다리기
                      </button>
                    </div>
                  ),
                  duration: 0,
                });
              }
            }
          }, 60000);

          return () => {
            clearInterval(statusCheck);
          };
        } else {
          // 잘못된 접근
          toast({
            title: "잘못된 접근",
            description: "먼저 건강 설문을 작성해주세요.",
            variant: "destructive",
            duration: 5000,
          });
          router.push('/question');
        }
      };

      initialCheck();
    }
  }, []);

  const onClickHospital = () => {
    if (!isLoggedIn) {
      toast({
        title: "로그인이 필요한 서비스입니다",
        description: (
          <div className="mt-1 relative pr-7">
            <p className="text-sm text-gray-500">해당 서비스를 이용하려면 로그인이 필요합니다.</p>
            <Button 
              variant="ghost" 
              size="sm"
              className="absolute right-[-8px] top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent hover:text-[#0B4619] text-gray-400"
              onClick={() => router.push('/login')}
            >
              <ArrowRight className="h-5 w-5" strokeWidth={2} />
            </Button>
          </div>
        ),
        duration: 5000,
      });
      return;
    }
    router.push('/hospital');
  }

  const onClickSupplement = () => {
    if (!isLoggedIn) {
      toast({
        title: "로그인이 필요한 서비스입니다",
        description: (
          <div className="mt-1 relative pr-7">
            <p className="text-sm text-gray-500">해당 서비스를 이용하려면 로그인이 필요합니다.</p>
            <Button 
              variant="ghost" 
              size="sm"
              className="absolute right-[-8px] top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent hover:text-[#0B4619] text-gray-400"
              onClick={() => router.push('/login')}
            >
              <ArrowRight className="h-5 w-5" strokeWidth={2} />
            </Button>
          </div>
        ),
        duration: 5000,
      });
      return;
    }
    router.push('/supplement');
  }

  const getRiskLevelStyle = (level: 'low' | 'medium' | 'high'): string => {
    switch (level) {
      case 'high':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getRiskLevelText = (level: 'low' | 'medium' | 'high'): string => {
    const map = {
      low: '낮음',
      medium: '중간',
      high: '높음'
    };
    return map[level];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B4619] mx-auto"></div>
          <div className="text-2xl font-bold text-[#0B4619]">건강 정보를 분석중입니다</div>
          <div className="text-gray-600 max-w-md mx-auto space-y-2">
            <p>입력하신 증상과 건강 정보를 바탕으로</p>
            <p>정확한 분석을 진행하고 있습니다.</p>
            <p className="text-sm text-gray-500 mt-2">
              상세한 분석을 위해 20-30초 정도 소요될 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    );
  }

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
                🔬 건강 정보 검색 결과
              </CardTitle>
              <div className="flex flex-col items-center gap-3">
                <CardDescription className="text-base text-gray-600">
                  입력하신 정보를 바탕으로 유사한 건강 정보를 안내합니다.
                </CardDescription>
                <CardDescription className="text-sm text-yellow-600 font-medium mb-6">
                  <AlertTriangle className="w-4 h-4 inline-block mb-1 mr-1" />
                  본 정보는 참고용이며, 정확한 진단은 반드시 의료 전문가와 상담하시기 바랍니다.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid gap-6">
                {diagnosisResult.results.map((result, index) => (
                  <div 
                    key={index} 
                    className="p-5 rounded-lg border bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3 pb-3 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                          <h3 className="flex items-center gap-2 text-lg font-bold tracking-wide text-[#0B4619]">
                            <Stethoscope className="w-4 h-4 text-[#0B4619]/90" />
                            {result.diseaseName}
                          </h3>
                          <Badge 
                            variant="outline" 
                            className={`text-sm px-2 py-0.5 ${getRiskLevelStyle(result.riskLevel)}`}
                          >
                            위험도: {getRiskLevelText(result.riskLevel)}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <p className="text-sm text-gray-600 leading-relaxed">{result.description}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-bold text-sm text-[#0B4619] mb-2 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4" />
                              주요 증상
                            </h4>
                            <ul className="space-y-1.5">
                              {result.mainSymptoms.map((symptom, idx) => (
                                <li key={idx} className="text-sm text-gray-700 flex items-start gap-1.5">
                                  <span className="text-[#0B4619] font-medium">•</span>
                                  {symptom}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-bold text-sm text-[#0B4619] mb-2 flex items-center gap-2">
                              <Lightbulb className="w-4 h-4" />
                              관리 수칙
                            </h4>
                            <ul className="space-y-1.5">
                              {result.managementTips.map((tip, idx) => (
                                <li key={idx} className="text-sm text-gray-700 flex items-start gap-1.5">
                                  <span className="text-[#0B4619] font-medium">•</span>
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
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
                    onClick={onClickHospital}
                    className="bg-[#0B4619] hover:bg-[#0B4619]/90 text-white font-medium"
                  >
                    병원 찾기
                  </Button>
                  <Button
                    onClick={onClickSupplement}
                    className="bg-[#0B4619] hover:bg-[#0B4619]/90 text-white font-medium"
                  >
                    영양제 찾기
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