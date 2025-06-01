'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "입력 오류",
        description: "이메일과 비밀번호를 모두 입력해주세요."
      });
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error("로그인 실패");
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      
      toast({
        title: "로그인 성공",
        description: "환영합니다!"
      });
      
      router.push('/question');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "로그인 실패",
        description: "이메일과 비밀번호를 확인해주세요."
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full pt-[100px] pb-20">
      <Card className="w-[500px] mx-auto">
        <CardHeader className="pb-8">
          <CardTitle className="text-3xl font-bold text-center">로그인</CardTitle>
          <CardDescription className="text-center text-base">
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
                className="text-center"
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
                className="text-center"
              />
            </div>
            <div className="pt-6">
              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0B4619] hover:bg-[#083613] text-white"
              >
                {isLoading ? "로그인 중..." : "로그인"}
              </Button>
              <div className="text-center pt-4">
                <Link 
                  href="/signup"
                  className="text-[#0B4619] hover:text-[#083613] text-sm font-medium"
                >
                  회원가입하러 가기
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 