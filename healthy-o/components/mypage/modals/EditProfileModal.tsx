'use client';

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Calendar, Lock, Key, KeyRound } from "lucide-react";

interface IEditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userData: {
    name: string;
    email: string;
    birthDate: string;
    gender: string;
  };
}

interface IFormData {
  name: string;
  email: string;
  birthDate: string;
  gender: string;
}

interface IFormErrors {
  name?: string;
  email?: string;
}

interface IPasswordErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface IPasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function EditProfileModal({ open, onOpenChange, userData }: IEditProfileModalProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("info");
  const [form, setForm] = useState({
    name: userData.name,
    email: userData.email,
    birthDate: userData.birthDate,
    gender: userData.gender,
  });
  const [passwordForm, setPasswordForm] = useState<IPasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<IFormErrors>({});
  const [passwordErrors, setPasswordErrors] = useState<IPasswordErrors>({});

  // 연도 범위 계산 (14세 ~ 120세)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 107 }, (_, i) => currentYear - 14 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const [birthYear, setBirthYear] = useState(userData.birthDate.split("-")[0]);
  const [birthMonth, setBirthMonth] = useState(userData.birthDate.split("-")[1]);
  const [birthDay, setBirthDay] = useState(userData.birthDate.split("-")[2]);

  const getDaysInMonth = (year: string, month: string) => {
    if (!year || !month) return [];
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const handleInputChange = (key: keyof IFormData, value: string) => {
    setForm((prev) => {
      const newForm = { ...prev, [key]: value };
      const newErrors = { ...errors } as IFormErrors;

      if (value === "") {
        if (key === "name" || key === "email") {
          newErrors[key] = "";
        }
      } else {
        if (key === "email") {
          const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
          newErrors.email = emailRegex.test(value) ? "" : "올바른 이메일 형식이 아닙니다.";
        }

        if (key === "name") {
          newErrors.name = value.trim().length >= 2 ? "" : "이름은 2글자 이상 입력해 주세요.";
        }
      }

      setErrors(newErrors);
      return newForm;
    });
  };

  const handlePasswordChange = (key: string, value: string) => {
    setPasswordForm(prev => {
      const newForm = { ...prev, [key]: value };
      const newErrors: IPasswordErrors = { ...passwordErrors };

      if (value === "") {
        newErrors[key as keyof IPasswordErrors] = "";
      } else {
        if (key === "newPassword") {
          const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
          newErrors.newPassword = passwordRegex.test(value)
            ? ""
            : "비밀번호는 8~20자의 영문, 숫자, 특수문자를 포함해야 합니다.";
          if (newForm.confirmPassword) {
            newErrors.confirmPassword = value === newForm.confirmPassword ? "" : "비밀번호가 일치하지 않습니다.";
          }
        }

        if (key === "confirmPassword") {
          newErrors.confirmPassword = value === newForm.newPassword ? "" : "비밀번호가 일치하지 않습니다.";
        }
      }

      setPasswordErrors(newErrors);
      return newForm;
    });
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

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("프로필 수정에 실패했습니다.");
      }

      toast({
        title: "프로필이 수정되었습니다.",
        duration: 3000,
      });

      onOpenChange(false);
      // TODO: 부모 컴포넌트의 데이터 갱신
    } catch (error) {
      toast({
        variant: "destructive",
        title: "프로필 수정 실패",
        description: "프로필 수정 중 문제가 발생했습니다. 다시 시도해 주세요.",
        duration: 3000,
      });
    }
  };

  const handlePasswordSubmit = async () => {
    if (!passwordForm.currentPassword) {
      setPasswordErrors((prev: IPasswordErrors) => ({ ...prev, currentPassword: "현재 비밀번호를 입력해 주세요." }));
      return;
    }
    if (!passwordForm.newPassword) {
      setPasswordErrors((prev: IPasswordErrors) => ({ ...prev, newPassword: "새 비밀번호를 입력해 주세요." }));
      return;
    }
    if (!passwordForm.confirmPassword) {
      setPasswordErrors((prev: IPasswordErrors) => ({ ...prev, confirmPassword: "비밀번호 확인을 입력해 주세요." }));
      return;
    }
    if (Object.values(passwordErrors).some(error => error)) {
      return;
    }

    try {
      const response = await fetch("/api/user/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("비밀번호 변경에 실패했습니다.");
      }

      toast({
        title: "비밀번호가 변경되었습니다.",
        duration: 3000,
      });

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setActiveTab("info");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "비밀번호 변경 실패",
        description: "비밀번호 변경 중 문제가 발생했습니다. 다시 시도해 주세요.",
        duration: 3000,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader className="mb-8">
          <DialogTitle className="text-3xl font-bold text-center text-[#0B4619] flex items-center justify-center gap-2">
            <User className="w-8 h-8" />
            기본 정보 수정
          </DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-8">
            <TabsTrigger value="info">기본 정보</TabsTrigger>
            <TabsTrigger value="password">비밀번호 변경</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#0B4619]" />
                  <Label htmlFor="name" className="text-sm font-bold">이름</Label>
                </div>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="이름을 입력해 주세요"
                  className="text-center"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#0B4619]" />
                  <Label htmlFor="email" className="text-sm font-bold">이메일</Label>
                </div>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="이메일을 입력해 주세요"
                  className="text-center"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">생년월일</Label>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Select value={birthYear} onValueChange={(value) => handleBirthDateChange('year', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="연도" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      <SelectGroup>
                        <SelectLabel className="text-center w-full px-2 py-1.5 text-sm font-semibold">연도</SelectLabel>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()} className="text-center">
                            {year}년
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select value={birthMonth} onValueChange={(value) => handleBirthDateChange('month', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="월" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      <SelectGroup>
                        <SelectLabel className="text-center w-full px-2 py-1.5 text-sm font-semibold">월</SelectLabel>
                        {months.map((month) => (
                          <SelectItem key={month} value={month.toString().padStart(2, '0')} className="text-center">
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
                    <SelectTrigger>
                      <SelectValue placeholder="일" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      <SelectGroup>
                        <SelectLabel className="text-center w-full px-2 py-1.5 text-sm font-semibold">일</SelectLabel>
                        {getDaysInMonth(birthYear, birthMonth).map((day) => (
                          <SelectItem key={day} value={day.toString().padStart(2, '0')} className="text-center">
                            {day}일
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">성별</Label>
                </div>
                <RadioGroup
                  className="flex justify-center gap-4"
                  value={form.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
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
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  취소
                </Button>
                <Button onClick={handleSubmit} className="bg-[#0B4619] hover:bg-[#083613] text-white">
                  저장
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="password" className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#0B4619]" />
                  <Label htmlFor="currentPassword" className="text-sm font-bold">현재 비밀번호</Label>
                </div>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                  placeholder="현재 비밀번호를 입력해 주세요"
                  className="text-center"
                />
                {passwordErrors.currentPassword && (
                  <p className="text-sm text-red-500">{passwordErrors.currentPassword}</p>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-[#0B4619]" />
                  <Label htmlFor="newPassword" className="text-sm font-bold">새 비밀번호</Label>
                </div>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                  placeholder="영문,숫자,특수문자 조합 8~20자리"
                  className="text-center"
                />
                {passwordErrors.newPassword && (
                  <p className="text-sm text-red-500">{passwordErrors.newPassword}</p>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[#0B4619]" />
                  <Label htmlFor="confirmPassword" className="text-sm font-bold">새 비밀번호 확인</Label>
                </div>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                  placeholder="새 비밀번호를 다시 입력해 주세요"
                  className="text-center"
                />
                {passwordErrors.confirmPassword && (
                  <p className="text-sm text-red-500">{passwordErrors.confirmPassword}</p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  취소
                </Button>
                <Button onClick={handlePasswordSubmit} className="bg-[#0B4619] hover:bg-[#083613] text-white">
                  변경
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
} 