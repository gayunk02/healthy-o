'use client';

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, Ruler, Scale, History, Pill, Cigarette, Wine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { IUserProfileData } from "@/types/ui";

interface EditHealthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userData: Pick<IUserProfileData, 'height' | 'weight' | 'medicalHistory' | 'medications' | 'smoking' | 'drinking'>;
  onSubmit: (data: Partial<IUserProfileData>) => Promise<void>;
}

export function EditHealthModal({ open, onOpenChange, userData, onSubmit }: EditHealthModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Pick<IUserProfileData, 'height' | 'weight' | 'medicalHistory' | 'medications' | 'smoking' | 'drinking'>>({
    height: "",
    weight: "",
    medicalHistory: "",
    medications: "",
    smoking: undefined,
    drinking: undefined
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        height: userData.height || "",
        weight: userData.weight || "",
        medicalHistory: userData.medicalHistory || "",
        medications: userData.medications || "",
        smoking: userData.smoking || undefined,
        drinking: userData.drinking || undefined
      });
    }
  }, [userData]);

  const handleInputChange = (key: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    try {
      console.log('Submitting health data:', formData);
      await onSubmit(formData);
      toast({
        title: "건강 정보가 수정되었습니다.",
        description: "변경사항이 성공적으로 저장되었습니다.",
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving health info:', error);
      toast({
        variant: "destructive",
        title: "오류가 발생했습니다.",
        description: "건강 정보 수정에 실패했습니다. 다시 시도해주세요.",
      });
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setFormData({
        height: "",
        weight: "",
        medicalHistory: "",
        medications: "",
        smoking: undefined,
        drinking: undefined
      });
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader className="mb-8">
          <DialogTitle className="text-3xl font-bold text-center text-[#0B4619] flex items-center justify-center gap-2">
            <Heart className="w-8 h-8" />
            건강 정보 수정
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500">
            회원님의 건강 정보를 수정할 수 있습니다.
          </DialogDescription>
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
                  value={formData.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  placeholder={userData.height || "키를 입력해 주세요"}
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
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  placeholder={userData.weight || "몸무게를 입력해 주세요"}
                  className="text-center"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">과거 병력</Label>
                </div>
                <Input
                  value={formData.medicalHistory}
                  onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                  placeholder={userData.medicalHistory || "과거 병력을 입력해 주세요"}
                  className="text-center"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Pill className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">복용 중인 약물</Label>
                </div>
                <Input
                  value={formData.medications}
                  onChange={(e) => handleInputChange("medications", e.target.value)}
                  placeholder={userData.medications || "복용 중인 약물을 입력해 주세요"}
                  className="text-center"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Cigarette className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">흡연</Label>
                </div>
                <Select 
                  value={formData.smoking}
                  onValueChange={(value) => handleInputChange("smoking", value as "NON" | "ACTIVE" | "QUIT")}
                >
                  <SelectTrigger className="text-center justify-center">
                    <SelectValue placeholder="흡연 여부를 선택해 주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NON">비흡연</SelectItem>
                    <SelectItem value="ACTIVE">흡연</SelectItem>
                    <SelectItem value="QUIT">금연</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Wine className="w-4 h-4 text-[#0B4619]" />
                  <Label className="text-sm font-bold">음주</Label>
                </div>
                <Select 
                  value={formData.drinking}
                  onValueChange={(value) => handleInputChange("drinking", value as "NON" | "LIGHT" | "MODERATE" | "HEAVY")}
                >
                  <SelectTrigger className="text-center justify-center">
                    <SelectValue placeholder="음주 여부를 선택해 주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NON">비음주</SelectItem>
                    <SelectItem value="LIGHT">주 1-2회</SelectItem>
                    <SelectItem value="MODERATE">주 3-4회</SelectItem>
                    <SelectItem value="HEAVY">주 5회 이상</SelectItem>
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