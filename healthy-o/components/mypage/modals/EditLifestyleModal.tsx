'use client';

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Activity, Coffee, Dumbbell, Moon, Briefcase, PersonStanding, UtensilsCrossed, Clock, Leaf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ILifestyle } from "@/types/ui";

interface EditLifestyleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userData: {
    lifestyle: ILifestyle;
  };
}

export function EditLifestyleModal({ open, onOpenChange, userData }: EditLifestyleModalProps) {
  const { toast } = useToast();
  const [exercise, setExercise] = useState(userData.lifestyle.exercise);
  const [sleep, setSleep] = useState(userData.lifestyle.sleep);
  const [occupation, setOccupation] = useState(userData.lifestyle.occupation);
  const [workStyle, setWorkStyle] = useState(userData.lifestyle.workStyle);
  const [diet, setDiet] = useState(userData.lifestyle.diet);
  const [mealRegularity, setMealRegularity] = useState(userData.lifestyle.mealRegularity);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/user/lifestyle', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          exercise,
          sleep,
          occupation,
          workStyle,
          diet,
          mealRegularity,
        }),
      });

      if (!response.ok) {
        throw new Error('저장 실패');
      }

      toast({
        title: "생활습관 정보가 수정되었습니다.",
        duration: 3000,
      });

      onOpenChange(false);
      // 페이지 새로고침하여 업데이트된 정보 표시
      window.location.reload();
    } catch (error) {
      console.error('Error saving lifestyle info:', error);
      toast({
        title: "생활습관 정보 수정에 실패했습니다.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader className="mb-8">
          <DialogTitle className="text-3xl font-bold text-center text-[#0B4619] flex items-center justify-center gap-2">
            <Leaf className="w-8 h-8" />
            생활 습관 정보 수정
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">운동 빈도</Label>
                </div>
                <Select value={exercise} onValueChange={setExercise}>
                  <SelectTrigger className="text-center justify-center">
                    <SelectValue placeholder="운동 빈도를 선택해 주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">거의 안 함</SelectItem>
                    <SelectItem value="light">가벼운 운동 (주 1-2회)</SelectItem>
                    <SelectItem value="moderate">적당한 운동 (주 3-4회)</SelectItem>
                    <SelectItem value="heavy">활발한 운동 (주 5회 이상)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">평균 수면 시간</Label>
                </div>
                <Select value={sleep} onValueChange={setSleep}>
                  <SelectTrigger className="text-center justify-center">
                    <SelectValue placeholder="평균 수면 시간을 선택해 주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less5">5시간 미만</SelectItem>
                    <SelectItem value="5to6">5-6시간</SelectItem>
                    <SelectItem value="6to7">6-7시간</SelectItem>
                    <SelectItem value="7to8">7-8시간</SelectItem>
                    <SelectItem value="more8">8시간 초과</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">직업</Label>
                </div>
                <Input
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="예: 사무직, 학생, 자영업 등"
                  className="text-center"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <PersonStanding className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">근무 형태</Label>
                </div>
                <Select value={workStyle} onValueChange={setWorkStyle}>
                  <SelectTrigger className="text-center justify-center">
                    <SelectValue placeholder="근무 형태를 선택해 주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sitting">주로 앉아서 근무</SelectItem>
                    <SelectItem value="standing">주로 서서 근무</SelectItem>
                    <SelectItem value="moving">활동이 많은 근무</SelectItem>
                    <SelectItem value="mixed">복합적</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">식사 형태</Label>
                </div>
                <Select value={diet} onValueChange={setDiet}>
                  <SelectTrigger className="text-center justify-center">
                    <SelectValue placeholder="주로 어떤 음식을 드시나요?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="balanced">균형 잡힌 식단</SelectItem>
                    <SelectItem value="meat">육류 위주</SelectItem>
                    <SelectItem value="fish">생선 위주</SelectItem>
                    <SelectItem value="vegetable">채식 위주</SelectItem>
                    <SelectItem value="instant">인스턴트 위주</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">식사 규칙성</Label>
                </div>
                <Select value={mealRegularity} onValueChange={setMealRegularity}>
                  <SelectTrigger className="text-center justify-center">
                    <SelectValue placeholder="식사는 규칙적으로 하시나요?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">규칙적</SelectItem>
                    <SelectItem value="mostly">대체로 규칙적</SelectItem>
                    <SelectItem value="irregular">불규칙적</SelectItem>
                    <SelectItem value="very-irregular">매우 불규칙적</SelectItem>
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