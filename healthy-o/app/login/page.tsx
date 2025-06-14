'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";
import { useAuthStore } from "@/store/auth";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setLoggedIn, isLoggedIn } = useAuthStore();

  // 로그인 상태 체크
  useEffect(() => {
    // 토큰과 사용자 정보 확인
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setLoggedIn(token, user);
        router.replace('/');
      } catch (error) {
        // 파싱 실패 시 토큰 제거
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, [router, setLoggedIn]);

  // 이미 로그인된 상태라면 홈으로 리다이렉트
  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/');
    }
  }, [isLoggedIn, router]);

  const onSubmit = async () => {
    // 이메일 형식 검증
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
    if (!emailRegex.test(email)) {
      toast({
        variant: "destructive",
        title: "입력 오류",
        description: "올바른 이메일 형식이 아닙니다."
      });
      return;
    }

    // 비밀번호 길이 검증
    if (password.length < 8) {
      toast({
        variant: "destructive",
        title: "입력 오류",
        description: "비밀번호는 8자 이상이어야 합니다."
      });
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        // HTTP 상태 코드별 에러 처리
        switch (response.status) {
          case 401:
            throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
          case 500:
            throw new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
          default:
            throw new Error(data.message || "로그인 중 오류가 발생했습니다.");
        }
      }

      // 로그인 성공 처리
      if (!data.success || !data.data?.name) {
        throw new Error("사용자 정보가 올바르지 않습니다.");
      }

      const userData = data.data;
      const userInfo = {
        id: userData.id,
        email: userData.email,
        name: userData.name
      };

      toast({
        title: "✨ 로그인 성공",
        description: `${userData.name}님, 환영합니다!`,
        duration: 3000,
      });

      // zustand store에 로그인 상태 저장
      setLoggedIn(userData.token, userInfo);

      setTimeout(() => {
        router.push(userData.redirectTo || '/');
      }, 500);

    } catch (error) {
      // 네트워크 오류 처리
      if (!window.navigator.onLine) {
        toast({
          variant: "destructive",
          title: "네트워크 오류",
          description: "인터넷 연결을 확인해주세요."
        });
      } else {
        toast({
          variant: "destructive",
          title: "로그인 실패",
          description: error instanceof Error ? error.message : "로그인 중 오류가 발생했습니다."
        });
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full pt-[100px] pb-20">
      <div className="w-full max-w-[500px] mx-auto">
        <Card className="bg-white shadow-lg">
          <CardHeader className="pb-8">
            <CardTitle className="text-3xl font-bold text-center text-[#0B4619]">
              👋 로그인
            </CardTitle>
            <CardDescription className="text-center text-base text-gray-600">
              Healthy-O와 함께 건강한 삶을 시작하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-6 w-[400px] mx-auto">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-bold">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일을 입력해 주세요."
                  className="text-center bg-white"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-bold">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력해 주세요."
                  className="text-center bg-white"
                />
              </div>
              <div className="pt-6">
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#0B4619] hover:bg-[#083613] text-white font-medium"
                >
                  {isLoading ? "로그인 중..." : "로그인"}
                </Button>
                <div className="text-center pt-4">
                  <Link 
                    href="/signup"
                    className="text-[#0B4619] hover:text-[#083613] text-sm font-medium hover:underline"
                  >
                    회원가입하러 가기
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 