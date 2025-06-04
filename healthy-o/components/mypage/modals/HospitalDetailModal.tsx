"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Phone, Link as LinkIcon, Calendar, Search, UserRound, Heart, Building2 } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { HospitalRecord, DiagnosisRecord } from "@/types/records"
import { Button } from "@/components/ui/button"

// 날짜 포맷 함수
const formatDate = (dateString: string | undefined | null) => {
  if (!dateString) return "날짜 정보 없음"
  
  try {
    const date = new Date(dateString)
    // 유효한 날짜인지 확인
    if (isNaN(date.getTime())) {
      return "날짜 정보 없음"
    }
    return format(date, 'yyyy년 MM월 dd일', { locale: ko })
  } catch (error) {
    console.error('Date formatting error:', error)
    return "날짜 정보 없음"
  }
}

interface HospitalDetailModalProps {
  record: HospitalRecord | null;
  healthRecord: {
    id: number;
    symptoms: string;
    diseases: Array<{
      diseaseName: string;
      description: string;
      riskLevel: string;
      mainSymptoms: string[];
      managementTips: string[];
    }>;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  diagnosisResults: Array<{
    id: number;
    diseaseName: string;
    description: string;
    riskLevel: string;
    createdAt: string;
    symptoms: string;
  }>;
  userData: {
    name: string;
    birthDate: string;
    gender: string;
  };
  setSelectedRecord?: (record: DiagnosisRecord) => void;
  setShowDetail?: (show: boolean) => void;
}

export function HospitalDetailModal({
  record,
  healthRecord,
  open,
  onOpenChange,
  diagnosisResults,
  userData,
  setSelectedRecord,
  setShowDetail,
}: HospitalDetailModalProps) {
  if (!record) return null;

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

  const handleViewDiagnosisRecord = () => {
    if (record?.diagnosisId && setSelectedRecord && setShowDetail && record.diagnosisResults) {
      const diagnosisRecord: DiagnosisRecord = {
        id: record.diagnosisId,
        diagnosisId: record.diagnosisId,
        createdAt: record.createdAt,
        height: "",
        weight: "",
        bmi: "",
        chronicDiseases: "",
        medications: "",
        smoking: "NON",
        drinking: "NON",
        exercise: "NONE",
        sleep: "",
        occupation: "",
        workStyle: "",
        diet: "",
        mealRegularity: "",
        symptoms: record.diagnosisResults[0]?.symptoms || "",
        symptomStartDate: "",
        diseases: record.diagnosisResults.map(result => ({
          diseaseName: result.diseaseName,
          description: result.description,
          riskLevel: result.riskLevel as "high" | "medium" | "low",
          mainSymptoms: [],
          managementTips: []
        })),
        recommendedDepartments: [record.recommendedDepartment],
        supplements: []
      };
      setSelectedRecord(diagnosisRecord);
      setShowDetail(true);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Search className="w-6 h-6 text-[#0B4619]" />
            <DialogTitle className="text-xl font-bold text-[#0B4619]">
              병원 검색 결과 기록
            </DialogTitle>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              {formatDate(record.createdAt)}
            </span>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* 관련 분석 결과 */}
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
                <span className="text-xs font-medium text-gray-600">주요 증상</span>
                <div className="text-sm font-medium">
                  {record.diagnosisResults[0]?.symptoms || "증상 정보 없음"}
                </div>
              </div>

              {record.diagnosisResults && record.diagnosisResults.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-gray-600">진단된 질환</span>
                  <div className="text-sm font-medium space-y-1">
                    {record.diagnosisResults.map((result, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#0B4619]" />
                        <span>{result.diseaseName}</span>
                        <span className={`text-xs ${getRiskLevelColor(result.riskLevel)}`}>
                          ({getRiskLevelText(result.riskLevel)})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 추천 사유 */}
          <div className="space-y-4 bg-gray-50/50 rounded-lg p-5">
            <div className="flex items-center gap-2 border-b-2 border-[#0B4619]/10 pb-2">
              <Heart className="w-5 h-5 text-[#0B4619]" />
              <h4 className="font-bold text-lg text-[#0B4619]">추천 사유</h4>
            </div>
            <div className="text-sm text-gray-600 whitespace-pre-line px-2">{record.reason}</div>
          </div>

          {/* 추천 병원 목록 */}
          <div className="space-y-4 bg-gray-50/50 rounded-lg p-5">
            <div className="flex items-center gap-2 border-b-2 border-[#0B4619]/10 pb-2">
              <Building2 className="w-5 h-5 text-[#0B4619]" />
              <h4 className="font-bold text-lg text-[#0B4619]">추천 병원 목록</h4>
            </div>
            <div className="space-y-3">
              {record.hospitals.map((hospital, idx) => (
                <div key={idx} className="border border-gray-200 bg-white rounded-lg p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-gray-500">추천 병원 {idx + 1}</span>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-base text-[#0B4619]">{hospital.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 mt-0.5 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-600">진료시간</p>
                          <p className="text-sm font-medium mt-1">{hospital.availableTime}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-600">주소</p>
                          <p className="text-sm font-medium mt-1">{hospital.address}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Phone className="w-4 h-4 mt-0.5 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-600">연락처</p>
                          <p className="text-sm font-medium mt-1">
                            {hospital.contact || "연락처 정보가 없습니다"}
                          </p>
                        </div>
                      </div>
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