'use client';

import { usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

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
  
  // 현재 경로에서 첫 번째 세그먼트를 가져옴 (예: /hospital -> hospital)
  const currentTab = pathname.split('/')[1] || 'result';

  return (
    <div className="w-full">
      <Tabs value={currentTab} className="w-full">
        <TabsList className="w-full h-14 grid grid-cols-3 bg-gray-100 rounded-t-xl">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              onClick={() => router.push(tab.href)}
              className="relative h-full text-gray-500 data-[state=active]:text-[#0B4619] data-[state=active]:font-bold transition-all duration-200 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#0B4619] after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform after:duration-200 hover:text-[#0B4619]/70 data-[state=active]:bg-white data-[state=active]:shadow-sm hover:bg-white/60"
            >
              <div className="flex items-center gap-1.5">
                {tab.label}
                {tab.requiresAuth && (
                  <Lock className="w-3.5 h-3.5" />
                )}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
} 