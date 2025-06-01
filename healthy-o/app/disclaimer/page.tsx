'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Bot, Stethoscope, Info, Lightbulb, PenLine, ClipboardList, AlertCircle, AlertTriangle } from "lucide-react";

export default function DisclaimerPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleConfirm = () => {
    if (input !== "동의합니다") {
      toast({
        title: "입력 오류",
        description: "입력창에 정확히 '동의합니다'라고 입력해 주세요.",
        variant: "destructive",
      });
      return;
    }
    
    localStorage.setItem("consent", "true");
    router.push("/question");
  };

  const handleCancel = () => {
    toast({
      title: "서비스 이용 불가",
      description: "서비스 이용을 위해 동의가 필요합니다.",
      variant: "destructive",
    });
  };

  return (
    <>
      <div className="w-full pt-[100px] pb-20">
        <Card className="w-full max-w-[800px] shadow-lg mx-auto">
          <CardHeader className="space-y-3 pb-8">
            <CardTitle className="text-3xl font-bold text-center text-[#0B4619]">
              📋 서비스 이용 전 고지사항
            </CardTitle>
            <CardDescription className="text-center text-base">
              서비스 이용을 위해 아래 내용을 확인하고 동의해 주세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-10">
            <div className="space-y-8 text-gray-700">
              <div className="space-y-4 bg-gray-50 p-8 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="font-bold text-lg text-[#0B4619] flex items-center gap-2 pb-2 border-b border-gray-300">
                  <Bot className="w-5 h-5" />
                  서비스 정의
                </h3>
                <p className="leading-relaxed text-[15px]">
                  본 서비스는 OpenAI의 생성형 인공지능(chatGPT) 기술을 기반으로,
                  사용자가 입력한 데이터를 바탕으로 <span className="font-semibold text-[#0B4619]">참고용 검색 결과를 제공하는 AI 통합 정보 검색 도구</span>입니다.
                </p>
              </div>
              
              <div className="space-y-4 bg-gray-50 p-8 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="font-bold text-lg text-[#0B4619] flex items-center gap-2 pb-2 border-b border-gray-300">
                  <Stethoscope className="w-5 h-5" />
                  의료 서비스 관련 고지
                </h3>
                <p className="leading-relaxed text-[15px] space-y-2">
                  본 서비스는 <span className="text-red-500 font-semibold bg-red-50 px-1 rounded">의료법상 의료기관이 아니며, 또한 의료인(의사, 약사, 간호사 등) 및 의료 면허를 가진
                  전문가에 의해 운영되지 않습니다.</span> 따라서 본 서비스가 제공하는 정보는 <span className="text-red-500 font-semibold bg-red-50 px-1 rounded">의학적 진단, 치료, 예방, 처방을 위한 
                  조언이나 의료행위에 해당하지 않습니다.</span> 본 서비스에서 제공하는 결과는 전문적인 의료 상담이나 진료를 대체할 수 없으며 단순 결과를 제공하는 통합 검색 서비스 입니다.
                </p>
              </div>

              <div className="space-y-4 bg-gray-50 p-8 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="font-bold text-lg text-[#0B4619] flex items-center gap-2 pb-2 border-b border-gray-300">
                  <AlertCircle className="w-5 h-5" />
                  AI 정보 제공의 한계
                </h3>
                <div className="leading-relaxed text-[15px] space-y-4">
                  <p>
                    AI가 제시하는 정보는 일반적인 지식과 인공지능의 학습 결과를 기반으로 자동 생성된 것이며,
                    <span className="font-semibold text-[#0B4619]">개별 사용자에 맞춘 정확한 의학적 판단을 제공할 수 없습니다.</span>
                  </p>
                  <p>
                    본 서비스는 AI 기술의 한계로 인해 <span className="font-semibold text-[#0B4619]">부정확하거나 오해의 소지가 있는 정보가 포함될 수 있습니다.</span>
                    제공된 정보를 기반으로 사용자가 내린 건강, 의료, 생활 등과 관련한 판단이나 행동의 결과에 대해
                    <span className="text-red-500 font-semibold bg-red-50 px-1 rounded">본 서비스는 그 어떠한 법적·의료적 책임도 지지 않습니다.</span>
                  </p>
                </div>
              </div>

              <div className="space-y-4 bg-gray-50 p-8 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="font-bold text-lg text-[#0B4619] flex items-center gap-2 pb-2 border-b border-gray-300">
                  <AlertTriangle className="w-5 h-5" />
                  권장사항
                </h3>
                <div className="leading-relaxed text-[15px] space-y-4">
                  <p>
                    본 서비스에서 제공되는 정보는 <span className="text-red-500 font-semibold bg-red-50 px-1 rounded">의료 서비스나 의료 전문가의 진료 및 진단을 대체할 수 없습니다.</span>
                    사용자는 본 서비스를 통해 제공되는 정보를 <span className="font-semibold text-[#0B4619]">단순 참고 자료로만 활용</span>해야 하며, 건강상 우려가 있을 경우
                    <span className="text-red-500 font-semibold bg-red-50 px-1 rounded">반드시 자격 있는 의료 전문가와 상담하거나 의료기관을 직접 방문하여 진료를 받으시기 바랍니다.</span>
                  </p>
                  <p>
                    또한, 본 서비스에서 추천하는 병원, 의료기관, 건강기능식품은 일반적인 정보 제공을 위한 것이며, 
                    <span className="font-semibold text-[#0B4619]">특정 의료기관 또는 제품의 효능, 적합성, 안전성을 보장하거나 권장하는 것이 아닙니다.</span>
                    건강기능식품의 경우 본 결과는 참고만 할 뿐, <span className="font-semibold text-[#0B4619]">관련 기관 및 전문가와 상의 후 복용하시길 바랍니다.</span>
                  </p>
                  <p className="font-semibold text-red-500 bg-red-50 p-4 rounded-md mt-4 text-center">
                    정확하고 안전한 건강 관리를 위해서는 반드시 의료 전문가의 진단과 조언을 따르시길 바랍니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <div className="space-y-3">
                <Label htmlFor="consent" className="text-sm font-bold flex items-center gap-2">
                  <PenLine className="w-4 h-4" />
                  동의 확인
                </Label>
                <Input
                  id="consent"
                  placeholder="'동의합니다'를 입력해 주세요."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="text-center"
                />
                <p className="text-sm text-red-500 font-medium text-center">
                  * 서비스 이용을 위해서는 위 고지사항에 대한 동의가 필요합니다.
                </p>
              </div>

              <div className="flex justify-center gap-4 pt-4">
                <Button
                  onClick={handleConfirm}
                  className="min-w-[140px] bg-[#0B4619] hover:bg-[#083613] text-white font-medium py-5"
                >
                  동의
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="min-w-[140px] font-medium py-5 border-2"
                >
                  비동의
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
} 