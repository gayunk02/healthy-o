'use client';

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabNavigation } from "@/components/layout/TabNavigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ChevronDown, Stethoscope, Lightbulb } from "lucide-react";
import { IHealthResultUI } from "@/types/ui";

export default function ResultPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<IHealthResultUI[]>([
    {
      name: "고혈압",
      description: "혈압이 높은 상태를 의미하며, 의사의 진단을 받는 것을 추천합니다.",
      mainSymptoms: [
        "두통이 자주 발생",
        "어지러움",
        "피로감 증가"
      ],
      keyAdvice: [
        "규칙적인 운동 (하루 30분 이상 걷기)",
        "저염식 식단 유지",
        "정기적인 혈압 체크"
      ],
      riskLevel: '중간'
    },
    {
      name: "비염",
      description: "재채기, 콧물, 코막힘 증상을 동반할 수 있는 알레르기 질환입니다.",
      mainSymptoms: [
        "잦은 재채기",
        "맑은 콧물",
        "코막힘"
      ],
      keyAdvice: [
        "실내 습도 조절 (40-50%)",
        "정기적인 환기와 청소",
        "알레르기 검사 권장"
      ],
      riskLevel: '낮음'
    },
    {
      name: "위염",
      description: "위 점막의 염증으로 인한 소화기 질환으로, 적절한 식이 관리가 중요합니다.",
      mainSymptoms: [
        "상복부 통증",
        "메스꺼움",
        "소화불량"
      ],
      keyAdvice: [
        "규칙적인 식사하기",
        "자극적인 음식 피하기",
        "천천히 식사하기"
      ],
      riskLevel: '중간'
    }
  ]);

  useEffect(() => {
    // TODO: API에서 실제 결과 데이터를 가져오는 로직 추가
    setLoading(false);
  }, []);

  const onClickHospital = () => {
    router.push('/hospital');
  }

  const onClickSupplement = () => {
    router.push('/supplement');
  }

  const getRiskLevelStyle = (level: string): string => {
    switch (level) {
      case '높음':
        return 'bg-red-50 text-red-700 border-red-200';
      case '중간':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case '낮음':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">결과를 불러오는 중...</div>
          <div className="text-gray-600">잠시만 기다려주세요.</div>
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
                {results.map((result, index) => (
                  <div 
                    key={index} 
                    className="p-5 rounded-lg border bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3 pb-3 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                          <h3 className="flex items-center gap-2 text-lg font-bold tracking-wide text-[#0B4619]">
                            <Stethoscope className="w-4 h-4 text-[#0B4619]/90" />
                            {result.name}
                          </h3>
                          <Badge 
                            variant="outline" 
                            className={`text-sm px-2 py-0.5 ${getRiskLevelStyle(result.riskLevel)}`}
                          >
                            위험도: {result.riskLevel}
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
                              {result.keyAdvice.slice(0, 3).map((advice, idx) => (
                                <li key={idx} className="text-sm text-gray-700 flex items-start gap-1.5">
                                  <span className="text-[#0B4619] font-medium">•</span>
                                  {advice}
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