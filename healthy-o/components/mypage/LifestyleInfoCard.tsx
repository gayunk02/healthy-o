'use client';

import { Activity, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { IUserProfileData, ILifestyle } from "@/types/ui";
import {
  EXERCISE_OPTIONS,
  SLEEP_OPTIONS,
  WORK_STYLE_OPTIONS,
  DIET_OPTIONS,
  MEAL_REGULARITY_OPTIONS
} from "@/lib/constants";

interface LifestyleInfoCardProps {
  userData: IUserProfileData;
  onEdit: () => void;
}

export function LifestyleInfoCard({ userData, onEdit }: LifestyleInfoCardProps) {
  const getLifestyleValue = (key: keyof ILifestyle): string | undefined => {
    if (!userData.lifestyle) return undefined;
    const value = userData.lifestyle[key];
    if (!value || value.trim() === '') return undefined;
    return value;
  };

  const getExerciseText = (value: string | undefined): string => {
    if (!value) return '정보 없음';
    return EXERCISE_OPTIONS[value as keyof typeof EXERCISE_OPTIONS] || '정보 없음';
  };

  const getSleepText = (value: string | undefined): string => {
    if (!value) return '정보 없음';
    return SLEEP_OPTIONS[value as keyof typeof SLEEP_OPTIONS] || '정보 없음';
  };

  const getWorkStyleText = (value: string | undefined): string => {
    if (!value) return '정보 없음';
    return WORK_STYLE_OPTIONS[value as keyof typeof WORK_STYLE_OPTIONS] || '정보 없음';
  };

  const getDietText = (value: string | undefined): string => {
    if (!value) return '정보 없음';
    return DIET_OPTIONS[value as keyof typeof DIET_OPTIONS] || '정보 없음';
  };

  const getMealRegularityText = (value: string | undefined): string => {
    if (!value) return '정보 없음';
    return MEAL_REGULARITY_OPTIONS[value as keyof typeof MEAL_REGULARITY_OPTIONS] || '정보 없음';
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#0B4619]/10 p-2 rounded-lg">
            <Activity className="w-5 h-5 text-[#0B4619]" />
          </div>
          <h3 className="font-bold text-lg text-[#0B4619]">생활습관 정보</h3>
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
          <Label className="text-sm font-medium text-gray-600">운동 빈도</Label>
          <p className="text-sm font-semibold text-gray-900">{getExerciseText(getLifestyleValue('exercise'))}</p>
        </div>
        <div className="space-y-1.5 py-2">
          <Label className="text-sm font-medium text-gray-600">수면 시간</Label>
          <p className="text-sm font-semibold text-gray-900">{getSleepText(getLifestyleValue('sleep'))}</p>
        </div>
        <div className="space-y-1.5 py-2">
          <Label className="text-sm font-medium text-gray-600">직업</Label>
          <p className="text-sm font-semibold text-gray-900">{getLifestyleValue('occupation') || '정보 없음'}</p>
        </div>
        <div className="space-y-1.5 py-2">
          <Label className="text-sm font-medium text-gray-600">근무 형태</Label>
          <p className="text-sm font-semibold text-gray-900">{getWorkStyleText(getLifestyleValue('workStyle'))}</p>
        </div>
        <div className="space-y-1.5 py-2">
          <Label className="text-sm font-medium text-gray-600">식단 유형</Label>
          <p className="text-sm font-semibold text-gray-900">{getDietText(getLifestyleValue('diet'))}</p>
        </div>
        <div className="space-y-1.5 py-2">
          <Label className="text-sm font-medium text-gray-600">식사 규칙성</Label>
          <p className="text-sm font-semibold text-gray-900">{getMealRegularityText(getLifestyleValue('mealRegularity'))}</p>
        </div>
      </div>
    </div>
  );
} 