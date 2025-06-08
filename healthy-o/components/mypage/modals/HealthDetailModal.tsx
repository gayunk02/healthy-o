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
import { 
  Search, 
  UserRound, 
  Heart, 
  Coffee, 
  Stethoscope,
  FileSpreadsheet 
} from "lucide-react"
import { DiagnosisRecord } from "@/types/records"

interface Disease {
  diseaseName: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  mainSymptoms: string[];
  managementTips: string[];
}

interface HealthDetailModalProps {
  record: DiagnosisRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// 안전한 날짜 포맷팅 함수
const formatDateSafely = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    // 유효하지 않은 날짜인 경우
    if (isNaN(date.getTime())) {
      return '날짜 정보 없음';
    }
    return format(date, 'yyyy년 MM월 dd일', { locale: ko });
  } catch (error) {
    console.error('날짜 포맷팅 오류:', error);
    return '날짜 정보 없음';
  }
};

// 나이 계산 함수
const calculateAge = (birthDate: string): string => {
  try {
    const birth = new Date(birthDate);
    if (isNaN(birth.getTime())) {
      return '나이 정보 없음';
    }
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return `${age}세`;
  } catch (error) {
    console.error('나이 계산 오류:', error);
    return '나이 정보 없음';
  }
};

// 성별 한글 변환 함수
const formatGender = (gender: string): string => {
  switch (gender?.toUpperCase()) {
    case 'MALE':
      return '남성';
    case 'FEMALE':
      return '여성';
    default:
      return gender || '정보 없음';
  }
};

export function HealthDetailModal({
  record,
  open,
  onOpenChange,
}: HealthDetailModalProps) {
  if (!record) return null;

  console.log('[HealthDetailModal] Record data:', JSON.stringify(record, null, 2));

  const getRiskLevelText = (level: string): string => {
    switch (level) {
      case 'high':
        return '높음';
      case 'medium':
        return '중간';
      case 'low':
        return '낮음';
      default:
        return '알 수 없음';
    }
  };

  const getRiskLevelColor = (level: string): string => {
    switch (level) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-[800px] max-h-[80vh] overflow-y-auto"
        aria-describedby="health-detail-description"
      >
        <DialogHeader className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Search className="w-6 h-6 text-[#0B4619]" />
            <DialogTitle className="text-xl font-bold text-[#0B4619]">
              건강 검색 결과 기록
            </DialogTitle>
          </div>
          <DialogDescription id="health-detail-description" className="text-gray-500">
            {formatDateSafely(record.createdAt)}에 기록된 검색 결과입니다
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 기본 정보 */}
          <div className="space-y-4 bg-gray-50/50 rounded-lg p-5">
            <div className="flex items-center gap-2 border-b-2 border-[#0B4619]/10 pb-2">
              <UserRound className="w-5 h-5 text-[#0B4619]" />
              <h4 className="font-bold text-lg text-[#0B4619]">기본 정보</h4>
            </div>
            <div className="grid grid-cols-3 gap-5 px-2">
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-gray-600">이름</span>
                <p className="text-sm font-medium">{record.name || '정보 없음'}</p>
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-gray-600">나이</span>
                <p className="text-sm font-medium">{record.age ? `${record.age}세` : '정보 없음'}</p>
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-gray-600">성별</span>
                <p className="text-sm font-medium">{formatGender(record.gender)}</p>
              </div>
            </div>
          </div>

          {/* 건강 정보 */}
          <div className="space-y-4 bg-gray-50/50 rounded-lg p-5">
            <div className="flex items-center gap-2 border-b-2 border-[#0B4619]/10 pb-2">
              <Heart className="w-5 h-5 text-[#0B4619]" />
              <h4 className="font-bold text-lg text-[#0B4619]">건강 정보</h4>
            </div>
            <div className="grid grid-cols-2 gap-6 px-2">
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-gray-600">키</span>
                  <p className="text-sm font-medium">{record.height ? `${record.height}cm` : '정보 없음'}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-gray-600">체중</span>
                  <p className="text-sm font-medium">{record.weight ? `${record.weight}kg` : '정보 없음'}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-gray-600">BMI</span>
                  <p className="text-sm font-medium">{record.bmi || '정보 없음'}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-gray-600">만성질환</span>
                  <p className="text-sm font-medium">{record.chronicDiseases || '없음'}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-gray-600">복용약</span>
                  <p className="text-sm font-medium">{record.medications || '없음'}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-gray-600">흡연</span>
                  <p className="text-sm font-medium">{record.smoking}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-gray-600">음주</span>
                  <p className="text-sm font-medium">{record.drinking}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 생활습관 정보 */}
          <div className="space-y-4 bg-gray-50/50 rounded-lg p-5">
            <div className="flex items-center gap-2 border-b-2 border-[#0B4619]/10 pb-2">
              <Coffee className="w-5 h-5 text-[#0B4619]" />
              <h4 className="font-bold text-lg text-[#0B4619]">생활습관 정보</h4>
            </div>
            <div className="grid grid-cols-2 gap-6 px-2">
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-gray-600">운동</span>
                  <p className="text-sm font-medium">{record.exercise}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-gray-600">수면</span>
                  <p className="text-sm font-medium">{record.sleep}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-gray-600">직업</span>
                  <p className="text-sm font-medium">{record.occupation || '없음'}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-gray-600">근무형태</span>
                  <p className="text-sm font-medium">{record.workStyle}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-gray-600">식사형태</span>
                  <p className="text-sm font-medium">{record.diet}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-gray-600">식사규칙성</span>
                  <p className="text-sm font-medium">{record.mealRegularity}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 증상 정보 */}
          <div className="space-y-4 bg-gray-50/50 rounded-lg p-5">
            <div className="flex items-center gap-2 border-b-2 border-[#0B4619]/10 pb-2">
              <Stethoscope className="w-5 h-5 text-[#0B4619]" />
              <h4 className="font-bold text-lg text-[#0B4619]">증상 정보</h4>
            </div>
            <div className="grid grid-cols-2 gap-6 px-2">
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-gray-600">주요 증상</span>
                <p className="text-sm font-medium">{record.symptoms}</p>
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-gray-600">증상 발생시기</span>
                <p className="text-sm font-medium">{record.symptomStartDate}</p>
              </div>
            </div>
          </div>

          {/* 분석 결과 */}
          <div className="space-y-4 bg-gray-50/50 rounded-lg p-5">
            <div className="flex items-center gap-2 border-b-2 border-[#0B4619]/10 pb-2">
              <FileSpreadsheet className="w-5 h-5 text-[#0B4619]" />
              <h4 className="font-bold text-lg text-[#0B4619]">분석 결과</h4>
            </div>
            <div className="space-y-5">
              {record.diseases.map((disease, idx) => (
                <div key={idx} className="border border-gray-200 bg-white rounded-lg p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-gray-500">검색 결과 {idx + 1}</span>
                      <p className="font-bold text-base text-[#0B4619]">{disease.diseaseName}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-gray-600">위험도:</span>
                      <span className={`text-sm font-medium ${getRiskLevelColor(disease.riskLevel)}`}>
                        {getRiskLevelText(disease.riskLevel)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{disease.description}</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-[#0B4619]">주요 증상</p>
                      <ul className="space-y-1.5">
                        {disease.mainSymptoms.map((symptom, sIdx) => (
                          <li key={sIdx} className="text-sm text-gray-600 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#0B4619]" />
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-[#0B4619]">관리 방법</p>
                      <ul className="space-y-1.5">
                        {disease.managementTips.map((tip, tIdx) => (
                          <li key={tIdx} className="text-sm text-gray-600 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#0B4619]" />
                            {tip}
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