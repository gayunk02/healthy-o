'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 쿠키에서 토큰 확인
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          method: 'GET',
          credentials: 'include', // 쿠키 포함
        });
        setIsLoggedIn(response.ok);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, [pathname]); // pathname이 변경될 때마다 로그인 상태 체크

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setIsLoggedIn(false);
        toast({
          title: "👋 로그아웃",
          description: "안전하게 로그아웃되었습니다.",
          duration: 3000,
        });
        router.push('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
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

          {/* 인증 버튼 섹션 */}
          <div className="flex items-center gap-6">
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