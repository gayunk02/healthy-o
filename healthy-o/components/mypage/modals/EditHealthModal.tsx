'use client';

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, Ruler, Scale, History, Pill, Cigarette, Wine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface IHealthInfo {
  height: string;
  weight: string;
  medicalHistory: string;
  medications: string;
  smoking: string;
  drinking: string;
}

interface EditHealthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userData: IHealthInfo;
}

export function EditHealthModal({ open, onOpenChange, userData }: EditHealthModalProps) {
  const { toast } = useToast();
  const [height, setHeight] = useState(userData.height);
  const [weight, setWeight] = useState(userData.weight);
  const [medicalHistory, setMedicalHistory] = useState(userData.medicalHistory);
  const [medications, setMedications] = useState(userData.medications);
  const [smoking, setSmoking] = useState(userData.smoking);
  const [drinking, setDrinking] = useState(userData.drinking);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/user/health', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          height,
          weight,
          medicalHistory,
          medications,
          smoking,
          drinking,
        }),
      });

      if (!response.ok) {
        throw new Error('저장 실패');
      }

      toast({
        title: "건강 정보가 수정되었습니다.",
        duration: 3000,
      });

      onOpenChange(false);
    } catch (error) {
      console.error('Error saving health info:', error);
      toast({
        title: "건강 정보 수정에 실패했습니다.",
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
            <Heart className="w-8 h-8" />
            건강 정보 수정
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">키 (cm)</Label>
                </div>
                <Input
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*\.?[0-9]*"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="키를 입력해 주세요"
                  className="text-center"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">몸무게 (kg)</Label>
                </div>
                <Input
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*\.?[0-9]*"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="몸무게를 입력해 주세요"
                  className="text-center"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">과거 병력</Label>
                </div>
                <Input
                  value={medicalHistory}
                  onChange={(e) => setMedicalHistory(e.target.value)}
                  placeholder="과거 병력을 입력해 주세요"
                  className="text-center"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Pill className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">복용 중인 약물</Label>
                </div>
                <Input
                  value={medications}
                  onChange={(e) => setMedications(e.target.value)}
                  placeholder="복용 중인 약물을 입력해 주세요"
                  className="text-center"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Cigarette className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">흡연</Label>
                </div>
                <Select value={smoking} onValueChange={setSmoking}>
                  <SelectTrigger className="text-center justify-center">
                    <SelectValue placeholder="흡연 여부를 선택해 주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="비흡연">비흡연</SelectItem>
                    <SelectItem value="흡연">흡연</SelectItem>
                    <SelectItem value="금연">금연</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Wine className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">음주</Label>
                </div>
                <Select value={drinking} onValueChange={setDrinking}>
                  <SelectTrigger className="text-center justify-center">
                    <SelectValue placeholder="음주 여부를 선택해 주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="비음주">비음주</SelectItem>
                    <SelectItem value="주 1-2회">주 1-2회</SelectItem>
                    <SelectItem value="주 3-4회">주 3-4회</SelectItem>
                    <SelectItem value="주 5회 이상">주 5회 이상</SelectItem>
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