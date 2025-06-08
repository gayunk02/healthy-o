'use client';

import { User, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { IUserProfileData } from "@/types/ui";
import { GENDER_OPTIONS } from "@/lib/constants";

interface BasicInfoCardProps {
  userData: IUserProfileData;
  onEdit: () => void;
}

export function BasicInfoCard({ userData, onEdit }: BasicInfoCardProps) {
  const formatBirthDate = (birthDate: string | undefined): string => {
    if (!birthDate) return '정보 없음';
    try {
      const date = new Date(birthDate);
      if (isNaN(date.getTime())) return '정보 없음';
      
      // YYYY-MM-DD 형식인지 확인
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(birthDate)) {
        console.warn('잘못된 날짜 형식:', birthDate);
        return '정보 없음';
      }

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}년 ${month}월 ${day}일`;
    } catch (error) {
      console.error('생년월일 변환 오류:', error);
      return '정보 없음';
    }
  };

  const getGenderText = (value: string | undefined): string => {
    if (!value) return '정보 없음';
    return value === 'M' ? '남성' : '여성';
  };

  const formatPhoneNumber = (phone: string | undefined): string => {
    if (!phone) return '정보 없음';
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phone;
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#0B4619]/10 p-2 rounded-lg">
            <User className="w-5 h-5 text-[#0B4619]" />
          </div>
          <h3 className="font-bold text-lg text-[#0B4619]">기본 정보</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="flex items-center gap-2 hover:bg-[#0B4619] hover:text-white transition-colors"
        >
          <Edit2 className="w-4 h-4" />
          수정
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5 py-2">
          <Label className="text-sm font-medium text-gray-600">이름</Label>
          <p className="text-sm font-semibold text-gray-900">{userData?.name || '정보 없음'}</p>
        </div>
        <div className="space-y-1.5 py-2">
          <Label className="text-sm font-medium text-gray-600">이메일</Label>
          <p className="text-sm font-semibold text-gray-900">{userData?.email || '정보 없음'}</p>
        </div>
        <div className="space-y-1.5 py-2">
          <Label className="text-sm font-medium text-gray-600">전화번호</Label>
          <p className="text-sm font-semibold text-gray-900">{formatPhoneNumber(userData?.phone)}</p>
        </div>
        <div className="space-y-1.5 py-2">
          <Label className="text-sm font-medium text-gray-600">생년월일</Label>
          <p className="text-sm font-semibold text-gray-900">{formatBirthDate(userData?.birthDate)}</p>
        </div>
        <div className="space-y-1.5 py-2">
          <Label className="text-sm font-medium text-gray-600">성별</Label>
          <p className="text-sm font-semibold text-gray-900">{getGenderText(userData?.gender)}</p>
        </div>
        <div className="space-y-1.5 py-2">
          <Label className="text-sm font-medium text-gray-600">마케팅 수신 동의</Label>
          <p className="text-sm font-semibold text-gray-900">{userData?.marketingAgree ? '동의' : '미동의'}</p>
        </div>
      </div>
    </div>
  );
} 