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
import { UserPlus, FileText, ShieldCheck, ScrollText, Lock, Info, AlertCircle, FileSpreadsheet, AlertTriangle, Bot, Stethoscope } from "lucide-react";
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
                            <div className="space-y-8 text-gray-700">
                              <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
                                <h3 className="font-bold text-lg text-[#0B4619] flex items-center gap-2 pb-2 border-b border-gray-300">
                                  <Bot className="w-5 h-5" />
                                  서비스 정의
                                </h3>
                                <p className="leading-relaxed text-[15px]">
                                  본 서비스는 OpenAI의 생성형 인공지능(chatGPT) 기술을 기반으로,
                                  사용자가 입력한 데이터를 바탕으로 <span className="font-semibold text-[#0B4619]">참고용 검색 결과를 제공하는 AI 통합 정보 검색 도구</span>입니다.
                                </p>
                              </div>

                              <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
                                <h3 className="font-bold text-lg text-[#0B4619] flex items-center gap-2 pb-2 border-b border-gray-300">
                                  <UserPlus className="w-5 h-5" />
                                  회원가입 및 계정
                                </h3>
                                <div className="leading-relaxed text-[15px] space-y-2">
                                  <p>
                                    회원가입은 만 14세 이상의 개인 누구나 신청할 수 있으며, 
                                    <span className="font-semibold text-[#0B4619]">이메일 주소를 통한 본인 인증 절차</span>를 거쳐 완료됩니다.
                                  </p>
                                  <p>
                                    회원은 <span className="text-red-500 font-semibold bg-red-50 px-1 rounded">하나의 이메일 주소로 하나의 계정만 생성할 수 있으며</span>, 
                                    타인의 정보를 도용하거나 허위 정보를 등록할 경우 서비스 이용이 제한될 수 있습니다.
                                  </p>
                                </div>
                              </div>
                              
                              <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
                                <h3 className="font-bold text-lg text-[#0B4619] flex items-center gap-2 pb-2 border-b border-gray-300">
                                  <Stethoscope className="w-5 h-5" />
                                  의료 서비스 관련 고지
                                </h3>
                                <p className="leading-relaxed text-[15px] space-y-2">
                                  본 서비스는 <span className="text-red-500 font-semibold bg-red-50 px-1 rounded">의료법상 의료기관이 아니며, 또한 의료인(의사, 약사, 간호사 등) 및 의료 면허를 가진
                                  전문가에 의해 운영되지 않습니다.</span> 따라서 본 서비스가 제공하는 정보는 <span className="text-red-500 font-semibold bg-red-50 px-1 rounded">의학적 진단, 치료, 예방, 처방을 위한 
                                  조언이나 의료행위에 해당하지 않습니다.</span>
                                </p>
                              </div>

                              <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
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

                              <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
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
                                </div>
                              </div>

                              <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
                                <h3 className="font-bold text-lg text-[#0B4619] flex items-center gap-2 pb-2 border-b border-gray-300">
                                  <ShieldCheck className="w-5 h-5" />
                                  회원의 의무
                                </h3>
                                <div className="leading-relaxed text-[15px] space-y-2">
                                  <p>회원은 다음과 같은 행위를 해서는 안 됩니다:</p>
                                  <ul className="list-disc pl-5 space-y-1">
                                    <li>타인의 개인정보를 도용하거나 허위정보를 등록하는 행위</li>
                                    <li>서비스를 이용하여 법령과 본 약관이 금지하는 행위를 하는 경우</li>
                                    <li>다른 회원의 개인정보를 무단으로 수집, 저장, 공개하는 행위</li>
                                    <li>서비스의 안정적 운영을 방해하는 행위</li>
                                    <li>회사의 지식재산권 또는 제3자의 지식재산권을 침해하는 행위</li>
                                  </ul>
                                </div>
                              </div>

                              <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
                                <h3 className="font-bold text-lg text-[#0B4619] flex items-center gap-2 pb-2 border-b border-gray-300">
                                  <Lock className="w-5 h-5" />
                                  서비스 제한 및 계정 정지
                                </h3>
                                <div className="leading-relaxed text-[15px] space-y-4">
                                  <p>
                                    회사는 <span className="font-semibold text-[#0B4619]">회원이 본 약관의 의무를 위반하거나 서비스의 정상적인 운영을 방해한 경우</span>, 
                                    경고, 일시정지, 영구이용정지 등으로 서비스 이용을 단계적으로 제한할 수 있습니다.
                                  </p>
                                  <p>
                                    <span className="text-red-500 font-semibold bg-red-50 px-1 rounded">영구이용정지 시 회원의 개인정보는 즉시 파기</span>되며, 
                                    해당 계정으로는 재가입이 불가능할 수 있습니다.
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
                                <h3 className="font-bold text-lg text-[#0B4619] flex items-center gap-2 pb-2 border-b border-gray-300">
                                  <ScrollText className="w-5 h-5" />
                                  약관 변경
                                </h3>
                                <div className="leading-relaxed text-[15px] space-y-4">
                                  <p>
                                    회사는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지사항을 통해 공지합니다.
                                    회원은 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.
                                  </p>
                                  <p>
                                    <span className="font-semibold text-[#0B4619]">변경된 약관의 효력 발생일 이후에도 서비스를 계속 이용하는 경우 
                                    약관 변경에 동의한 것으로 간주</span>됩니다.
                                  </p>
                                </div>
                              </div>
                            </div>
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
                            <div className="space-y-8 text-gray-700">
                              <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
                                <h3 className="font-bold text-lg text-[#0B4619] flex items-center gap-2 pb-2 border-b border-gray-300">
                                  <FileText className="w-5 h-5" />
                                  수집하는 개인정보 항목
                                </h3>
                                <div className="leading-relaxed text-[15px] space-y-2">
                                  <p>회사는 회원가입 및 서비스 이용을 위해 다음의 개인정보를 수집합니다:</p>
                                  <ul className="list-disc pl-5 space-y-1">
                                    <li><span className="font-semibold text-[#0B4619]">필수항목:</span> 이메일 주소, 비밀번호, 이름, 생년월일, 성별, 휴대전화번호</li>
                                    <li><span className="font-semibold text-[#0B4619]">선택항목:</span> 마케팅 정보 수신 동의</li>
                                  </ul>
                                </div>
                              </div>

                              <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
                                <h3 className="font-bold text-lg text-[#0B4619] flex items-center gap-2 pb-2 border-b border-gray-300">
                                  <Info className="w-5 h-5" />
                                  개인정보의 수집 및 이용목적
                                </h3>
                                <div className="leading-relaxed text-[15px] space-y-2">
                                  <p>수집한 개인정보는 다음의 목적으로만 이용됩니다:</p>
                                  <ul className="list-disc pl-5 space-y-1">
                                    <li>회원 가입 및 관리</li>
                                    <li>서비스 제공 및 운영</li>
                                    <li>서비스 이용 기록 분석 및 통계</li>
                                    <li>마케팅 및 광고 활용 (선택 동의 시)</li>
                                  </ul>
                                </div>
                              </div>

                              <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
                                <h3 className="font-bold text-lg text-[#0B4619] flex items-center gap-2 pb-2 border-b border-gray-300">
                                  <ShieldCheck className="w-5 h-5" />
                                  개인정보의 보유 및 이용기간
                                </h3>
                                <div className="leading-relaxed text-[15px] space-y-4">
                                  <p>
                                    회원의 개인정보는 <span className="font-semibold text-[#0B4619]">원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기</span>됩니다.
                                    다만, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 해당 법령에서 정한 일정한 기간 동안 정보를 보관합니다.
                                  </p>
                                  <p>
                                    <span className="text-red-500 font-semibold bg-red-50 px-1 rounded">회원탈퇴 시 개인정보는 즉시 파기</span>되며, 
                                    어떠한 이유로도 탈퇴한 회원의 정보를 보관하지 않습니다.
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
                                <h3 className="font-bold text-lg text-[#0B4619] flex items-center gap-2 pb-2 border-b border-gray-300">
                                  <ScrollText className="w-5 h-5" />
                                  개인정보의 파기절차 및 방법
                                </h3>
                                <div className="leading-relaxed text-[15px] space-y-4">
                                  <p>
                                    회원의 개인정보는 목적이 달성된 후 별도의 DB로 옮겨져 내부 방침 및 기타 관련 법령에 의한 
                                    정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다.
                                  </p>
                                  <p>
                                    전자적 파일 형태로 저장된 개인정보는 <span className="font-semibold text-[#0B4619]">기록을 재생할 수 없는 기술적 방법을 사용하여 삭제</span>합니다.
                                  </p>
                                </div>
                              </div>
                            </div>
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