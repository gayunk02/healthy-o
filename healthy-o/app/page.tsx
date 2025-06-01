'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import '@/app/globals.css'

export default function Home() {
  const router = useRouter();

  const onSubmit = () => {
    router.push('/disclaimer');
  }

  return (
    <main className="flex flex-col items-center pb-20">
      <div className="w-full pt-[100px]">
        <div className="w-full max-w-[640px] mx-auto flex flex-col items-center px-4">
          {/* Logo Section */}
          <div className="h-[48px] mb-12 transition-transform hover:scale-105">
            <Image 
              src="/testlogo.png" 
              alt="Healthy-O 로고" 
              width={223}
              height={48} 
              priority
              className="h-full w-auto"
            />
          </div>

          {/* Main Title */}
          <h1 className="text-3xl md:text-4xl font-black text-[#0B4619] flex items-center gap-3 justify-center mb-16">
            <span className="animate-bounce">💪🏻</span> 
            TAKE CARE with Healthy-O
          </h1>

          {/* Description Text */}
          <div className="text-center w-full mb-16">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <p className="text-xl font-bold text-[#0B4619] mb-6">
                생성형 AI와 함께하는 건강 정보 통합 검색 서비스
              </p>
              <p className="text-lg font-semibold text-gray-600 mb-8">
                검색 결과를 통해 여러 건강 지식을 쌓아보세요!
              </p>
              <div className="bg-[#0B4619]/5 rounded-lg p-6 mb-8">
                <p className="text-base font-bold text-[#0B4619] mb-4">
                  회원가입 시 제공되는 서비스
                </p>
                <div className="text-sm text-gray-600 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#0B4619]/10 flex items-center justify-center">
                      <span className="text-[#0B4619] text-xs">✓</span>
                    </div>
                    <p>건강 설문 결과 저장</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#0B4619]/10 flex items-center justify-center">
                      <span className="text-[#0B4619] text-xs">✓</span>
                    </div>
                    <p>결과 기반 영양제 추천</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#0B4619]/10 flex items-center justify-center">
                      <span className="text-[#0B4619] text-xs">✓</span>
                    </div>
                    <p>결과 기반 주변 병원 정보 제공</p>
                  </div>
                </div>
              </div>
              <div className="text-lg text-gray-600 pt-6 border-t border-gray-200">
                <p className="font-bold text-[#0B4619] mb-2">건강을 위한 첫 걸음</p>
                <p className="font-semibold">헬시오와 함께하세요!</p>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <Button
            onClick={onSubmit}
            className="w-full max-w-[400px] bg-[#0B4619] hover:bg-[#083613] text-white text-lg font-bold h-[60px] rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg"
          >
            지금 시작하기
          </Button>
        </div>
      </div>
    </main>
  );
}
