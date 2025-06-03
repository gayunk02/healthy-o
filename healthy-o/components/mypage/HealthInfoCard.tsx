'use client';

import { Heart, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { IUserProfileData } from "@/types/ui";
import { SMOKING_OPTIONS, DRINKING_OPTIONS } from "@/lib/constants";

interface HealthInfoCardProps {
  userData: IUserProfileData;
  onEdit: () => void;
}

export function HealthInfoCard({ userData, onEdit }: HealthInfoCardProps) {
  const formatValue = (value: string | undefined, unit: string = ''): string => {
    if (!value || value.trim() === '') return '정보 없음';
    return `${value}${unit}`;
  };

  const getSmokingText = (value: string | undefined): string => {
    if (!value) return '정보 없음';
    return SMOKING_OPTIONS[value as keyof typeof SMOKING_OPTIONS] || '정보 없음';
  };

  const getDrinkingText = (value: string | undefined): string => {
    if (!value) return '정보 없음';
    return DRINKING_OPTIONS[value as keyof typeof DRINKING_OPTIONS] || '정보 없음';
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#0B4619]/10 p-2 rounded-lg">
            <Heart className="w-5 h-5 text-[#0B4619]" />
          </div>
          <h3 className="font-bold text-lg text-[#0B4619]">건강 정보</h3>
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
          <Label className="text-sm font-medium text-gray-600">키</Label>
          <p className="text-sm font-semibold text-gray-900">{formatValue(userData?.height, 'cm')}</p>
        </div>
        <div className="space-y-1.5 py-2">
          <Label className="text-sm font-medium text-gray-600">몸무게</Label>
          <p className="text-sm font-semibold text-gray-900">{formatValue(userData?.weight, 'kg')}</p>
        </div>
        <div className="space-y-1.5 py-2">
          <Label className="text-sm font-medium text-gray-600">과거 병력</Label>
          <p className="text-sm font-semibold text-gray-900">{userData?.medicalHistory || '정보 없음'}</p>
        </div>
        <div className="space-y-1.5 py-2">
          <Label className="text-sm font-medium text-gray-600">복용 약물</Label>
          <p className="text-sm font-semibold text-gray-900">{userData?.medications || '정보 없음'}</p>
        </div>
        <div className="space-y-1.5 py-2">
          <Label className="text-sm font-medium text-gray-600">흡연</Label>
          <p className="text-sm font-semibold text-gray-900">{getSmokingText(userData?.smoking)}</p>
        </div>
        <div className="space-y-1.5 py-2">
          <Label className="text-sm font-medium text-gray-600">음주</Label>
          <p className="text-sm font-semibold text-gray-900">{getDrinkingText(userData?.drinking)}</p>
        </div>
      </div>
    </div>
  );
} 