'use client';

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Activity, Coffee, Dumbbell, Moon, Briefcase, PersonStanding, UtensilsCrossed, Clock, Leaf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ILifestyle {
  exercise: "NONE" | "LIGHT" | "MODERATE" | "HEAVY" | undefined;
  sleep: "LESS_5" | "5_TO_6" | "6_TO_7" | "7_TO_8" | "MORE_8" | undefined;
  occupation: string;
  workStyle: "SITTING" | "STANDING" | "ACTIVE" | "MIXED" | undefined;
  diet: "BALANCED" | "MEAT" | "FISH" | "VEGGIE" | "INSTANT" | undefined;
  mealRegularity: "REGULAR" | "MOSTLY" | "IRREGULAR" | "VERY_IRREGULAR" | undefined;
}

interface EditLifestyleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userData: {
    lifestyle: Partial<ILifestyle>;
  };
  onSubmit: (data: { lifestyle: ILifestyle }) => Promise<void>;
}

export function EditLifestyleModal({ open, onOpenChange, userData, onSubmit }: EditLifestyleModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ILifestyle>({
    exercise: undefined,
    sleep: undefined,
    occupation: "",
    workStyle: undefined,
    diet: undefined,
    mealRegularity: undefined
  });

  useEffect(() => {
    if (userData?.lifestyle) {
      setFormData({
        exercise: userData.lifestyle.exercise || undefined,
        sleep: userData.lifestyle.sleep || undefined,
        occupation: userData.lifestyle.occupation || "",
        workStyle: userData.lifestyle.workStyle || undefined,
        diet: userData.lifestyle.diet || undefined,
        mealRegularity: userData.lifestyle.mealRegularity || undefined
      });
    }
  }, [userData]);

  const handleInputChange = (key: keyof ILifestyle, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    try {
      console.log('Submitting lifestyle data:', formData);
      await onSubmit({ lifestyle: formData });
      toast({
        title: "생활습관 정보가 수정되었습니다.",
        description: "변경사항이 성공적으로 저장되었습니다.",
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving lifestyle info:', error);
      toast({
        variant: "destructive",
        title: "오류가 발생했습니다.",
        description: "생활습관 정보 수정에 실패했습니다. 다시 시도해주세요.",
      });
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setFormData({
        exercise: undefined,
        sleep: undefined,
        occupation: "",
        workStyle: undefined,
        diet: undefined,
        mealRegularity: undefined
      });
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader className="mb-8">
          <DialogTitle className="text-3xl font-bold text-center text-[#0B4619] flex items-center justify-center gap-2">
            <Leaf className="w-8 h-8" />
            생활 습관 정보 수정
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500">
            회원님의 생활 습관 정보를 수정할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">운동 빈도</Label>
                </div>
                <Select value={formData.exercise} onValueChange={(value) => handleInputChange("exercise", value)}>
                  <SelectTrigger className="text-center justify-center">
                    <SelectValue placeholder="운동 빈도를 선택해 주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NONE">거의 안 함</SelectItem>
                    <SelectItem value="LIGHT">가벼운 운동 (주 1-2회)</SelectItem>
                    <SelectItem value="MODERATE">적당한 운동 (주 3-4회)</SelectItem>
                    <SelectItem value="HEAVY">활발한 운동 (주 5회 이상)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">평균 수면 시간</Label>
                </div>
                <Select value={formData.sleep} onValueChange={(value) => handleInputChange("sleep", value)}>
                  <SelectTrigger className="text-center justify-center">
                    <SelectValue placeholder="평균 수면 시간을 선택해 주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LESS_5">5시간 미만</SelectItem>
                    <SelectItem value="5_TO_6">5-6시간</SelectItem>
                    <SelectItem value="6_TO_7">6-7시간</SelectItem>
                    <SelectItem value="7_TO_8">7-8시간</SelectItem>
                    <SelectItem value="MORE_8">8시간 초과</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">직업</Label>
                </div>
                <Input
                  value={formData.occupation}
                  onChange={(e) => handleInputChange("occupation", e.target.value)}
                  placeholder="예: 사무직, 학생, 자영업 등"
                  className="text-center"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <PersonStanding className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">근무 형태</Label>
                </div>
                <Select value={formData.workStyle} onValueChange={(value) => handleInputChange("workStyle", value)}>
                  <SelectTrigger className="text-center justify-center">
                    <SelectValue placeholder="근무 형태를 선택해 주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SITTING">주로 앉아서 근무</SelectItem>
                    <SelectItem value="STANDING">주로 서서 근무</SelectItem>
                    <SelectItem value="ACTIVE">활동이 많은 근무</SelectItem>
                    <SelectItem value="MIXED">복합적</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">식사 형태</Label>
                </div>
                <Select value={formData.diet} onValueChange={(value) => handleInputChange("diet", value)}>
                  <SelectTrigger className="text-center justify-center">
                    <SelectValue placeholder="주로 어떤 음식을 드시나요?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BALANCED">균형 잡힌 식단</SelectItem>
                    <SelectItem value="MEAT">육류 위주</SelectItem>
                    <SelectItem value="FISH">생선 위주</SelectItem>
                    <SelectItem value="VEGGIE">채식 위주</SelectItem>
                    <SelectItem value="INSTANT">인스턴트 위주</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">식사 규칙성</Label>
                </div>
                <Select value={formData.mealRegularity} onValueChange={(value) => handleInputChange("mealRegularity", value)}>
                  <SelectTrigger className="text-center justify-center">
                    <SelectValue placeholder="식사는 규칙적으로 하시나요?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="REGULAR">규칙적</SelectItem>
                    <SelectItem value="MOSTLY">대체로 규칙적</SelectItem>
                    <SelectItem value="IRREGULAR">불규칙적</SelectItem>
                    <SelectItem value="VERY_IRREGULAR">매우 불규칙적</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                취소
              </Button>
              <Button
                onClick={handleSave}
                className="bg-[#0B4619] hover:bg-[#083613] text-white"
              >
                저장
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 