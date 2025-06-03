'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';
import { useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, user, setLoggedOut, setLoggedIn } = useAuthStore();
  const { toast } = useToast();

  // 컴포넌트 마운트 시 인증 상태 체크
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const savedUser = JSON.parse(userStr);
        setLoggedIn(token, savedUser);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        setLoggedOut();
      }
    } else {
      setLoggedOut();
    }
  }, [setLoggedIn, setLoggedOut]);

  const handleLogout = () => {
    setLoggedOut();
    toast({
      title: "👋 로그아웃",
      description: "안전하게 로그아웃되었습니다.",
      duration: 3000,
    });
    router.push('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-[64px] z-[100] header-bg">
      <div className="h-full flex items-center justify-center px-4 md:px-24">
        <div className="w-full max-w-[1280px] flex items-center justify-between">
          {/* 로고 섹션 */}
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Image
              src="/headlogo.png"
              alt="Healthy-O 로고"
              width={120}
              height={28}
              className="h-auto w-auto"
              priority
            />
          </Link>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => router.push('/mypage')}
                  className="text-white hover:text-white/80 text-base font-medium hover:bg-transparent"
                >
                  마이페이지
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-white hover:text-white/80 text-base font-medium hover:bg-transparent"
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => router.push('/login')}
                  className="text-white hover:text-white/80 text-base font-medium hover:bg-transparent"
                >
                  로그인
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => router.push('/signup')}
                  className="text-white hover:text-white/80 text-base font-medium hover:bg-transparent"
                >
                  회원가입
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 