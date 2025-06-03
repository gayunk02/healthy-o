'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { UserPlus, FileText, ShieldCheck, ScrollText, Lock, Info, AlertCircle, FileSpreadsheet, AlertTriangle } from "lucide-react";
import { useAuthStore } from "@/store/auth";

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { setLoggedIn, isLoggedIn } = useAuthStore();
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [form, setForm] = useState({
    email: "",
    writer: "",
    password1: "",
    password2: "",
    gender: "",
    birthDate: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [birthYear, setBirthYear] = useState<string>("");
  const [birthMonth, setBirthMonth] = useState<string>("");
  const [birthDay, setBirthDay] = useState<string>("");
  const [agreements, setAgreements] = useState({
    termsOfService: false,
    privacyPolicy: false,
    marketing: false,
  });

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

  // 연도 범위 계산 (14세 ~ 120세)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 107 }, (_, i) => currentYear - 14 - i);
  
  // 월 배열
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  
  // 선택된 연도와 월에 따른 일 수 계산
  const getDaysInMonth = (year: string, month: string) => {
    if (!year || !month) return [];
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      const formattedDate = date.toISOString().split('T')[0];
      handleInputChange("birthDate", formattedDate);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setForm((prev) => {
      const newForm = { ...prev, [key]: value };
      const newErrors = { ...errors };

      if (value === "") {
        newErrors[key] = "";
      } else {
        if (key === "email") {
          const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
          newErrors.email = emailRegex.test(value) ? "" : "올바른 이메일 형식이 아닙니다.";
        }

        if (key === "writer") {
          newErrors.writer = value.trim().length >= 2 ? "" : "이름은 2글자 이상 입력해 주세요.";
        }

        if (key === "password1") {
          const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
          newErrors.password1 = passwordRegex.test(value)
            ? ""
            : "비밀번호는 8자 이상이며, 소문자, 숫자, 특수문자를 포함해야 합니다.";
          newErrors.password2 = form.password2 === "" ? "" : (value === form.password2 ? "" : "비밀번호가 일치하지 않습니다.");
        }

        if (key === "password2") {
          newErrors.password2 = value === "" ? "" : (value === form.password1 ? "" : "비밀번호가 일치하지 않습니다.");
        }

        if (key === "gender") {
          newErrors.gender = value ? "" : "성별을 선택해 주세요.";
        }

        if (key === "birthDate") {
          const birthDate = new Date(value);
          const today = new Date();
          const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
          const maxDate = new Date(today.getFullYear() - 14, today.getMonth(), today.getDate());
          
          if (birthDate > maxDate) {
            newErrors.birthDate = "14세 이상만 가입이 가능합니다.";
          } else if (birthDate < minDate) {
            newErrors.birthDate = "올바른 생년월일을 입력해 주세요.";
          } else {
            newErrors.birthDate = "";
          }
        }
      }

      setErrors(newErrors);
      return newForm;
    });
  };

  const handlePhoneChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    if (index === 1) {
      setPhone1(value);
      if (value.length === 3) document.getElementById("phone2")?.focus();
    } else if (index === 2) {
      setPhone2(value);
      if (value.length === 4) document.getElementById("phone3")?.focus();
    } else {
      setPhone3(value);
    }
  };

  const handleAgreementChange = (type: keyof typeof agreements) => {
    setAgreements(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleBirthDateChange = (type: 'year' | 'month' | 'day', value: string) => {
    if (type === 'year') {
      setBirthYear(value);
      setBirthDay("");
    } else if (type === 'month') {
      setBirthMonth(value);
      setBirthDay("");
    } else {
      setBirthDay(value);
    }

    // 모든 값이 선택되었을 때만 날짜를 설정
    if (type === 'day' && birthYear && birthMonth) {
      const formattedDate = `${birthYear}-${birthMonth.padStart(2, '0')}-${value.padStart(2, '0')}`;
      const newDate = new Date(formattedDate);
      
      // 유효한 날짜인지 확인
      if (!isNaN(newDate.getTime())) {
        setSelectedDate(newDate);
        handleInputChange("birthDate", formattedDate);
      }
    } else if (type === 'year' && birthMonth && birthDay) {
      const formattedDate = `${value}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;
      const newDate = new Date(formattedDate);
      
      if (!isNaN(newDate.getTime())) {
        setSelectedDate(newDate);
        handleInputChange("birthDate", formattedDate);
      }
    } else if (type === 'month' && birthYear && birthDay) {
      const formattedDate = `${birthYear}-${value.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;
      const newDate = new Date(formattedDate);
      
      if (!isNaN(newDate.getTime())) {
        setSelectedDate(newDate);
        handleInputChange("birthDate", formattedDate);
      }
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    const phoneRegex = /^\d{3}$/;  // 첫 번째 부분
    const phoneRegex2 = /^\d{4}$/;  // 두 번째, 세 번째 부분

    // 이메일 검증
    if (!emailRegex.test(form.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }

    // 이름 검증
    if (!form.writer || form.writer.trim().length < 2) {
      newErrors.writer = "이름은 2글자 이상 입력해 주세요.";
    }

    // 비밀번호 검증
    if (!form.password1) {
      newErrors.password1 = "비밀번호를 입력해 주세요.";
    } else if (!passwordRegex.test(form.password1)) {
      newErrors.password1 = "비밀번호는 8자 이상이며, 소문자, 숫자, 특수문자를 포함해야 합니다.";
    }

    // 비밀번호 확인 검증
    if (!form.password2) {
      newErrors.password2 = "비밀번호를 한번 더 입력해 주세요.";
    } else if (form.password1 !== form.password2) {
      newErrors.password2 = "비밀번호가 일치하지 않습니다.";
    }

    // 전화번호 검증
    if (!phoneRegex.test(phone1) || !phoneRegex2.test(phone2) || !phoneRegex2.test(phone3)) {
      newErrors.phone = "올바른 전화번호 형식이 아닙니다.";
    }

    // 성별 검증
    if (!form.gender) {
      newErrors.gender = "성별을 선택해 주세요.";
    }
    
    // 생년월일 유효성 검사 개선
    if (!birthYear || !birthMonth || !birthDay) {
      newErrors.birthDate = "생년월일을 선택해 주세요.";
    } else {
      const birthDate = new Date(form.birthDate);
      const today = new Date();
      const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
      const maxDate = new Date(today.getFullYear() - 14, today.getMonth(), today.getDate());
      
      if (isNaN(birthDate.getTime())) {
        newErrors.birthDate = "올바른 생년월일을 선택해 주세요.";
      } else if (birthDate > today) {
        newErrors.birthDate = "미래의 날짜는 선택할 수 없습니다.";
      } else if (birthDate > maxDate) {
        newErrors.birthDate = "14세 이상만 가입이 가능합니다.";
      } else if (birthDate < minDate) {
        newErrors.birthDate = "올바른 생년월일을 입력해 주세요.";
      }
    }

    // 약관 동의 검증
    if (!agreements.termsOfService || !agreements.privacyPolicy) {
      newErrors.agreements = "필수 약관에 동의해 주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    const isValid = validateForm();
    
    if (!isValid) {
      toast({
        variant: "destructive",
        title: "입력 오류",
        description: "모든 필수 정보를 올바르게 입력해주세요."
      });
      return;
    }

    try {
      const signupResponse = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          name: form.writer,
          password: form.password1,
          phone: `${phone1}-${phone2}-${phone3}`,
          gender: form.gender,
          birthDate: form.birthDate,
          marketingAgree: agreements.marketing,
        }),
      });

      if (!signupResponse.ok) {
        const errorData = await signupResponse.json();
        // HTTP 상태 코드별 에러 처리
        switch (signupResponse.status) {
          case 400:
            throw new Error(errorData.message || "입력하신 정보를 다시 확인해주세요.");
          case 409:
            throw new Error("이미 가입된 이메일입니다.");
          case 500:
            throw new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
          default:
            throw new Error(errorData.message || "회원가입 중 오류가 발생했습니다.");
        }
      }

      // 자동 로그인 시도
      const loginResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password1,
        }),
      });

      if (!loginResponse.ok) {
        throw new Error('자동 로그인 실패');
      }

      toast({
        title: "✨ 회원가입 성공",
        description: "Healthy-O의 회원이 되신 것을 환영합니다!",
        duration: 3000,
      });

      setTimeout(() => {
        router.push('/');
      }, 500);
      
    } catch (error: any) {
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
          title: "회원가입 실패",
          description: error.message
        });
      }
      console.error(error);
    }
  };

  const handleGenderChange = (value: string) => {
    handleInputChange("gender", value);
  };

  return (
    <div className="w-full pt-[100px] pb-20">
      <div className="w-full max-w-[500px] mx-auto">
        <Card className="bg-white shadow-lg">
          <CardHeader className="pb-8">
            <CardTitle className="text-3xl font-bold text-center text-[#0B4619]">
              ✨ 회원가입
            </CardTitle>
            <CardDescription className="text-center text-base text-gray-600">
              Healthy-O와 함께 건강한 삶을 시작하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }} className="space-y-6 w-[400px] mx-auto">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-bold">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="이메일을 입력해 주세요."
                  className="text-center bg-white"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-3">
                <Label htmlFor="writer" className="text-sm font-bold">이름</Label>
                <Input
                  id="writer"
                  value={form.writer}
                  onChange={(e) => handleInputChange("writer", e.target.value)}
                  placeholder="이름을 입력해 주세요."
                  className="text-center"
                />
                {errors.writer && <p className="text-sm text-red-500">{errors.writer}</p>}
              </div>

              <div className="space-y-3">
                <Label htmlFor="password1" className="text-sm font-bold">비밀번호</Label>
                <Input
                  id="password1"
                  type="password"
                  value={form.password1}
                  onChange={(e) => handleInputChange("password1", e.target.value)}
                  placeholder="소문자, 숫자, 특수문자 조합 8자 이상"
                  className="text-center"
                />
                {errors.password1 && <p className="text-sm text-red-500">{errors.password1}</p>}
              </div>

              <div className="space-y-3">
                <Label htmlFor="password2" className="text-sm font-bold">비밀번호 확인</Label>
                <Input
                  id="password2"
                  type="password"
                  value={form.password2}
                  onChange={(e) => handleInputChange("password2", e.target.value)}
                  placeholder="소문자, 숫자, 특수문자 조합 8자 이상"
                  className="text-center"
                />
                {errors.password2 && <p className="text-sm text-red-500">{errors.password2}</p>}
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-bold">생년월일</Label>
                <div className="flex gap-2">
                  <Select value={birthYear} onValueChange={(value) => handleBirthDateChange('year', value)}>
                    <SelectTrigger className={cn(
                      "w-[140px]",
                      !birthYear && "text-muted-foreground"
                    )}>
                      <SelectValue placeholder="연도" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      side="bottom"
                      align="start"
                      className="max-h-[300px]"
                    >
                      <SelectGroup>
                        <SelectLabel className="px-2 py-1.5 text-sm font-semibold">연도</SelectLabel>
                        {years.map((year) => (
                          <SelectItem 
                            key={year} 
                            value={year.toString()}
                            className="cursor-pointer"
                          >
                            {year}년
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select value={birthMonth} onValueChange={(value) => handleBirthDateChange('month', value)}>
                    <SelectTrigger className={cn(
                      "w-[120px]",
                      !birthMonth && "text-muted-foreground"
                    )}>
                      <SelectValue placeholder="월" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      side="bottom"
                      align="start"
                      className="max-h-[300px]"
                    >
                      <SelectGroup>
                        <SelectLabel className="px-2 py-1.5 text-sm font-semibold">월</SelectLabel>
                        {months.map((month) => (
                          <SelectItem 
                            key={month} 
                            value={month.toString().padStart(2, '0')}
                            className="cursor-pointer"
                          >
                            {month}월
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select 
                    value={birthDay} 
                    onValueChange={(value) => handleBirthDateChange('day', value)}
                    disabled={!birthYear || !birthMonth}
                  >
                    <SelectTrigger className={cn(
                      "w-[120px]",
                      !birthDay && "text-muted-foreground"
                    )}>
                      <SelectValue placeholder="일" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      side="bottom"
                      align="start"
                      className="max-h-[300px]"
                    >
                      <SelectGroup>
                        <SelectLabel className="px-2 py-1.5 text-sm font-semibold">일</SelectLabel>
                        {getDaysInMonth(birthYear, birthMonth).map((day) => (
                          <SelectItem 
                            key={day} 
                            value={day.toString().padStart(2, '0')}
                            className="cursor-pointer"
                          >
                            {day}일
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                {errors.birthDate && <p className="text-sm text-red-500">{errors.birthDate}</p>}
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-bold">전화번호</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="phone1"
                    className="w-[120px] text-center"
                    maxLength={3}
                    value={phone1}
                    onChange={(e) => handlePhoneChange(1, e.target.value)}
                  />
                  <span className="text-gray-500">-</span>
                  <Input
                    id="phone2"
                    className="w-[120px] text-center"
                    maxLength={4}
                    value={phone2}
                    onChange={(e) => handlePhoneChange(2, e.target.value)}
                  />
                  <span className="text-gray-500">-</span>
                  <Input
                    id="phone3"
                    className="w-[120px] text-center"
                    maxLength={4}
                    value={phone3}
                    onChange={(e) => handlePhoneChange(3, e.target.value)}
                  />
                </div>
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-bold">성별</Label>
                <RadioGroup
                  className="flex justify-center gap-4"
                  onValueChange={handleGenderChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="MALE" id="male" />
                    <Label htmlFor="male">남성</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="FEMALE" id="female" />
                    <Label htmlFor="female">여성</Label>
                  </div>
                </RadioGroup>
                {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
              </div>

              <div className="space-y-4 pt-4">
                <p className="text-sm font-bold mb-2">약관 동의</p>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="termsOfService" 
                    checked={agreements.termsOfService}
                    onCheckedChange={() => handleAgreementChange('termsOfService')}
                  />
                  <Label htmlFor="termsOfService" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    <span className="text-red-500 mr-1">*</span>
                    <Dialog>
                      <DialogTrigger className="text-primary hover:underline">서비스 이용약관</DialogTrigger>
                      <DialogContent className="max-w-[700px]">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-center pb-4 text-[#0B4619]">
                            <div className="flex items-center justify-center gap-2">
                              <FileText className="w-6 h-6" />
                              서비스 이용약관
                            </div>
                          </DialogTitle>
                          <DialogDescription className="max-h-[500px] overflow-y-auto mt-4">
                            {/* ... (기존 약관 내용 유지) ... */}
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    에 동의합니다.
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="privacyPolicy" 
                    checked={agreements.privacyPolicy}
                    onCheckedChange={() => handleAgreementChange('privacyPolicy')}
                  />
                  <Label htmlFor="privacyPolicy" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    <span className="text-red-500 mr-1">*</span>
                    <Dialog>
                      <DialogTrigger className="text-primary hover:underline">개인정보 처리방침</DialogTrigger>
                      <DialogContent className="max-w-[700px]">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-center pb-4 text-[#0B4619]">
                            <div className="flex items-center justify-center gap-2">
                              <Lock className="w-6 h-6" />
                              개인정보 처리방침
                            </div>
                          </DialogTitle>
                          <DialogDescription className="max-h-[500px] overflow-y-auto mt-4">
                            {/* ... (기존 개인정보 처리방침 내용 유지) ... */}
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    에 동의합니다.
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="marketing" 
                    checked={agreements.marketing}
                    onCheckedChange={() => handleAgreementChange('marketing')}
                  />
                  <Label htmlFor="marketing" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    [선택] 마케팅 정보 수신에 동의합니다.
                  </Label>
                </div>

                {errors.agreements && (
                  <p className="text-sm text-red-500 mt-2">{errors.agreements}</p>
                )}
              </div>

              <div className="pt-6">
                <Button 
                  type="submit"
                  className="w-full bg-[#0B4619] hover:bg-[#083613] text-white font-medium"
                >
                  가입하기
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 