'use client';

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabNavigation } from "@/components/layout/TabNavigation";

interface ISupplement {
  name: string;
  description: string;
  benefits: string[];
  matchingSymptoms: string[];
}

export default function SupplementPage() {
  const router = useRouter();

  const mockSupplements: ISupplement[] = [
    {
      name: "비타민 D",
      description: "면역력 강화와 뼈 건강에 필수적인 영양소",
      benefits: [
        "면역력 강화",
        "뼈 건강 유지",
        "칼슘 흡수 촉진"
      ],
      matchingSymptoms: [
        "피로감",
        "잦은 감기",
        "근육 약화"
      ]
    },
    {
      name: "오메가 3",
      description: "혈관 건강과 뇌 기능 개선에 도움",
      benefits: [
        "심혈관 건강",
        "뇌 기능 향상",
        "관절 건강"
      ],
      matchingSymptoms: [
        "관절통",
        "고지혈증",
        "기억력 저하"
      ]
    },
    {
      name: "프로바이오틱스",
      description: "장 건강과 면역력 향상에 효과적",
      benefits: [
        "장 건강 개선",
        "면역력 강화",
        "영양소 흡수 촉진"
      ],
      matchingSymptoms: [
        "소화불량",
        "복부 팽만감",
        "변비"
      ]
    }
  ];

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
                  ⚠️ 본 정보는 참고용이며, 정확한 복용은 반드시 전문가와 상담하시기 바랍니다.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid gap-6">
                {mockSupplements.map((supplement, index) => (
                  <div 
                    key={index} 
                    className="p-6 rounded-lg border bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-200">
                          <h3 className="flex items-center gap-2 text-xl font-bold tracking-wide text-[#0B4619] drop-shadow-[0_1px_1px_rgba(11,70,25,0.15)]">
                            <span className="text-[#0B4619]/90">🌿</span>
                            {supplement.name}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600">{supplement.description}</p>
                      </div>

                      <div className="space-y-5">
                        <div>
                          <h4 className="font-bold text-base text-[#0B4619] mb-2">주요 효능</h4>
                          <ul className="list-disc pl-5 space-y-1.5">
                            {supplement.benefits.map((benefit, idx) => (
                              <li key={idx} className="text-sm text-gray-700">{benefit}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-bold text-base text-[#0B4619] mb-2">관련 증상</h4>
                          <ul className="list-disc pl-5 space-y-1.5">
                            {supplement.matchingSymptoms.map((symptom, idx) => (
                              <li key={idx} className="text-sm text-gray-700">{symptom}</li>
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
                  <span className="animate-bounce">👇</span>
                  <span>아래에서 다른 건강 정보도 확인해보세요</span>
                  <span className="animate-bounce">👇</span>
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