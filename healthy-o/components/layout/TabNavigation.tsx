'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";

interface ITab {
  value: string;
  label: string;
  href: string;
  requiresAuth?: boolean;
}

const tabs: ITab[] = [
  {
    value: 'result',
    label: '분석 결과',
    href: '/result'
  },
  {
    value: 'hospital',
    label: '병원 찾기',
    href: '/hospital',
    requiresAuth: true
  },
  {
    value: 'supplement',
    label: '영양제 정보',
    href: '/supplement',
    requiresAuth: true
  }
];

export function TabNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('result');
  
  // 현재 경로에 따라 활성 탭 업데이트
  useEffect(() => {
    const path = pathname.toLowerCase();
    console.log('[TabNavigation] Current path:', path);

    // 정확한 경로 매칭
    if (path === '/result') {
      setActiveTab('result');
    } else if (path === '/hospital') {
      setActiveTab('hospital');
    } else if (path === '/supplement') {
      setActiveTab('supplement');
    } else if (path === '/') {
      setActiveTab('result'); // 홈 경로일 경우 기본값
    }
  }, [pathname]);

  const handleTabClick = (tab: ITab) => {
    if (tab.requiresAuth && !isLoggedIn) {
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
    router.push(tab.href);
  };

  return (
    <div className="w-full">
      <Tabs value={activeTab} className="w-full">
        <TabsList className="w-full h-14 grid grid-cols-3 bg-[#F6F6F6]">
          {tabs.map((tab) => (
            <TooltipProvider key={tab.value}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger
                    value={tab.value}
                    onClick={() => handleTabClick(tab)}
                    className={`
                      relative h-full 
                      text-gray-400
                      transition-all
                      duration-200
                      font-medium
                      text-[16px]
                      data-[state=active]:text-[#0B4619]
                      data-[state=active]:font-extrabold
                      data-[state=active]:bg-white
                      hover:text-[#0B4619]/90
                      ${tab.requiresAuth && !isLoggedIn ? 'cursor-not-allowed opacity-50' : ''}
                      ${activeTab === tab.value ? 'bg-white !text-[#0B4619] !font-extrabold border-b-2 border-[#0B4619]/70' : 'bg-[#F6F6F6] border-b-2 border-[#0B4619]/5'}
                    `}
                  >
                    <div className="flex items-center gap-1.5">
                      {tab.label}
                      {tab.requiresAuth && !isLoggedIn && (
                        <Lock className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </TabsTrigger>
                </TooltipTrigger>
                {tab.requiresAuth && !isLoggedIn && (
                  <TooltipContent side="bottom" align="center">
                    <p className="text-sm">로그인이 필요한 서비스입니다</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
} 