'use client';

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
import { User, Mail, Calendar, Lock, Key, KeyRound, Phone } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userData: {
    name?: string;
    email?: string;
    phone?: string;
    birthDate?: string;
    gender?: string;
    marketingAgree?: boolean;
  };
  onSubmit: (data: any) => Promise<void>;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  marketingAgree: boolean;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function EditProfileModal({ open, onOpenChange, userData, onSubmit }: EditProfileModalProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("info");
  
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "M",
    marketingAgree: false,
  };

  const initialPasswordData = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [passwordData, setPasswordData] = useState<PasswordData>(initialPasswordData);

  // 모달이 열릴 때만 userData로 초기화
  useEffect(() => {
    if (open && userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        birthDate: userData.birthDate || "",
        gender: userData.gender || "M",
        marketingAgree: userData.marketingAgree || false,
      });
      // 비밀번호 데이터 초기화
      setPasswordData(initialPasswordData);
      // 탭 초기화
      setActiveTab("info");
    }
  }, [open, userData]);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // 모달이 닫힐 때 초기화
      setFormData(initialFormData);
      setPasswordData(initialPasswordData);
      setActiveTab("info");
    }
    onOpenChange(newOpen);
  };

  // 생일 상태 초기화
  const initializeBirthDate = () => {
    if (userData.birthDate) {
      const [year, month, day] = userData.birthDate.split("-");
      return { year, month, day };
    }
    return { year: "", month: "", day: "" };
  };

  const [birthDate, setBirthDate] = useState(initializeBirthDate());

  // userData가 변경될 때마다 birthDate 상태 업데이트
  useEffect(() => {
    setBirthDate(initializeBirthDate());
  }, [userData.birthDate]);

  const handleBirthDateChange = (type: 'year' | 'month' | 'day', value: string) => {
    const newBirthDate = { ...birthDate };

    if (type === 'year') {
      newBirthDate.year = value;
      newBirthDate.day = ''; // 일자 초기화
    } else if (type === 'month') {
      newBirthDate.month = value;
      newBirthDate.day = ''; // 일자 초기화
    } else {
      newBirthDate.day = value;
    }

    setBirthDate(newBirthDate);

    // 모든 값이 선택되었을 때만 formData 업데이트
    if (newBirthDate.year && newBirthDate.month && newBirthDate.day) {
      const formattedDate = `${newBirthDate.year}-${newBirthDate.month}-${newBirthDate.day}`;
      setFormData(prev => ({
        ...prev,
        birthDate: formattedDate
      }));
    }
  };

  // 연도 범위 계산 (14세 ~ 120세)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 107 }, (_, i) => currentYear - 14 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 해당 월의 일 수 계산
  const getDaysInMonth = (year: string, month: string) => {
    if (!year || !month) return [];
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  // 전화번호 포맷팅 함수 수정
  const formatPhoneNumber = (phone: string | undefined): string[] => {
    if (!phone) return ['', '', ''];
    
    // 하이픈 제거 후 숫자만 추출
    const cleaned = phone.replace(/[^0-9]/g, '');
    
    // 숫자가 10자리 또는 11자리인 경우에만 처리
    if (cleaned.length >= 10 && cleaned.length <= 11) {
      return [
        cleaned.substring(0, 3),
        cleaned.substring(3, 7),
        cleaned.substring(7)
      ];
    }
    
    return ['', '', ''];
  };

  const handleInputChange = (key: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePasswordChange = (key: keyof PasswordData, value: string) => {
    setPasswordData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleProfileSubmit = async () => {
    try {
      await onSubmit(formData);
      toast({
        title: "프로필이 수정되었습니다.",
        description: "변경사항이 성공적으로 저장되었습니다.",
      });
      handleOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "오류가 발생했습니다.",
        description: "프로필 수정에 실패했습니다. 다시 시도해주세요.",
      });
    }
  };

  const handlePasswordSubmit = async () => {
    try {
      await onSubmit(passwordData);
      toast({
        title: "비밀번호가 변경되었습니다.",
        description: "비밀번호가 성공적으로 변경되었습니다.",
      });
      handleOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "오류가 발생했습니다.",
        description: "비밀번호 변경에 실패했습니다. 다시 시도해주세요.",
      });
    }
  };

  // 전화번호 입력 필드 렌더링
  const renderPhoneInputs = () => {
    const phoneParts = formatPhoneNumber(formData.phone);
    const placeholderParts = formatPhoneNumber(userData?.phone);

    return (
      <div className="grid grid-cols-3 gap-2">
        <Input
          value={phoneParts[0]}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 3);
            const newParts = [...phoneParts];
            newParts[0] = value;
            handleInputChange("phone", newParts.join('-'));
          }}
          placeholder={placeholderParts[0] || "010"}
          className="text-center"
          maxLength={3}
        />
        <Input
          value={phoneParts[1]}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 4);
            const newParts = [...phoneParts];
            newParts[1] = value;
            handleInputChange("phone", newParts.join('-'));
          }}
          placeholder={placeholderParts[1] || "1234"}
          className="text-center"
          maxLength={4}
        />
        <Input
          value={phoneParts[2]}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 4);
            const newParts = [...phoneParts];
            newParts[2] = value;
            handleInputChange("phone", newParts.join('-'));
          }}
          placeholder={placeholderParts[2] || "5678"}
          className="text-center"
          maxLength={4}
        />
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader className="mb-8">
          <DialogTitle className="text-3xl font-bold text-center text-[#0B4619] flex items-center justify-center gap-2">
            <User className="w-8 h-8" />
            기본 정보 수정
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500">
            회원님의 기본 정보를 수정할 수 있습니다.
          </DialogDescription>
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
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="이름을 입력해 주세요"
                  className="text-center"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#0B4619]" />
                  <Label htmlFor="email" className="text-sm font-bold">이메일</Label>
                </div>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="text-center bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">생년월일</Label>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Select value={birthDate.year} onValueChange={(value) => handleBirthDateChange('year', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="연도" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>연도</SelectLabel>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}년
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select value={birthDate.month} onValueChange={(value) => handleBirthDateChange('month', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="월" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>월</SelectLabel>
                        {months.map((month) => (
                          <SelectItem key={month} value={month.toString().padStart(2, '0')}>
                            {month}월
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select 
                    value={birthDate.day} 
                    onValueChange={(value) => handleBirthDateChange('day', value)}
                    disabled={!birthDate.year || !birthDate.month}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="일" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>일</SelectLabel>
                        {getDaysInMonth(birthDate.year, birthDate.month).map((day) => (
                          <SelectItem key={day} value={day.toString().padStart(2, '0')}>
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
                  value={formData.gender}
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

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">전화번호</Label>
                </div>
                {renderPhoneInputs()}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marketingAgree"
                  checked={formData.marketingAgree}
                  onCheckedChange={(checked) => handleInputChange("marketingAgree", checked === true)}
                />
                <Label htmlFor="marketingAgree" className="text-sm font-medium">
                  마케팅 정보 수신 동의
                </Label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => handleOpenChange(false)}>
                  취소
                </Button>
                <Button onClick={handleProfileSubmit} className="bg-[#0B4619] hover:bg-[#083613] text-white">
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
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                  placeholder="현재 비밀번호를 입력해 주세요"
                  className="text-center"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-[#0B4619]" />
                  <Label htmlFor="newPassword" className="text-sm font-bold">새 비밀번호</Label>
                </div>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                  placeholder="영문,숫자,특수문자 조합 8~20자리"
                  className="text-center"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[#0B4619]" />
                  <Label htmlFor="confirmPassword" className="text-sm font-bold">새 비밀번호 확인</Label>
                </div>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                  placeholder="새 비밀번호를 다시 입력해 주세요"
                  className="text-center"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => handleOpenChange(false)}>
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