"use client"

import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Pill, Calendar, Search, UserRound, Heart, Link as LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DiagnosisRecord } from "@/types/records"
import { Separator } from "@/components/ui/separator"

// 날짜 포맷 함수 추가
const formatDate = (dateString: string | undefined | null) => {
  if (!dateString) return "날짜 정보 없음";
  
  try {
    const date = new Date(dateString);
    // 유효한 날짜인지 확인
    if (isNaN(date.getTime())) {
      return "날짜 정보 없음";
    }
    return format(date, 'yyyy년 MM월 dd일', { locale: ko });
  } catch (error) {
    console.error('Date formatting error:', error);
    return "날짜 정보 없음";
  }
};

interface SupplementDetailModalProps {
  record: {
    id: number;
    diagnosisId: number;
    recommendedAt: string;
    supplements: Array<{
      supplementName: string;
      description: string;
      benefits: string[];
      matchingSymptoms: string[];
    }>;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setSelectedRecord?: (record: DiagnosisRecord) => void;
  setShowDetail?: (show: boolean) => void;
  diagnosis?: {
    id: number;
    symptoms: string;
    symptomStartDate: string;
  } | null;
  diagnosisRecord?: DiagnosisRecord | null;
}

export function SupplementDetailModal({
  record,
  open,
  onOpenChange,
  setSelectedRecord,
  setShowDetail,
  diagnosis,
  diagnosisRecord,
}: SupplementDetailModalProps) {
  if (!record) return null;

  const handleViewDiagnosisRecord = () => {
    if (diagnosisRecord && setSelectedRecord && setShowDetail) {
      setSelectedRecord(diagnosisRecord);
      setShowDetail(true);
      onOpenChange(false);
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getRiskLevelText = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return '높음';
      case 'medium':
        return '중간';
      case 'low':
        return '낮음';
      default:
        return '정보 없음';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-[800px] max-h-[80vh] overflow-y-auto"
        aria-describedby="supplement-detail-description"
      >
        <DialogHeader className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Search className="w-6 h-6 text-[#0B4619]" />
            <DialogTitle className="text-xl font-bold text-[#0B4619]">
              영양제 추천 기록
            </DialogTitle>
          </div>
          <DialogDescription id="supplement-detail-description" className="text-gray-500">
            {formatDate(record.recommendedAt)}에 기록된 추천 결과입니다
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 건강 정보 */}
          {diagnosisRecord && (
            <div className="space-y-4 bg-gray-50/50 rounded-lg p-5">
              <div className="flex items-center justify-between border-b-2 border-[#0B4619]/10 pb-2">
                <div className="flex items-center gap-2">
                  <UserRound className="w-5 h-5 text-[#0B4619]" />
                  <h4 className="font-bold text-lg text-[#0B4619]">건강 정보</h4>
                </div>
                <Button
                  variant="ghost"
                  className="text-[#0B4619] hover:text-[#0B4619] hover:bg-[#0B4619]/10"
                  onClick={handleViewDiagnosisRecord}
                >
                  <span className="text-sm font-medium">건강 검색 기록 보기</span>
                  <LinkIcon className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="space-y-4 px-2">
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-gray-600">증상</span>
                  <div className="text-sm font-medium">
                    {diagnosisRecord?.symptoms || diagnosis?.symptoms || "증상 정보 없음"}
                  </div>
                </div>

                {diagnosisRecord?.diseases && diagnosisRecord.diseases.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-medium text-gray-600">건강 검색 결과</span>
                    <div className="text-sm font-medium space-y-1">
                      {diagnosisRecord.diseases.map((disease, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#0B4619]" />
                          <span>{disease.diseaseName}</span>
                          <span className={`text-xs ${getRiskLevelColor(disease.riskLevel)}`}>
                            (위험도: {getRiskLevelText(disease.riskLevel)})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 추천 사유 */}
          <div className="space-y-4 bg-gray-50/50 rounded-lg p-5">
            <div className="flex items-center gap-2 border-b-2 border-[#0B4619]/10 pb-2">
              <Heart className="w-5 h-5 text-[#0B4619]" />
              <h4 className="font-bold text-lg text-[#0B4619]">추천 사유</h4>
            </div>
            <div className="text-sm text-gray-600 whitespace-pre-line px-2">
              {diagnosisRecord?.diseases?.map(disease => disease.mainSymptoms).flat().map((symptom, index) => (
                <div key={index} className="flex items-center gap-2 py-1">
                  <span className="w-1 h-1 rounded-full bg-[#0B4619]" />
                  <span>{symptom}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 추천 영양제 목록 */}
          <div className="space-y-4 bg-gray-50/50 rounded-lg p-5">
            <div className="flex items-center gap-2 border-b-2 border-[#0B4619]/10 pb-2">
              <Pill className="w-5 h-5 text-[#0B4619]" />
              <h4 className="font-bold text-lg text-[#0B4619]">추천 영양제 목록</h4>
            </div>
            <div className="space-y-5">
              {record.supplements.map((supplement, idx) => (
                <div key={idx} className="border border-gray-200 bg-white rounded-lg p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-gray-500">추천 영양제 {idx + 1}</span>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-base text-[#0B4619]">{supplement.supplementName}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{supplement.description}</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-[#0B4619]">기대 효과</p>
                      <ul className="space-y-1.5">
                        {supplement.benefits.map((benefit, benefitIdx) => (
                          <li key={benefitIdx} className="text-sm text-gray-600 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#0B4619]" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-[#0B4619]">관련 증상</p>
                      <ul className="space-y-1.5">
                        {supplement.matchingSymptoms.map((symptom, symptomIdx) => (
                          <li key={symptomIdx} className="text-sm text-gray-600 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#0B4619]" />
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 