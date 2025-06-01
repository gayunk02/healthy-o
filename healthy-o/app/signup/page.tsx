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

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
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
          const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
          newErrors.password1 = passwordRegex.test(value)
            ? ""
            : "비밀번호는 8~20자의 영문, 숫자, 특수문자를 포함해야 합니다.";
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

  const validateForm = () => {
    const newErrors: any = {};
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;

    if (!emailRegex.test(form.email)) newErrors.email = "올바른 이메일 형식이 아닙니다.";
    if (!form.writer || form.writer.trim().length < 2) newErrors.writer = "이름은 2글자 이상 입력해 주세요.";
    if (!form.password1) newErrors.password1 = "비밀번호를 입력해 주세요.";
    else if (!passwordRegex.test(form.password1)) newErrors.password1 = "비밀번호는 8~20자의 영문, 숫자, 특수문자를 포함해야 합니다.";
    if (!form.password2) newErrors.password2 = "비밀번호를 입력해 주세요.";
    else if (form.password1 !== form.password2) newErrors.password2 = "비밀번호가 일치하지 않습니다.";
    if (phone1.length !== 3 || phone2.length !== 4 || phone3.length !== 4) newErrors.phone = "올바른 전화번호 형식이 아닙니다.";
    if (!form.gender) newErrors.gender = "성별을 선택해 주세요.";
    if (!selectedDate) newErrors.birthDate = "생년월일을 선택해 주세요.";
    if (!agreements.termsOfService || !agreements.privacyPolicy) {
      newErrors.agreements = "필수 약관에 동의해 주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (validateForm()) {
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            name: form.writer,
            password: form.password1,
            phone: `${phone1}-${phone2}-${phone3}`,
            gender: form.gender,
            birthDate: form.birthDate,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || '회원가입 실패');
        }

        const data = await response.json();
        toast({
          title: "회원가입 성공",
          description: "Healthy-O 가입을 축하합니다."
        });
        router.push('/login');
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "회원가입 실패",
          description: error.message || "회원가입 중 문제가 발생했습니다. 다시 시도해 주세요."
        });
        console.error(error);
      }
    }
  };

  const handleGenderChange = (value: string) => {
    handleInputChange("gender", value);
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

    if ((type === 'year' && birthMonth && birthDay) ||
        (type === 'month' && birthYear && birthDay) ||
        (type === 'day' && birthYear && birthMonth)) {
      const year = type === 'year' ? value : birthYear;
      const month = type === 'month' ? value : birthMonth;
      const day = type === 'day' ? value : birthDay;
      
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      handleInputChange("birthDate", formattedDate);
    }
  };

  return (
    <div className="w-full pt-[100px] pb-20">
      <Card className="w-[500px] mx-auto">
        <CardHeader className="pb-8">
          <CardTitle className="text-3xl font-bold text-center">회원가입</CardTitle>
          <CardDescription className="text-center text-base">
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
                placeholder="이메일을 입력해 주세요."
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="text-center"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-3">
              <Label htmlFor="writer" className="text-sm font-bold">이름</Label>
              <Input
                id="writer"
                placeholder="이름을 입력해 주세요."
                onChange={(e) => handleInputChange("writer", e.target.value)}
                className="text-center"
              />
              {errors.writer && <p className="text-sm text-red-500">{errors.writer}</p>}
            </div>

            <div className="space-y-3">
              <Label htmlFor="password1" className="text-sm font-bold">비밀번호</Label>
              <Input
                id="password1"
                type="password"
                placeholder="영문,숫자,특수문자 조합 8~20자리"
                onChange={(e) => handleInputChange("password1", e.target.value)}
                className="text-center"
              />
              {errors.password1 && <p className="text-sm text-red-500">{errors.password1}</p>}
            </div>

            <div className="space-y-3">
              <Label htmlFor="password2" className="text-sm font-bold">비밀번호 확인</Label>
              <Input
                id="password2"
                type="password"
                placeholder="영문,숫자,특수문자 조합 8~20자리"
                onChange={(e) => handleInputChange("password2", e.target.value)}
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
                  <RadioGroupItem value="M" id="male" />
                  <Label htmlFor="male">남성</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="F" id="female" />
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
                        <DialogTitle className="text-2xl font-bold text-center pb-4">서비스 이용약관</DialogTitle>
                        <DialogDescription className="max-h-[500px] overflow-y-auto mt-4">
                          <div className="space-y-6 text-foreground">
                            <div className="space-y-4">
                              <h3 className="text-lg font-bold text-primary">📋 서비스 이용 전 고지사항</h3>
                              <div className="pl-4 space-y-2 text-sm">
                                <p>본 서비스는 OpenAI의 생성형 인공지능(chatGPT) 기술을 기반으로, 사용자가 입력한 데이터를 바탕으로 참고용 검색 결과를 제공하는 AI 통합 정보 검색 도구입니다.</p>
                                <p className="text-red-500">본 서비스는 의료법상 의료기관이 아니며, 의료인(의사, 약사, 간호사 등) 및 의료 면허를 가진 전문가에 의해 운영되지 않습니다.</p>
                                <p>따라서 본 서비스가 제공하는 정보는 의학적 진단, 치료, 예방, 처방을 위한 조언이나 의료행위에 해당하지 않습니다.</p>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h3 className="text-lg font-bold text-primary">⚠️ 서비스의 제한사항</h3>
                              <div className="pl-4 space-y-4 text-sm">
                                <div>
                                  <h4 className="font-semibold mb-2">1. AI 기술의 한계</h4>
                                  <ul className="list-disc pl-4 space-y-1">
                                    <li>AI가 제시하는 정보는 일반적인 지식과 인공지능의 학습 결과를 기반으로 자동 생성된 것입니다.</li>
                                    <li>개별 사용자에 맞춘 정확한 의학적 판단을 제공할 수 없습니다.</li>
                                    <li>부정확하거나 오해의 소지가 있는 정보가 포함될 수 있습니다.</li>
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">2. 책임의 제한</h4>
                                  <ul className="list-disc pl-4 space-y-1">
                                    <li>제공된 정보를 기반으로 한 사용자의 판단이나 행동의 결과에 대해 법적·의료적 책임을 지지 않습니다.</li>
                                    <li>추천하는 병원, 의료기관, 건강기능식품은 일반적인 정보 제공 목적이며, 효능, 적합성, 안전성을 보장하지 않습니다.</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h3 className="text-lg font-bold text-primary">✅ 이용자의 의무</h3>
                              <div className="pl-4 text-sm">
                                <ul className="list-decimal space-y-2">
                                  <li>본 서비스의 정보는 단순 참고 자료로만 활용해야 합니다.</li>
                                  <li>건강상 우려가 있을 경우 반드시 의료 전문가와 상담하거나 의료기관을 방문해야 합니다.</li>
                                  <li>건강기능식품 관련 정보는 참고용이며, 전문가와 상의 후 복용해야 합니다.</li>
                                  <li>정확하고 안전한 건강 관리를 위해 의료 전문가의 진단과 조언을 따라야 합니다.</li>
                                </ul>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h3 className="text-lg font-bold text-primary">🔒 개인정보 보호</h3>
                              <div className="pl-4 text-sm">
                                <p>회사는 「개인정보 보호법」 등 관련 법령상의 개인정보보호 규정을 준수하며, 이용자의 개인정보 보호를 위해 노력합니다.</p>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h3 className="text-lg font-bold text-primary">📜 약관의 효력</h3>
                              <div className="pl-4 text-sm">
                                <ul className="list-disc space-y-2">
                                  <li>본 약관은 서비스를 이용하고자 하는 모든 회원에 대하여 그 효력을 발생합니다.</li>
                                  <li>회사는 관련법을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.</li>
                                </ul>
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
                        <DialogTitle className="text-2xl font-bold text-center pb-4">개인정보 처리방침</DialogTitle>
                        <DialogDescription className="max-h-[500px] overflow-y-auto mt-4">
                          <div className="space-y-6 text-foreground">
                            <div className="space-y-4">
                              <h3 className="text-lg font-bold text-primary">1. 개인정보의 수집 및 이용 목적</h3>
                              <div className="pl-4 text-sm">
                                <ul className="list-disc space-y-1">
                                  <li>회원 가입 및 관리</li>
                                  <li>AI 기반 건강 정보 검색 서비스 제공</li>
                                  <li>맞춤형 건강 정보 제공</li>
                                  <li>서비스 개선 및 개발</li>
                                  <li>고객 상담 및 불만 처리</li>
                                </ul>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h3 className="text-lg font-bold text-primary">2. 수집하는 개인정보의 항목</h3>
                              <div className="pl-4 text-sm">
                                <div className="mb-4">
                                  <h4 className="font-semibold mb-2">필수항목</h4>
                                  <ul className="list-disc pl-4 space-y-1">
                                    <li>이름</li>
                                    <li>이메일 주소</li>
                                    <li>비밀번호</li>
                                    <li>생년월일</li>
                                    <li>성별</li>
                                    <li>전화번호</li>
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">선택항목</h4>
                                  <ul className="list-disc pl-4">
                                    <li>마케팅 정보 수신 동의</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h3 className="text-lg font-bold text-primary">3. 개인정보의 보유 및 이용기간</h3>
                              <div className="pl-4 text-sm">
                                <p className="mb-2">회원 탈퇴 시까지 보관하며, 다음의 경우에는 해당 기간 종료 시까지 보관합니다:</p>
                                <ul className="list-disc pl-4 space-y-1">
                                  <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                                  <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                                  <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                                </ul>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h3 className="text-lg font-bold text-primary">4. 개인정보의 파기절차 및 방법</h3>
                              <div className="pl-4 text-sm">
                                <p>회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.</p>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h3 className="text-lg font-bold text-primary">5. 이용자의 권리와 행사방법</h3>
                              <div className="pl-4 text-sm">
                                <p>이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며, 회원탈퇴를 통해 개인정보의 수집 및 이용에 대한 동의를 철회할 수 있습니다.</p>
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
                className="w-full bg-[#0B4619] hover:bg-[#083613] text-white"
              >
                가입하기
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 