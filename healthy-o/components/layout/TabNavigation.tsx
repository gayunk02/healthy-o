'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  
  // 현재 경로에서 정확한 탭 값을 계산
  const getCurrentTab = () => {
    const path = pathname.toLowerCase();
    if (path.includes('/result')) return 'result';
    if (path.includes('/hospital')) return 'hospital';
    if (path.includes('/supplement')) return 'supplement';
    return 'result'; // 기본값
  };

  const currentTab = getCurrentTab();

  const handleTabClick = (tab: ITab) => {
    if (tab.requiresAuth && !isLoggedIn) {
      toast({
        title: "로그인이 필요한 서비스입니다",
        description: "해당 서비스를 이용하려면 로그인이 필요합니다.",
        duration: 3000,
      });
      router.push('/login');
      return;
    }
    router.push(tab.href);
  };

  return (
    <div className="w-full">
      <Tabs value={currentTab} className="w-full">
        <TabsList className="w-full h-14 grid grid-cols-3 bg-gray-100 rounded-t-xl border-b border-gray-200">
          {tabs.map((tab) => (
            <TooltipProvider key={tab.value}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger
                    value={tab.value}
                    onClick={() => handleTabClick(tab)}
                    className={`
                      relative h-full 
                      text-gray-500 
                      transition-all duration-200
                      data-[state=active]:text-[#0B4619] 
                      data-[state=active]:font-bold 
                      data-[state=active]:bg-white 
                      hover:text-[#0B4619]/70 
                      hover:bg-white/60
                      ${tab.requiresAuth && !isLoggedIn ? 'cursor-not-allowed opacity-50' : ''}
                      border-b-[3px] border-transparent
                      data-[state=active]:border-[#0B4619]
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