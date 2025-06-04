"use client"

import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Pill, Calendar, Search, UserRound, Heart, Coffee, Stethoscope, FileSpreadsheet, Clock, AlertCircle, Utensils, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

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
  record: any
  healthRecord: any
  open: boolean
  onOpenChange: (open: boolean) => void
  onViewHealthRecord?: () => void
}

export function SupplementDetailModal({
  record,
  healthRecord,
  open,
  onOpenChange,
  onViewHealthRecord,
}: SupplementDetailModalProps) {
  if (!record) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Search className="w-6 h-6 text-[#0B4619]" />
            <DialogTitle className="text-xl font-bold text-[#0B4619]">
              건강 검색 결과 기록
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
          {healthRecord && (
            <div className="space-y-4 bg-gray-50/50 rounded-lg p-5">
              <div className="flex items-center justify-between border-b-2 border-[#0B4619]/10 pb-2">
                <div className="flex items-center gap-2">
                  <UserRound className="w-5 h-5 text-[#0B4619]" />
                  <h4 className="font-bold text-lg text-[#0B4619]">건강 정보</h4>
                </div>
                <Button
                  variant="ghost"
                  className="text-[#0B4619] hover:text-[#0B4619] hover:bg-[#0B4619]/10"
                  onClick={onViewHealthRecord}
                >
                  <span className="text-sm font-medium">건강 검색 기록 보기</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 px-2">
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-gray-600">주요 증상</span>
                  <div className="text-sm font-medium">{healthRecord.symptoms.main}</div>
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-gray-600">위험도</span>
                  <div className="text-sm font-medium">
                    {healthRecord.analysis.riskLevel}
                  </div>
                </div>
              </div>
              <div className="space-y-2 mt-4 px-2">
                <span className="text-xs font-medium text-gray-600">가능성 있는 질환</span>
                <div className="space-y-2">
                  {healthRecord.analysis.possibleConditions.map((condition: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between py-1">
                      <span className="text-sm font-medium">{condition.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 추천 사유 */}
          <div className="space-y-4 bg-gray-50/50 rounded-lg p-5">
            <div className="flex items-center gap-2 border-b-2 border-[#0B4619]/10 pb-2">
              <Heart className="w-5 h-5 text-[#0B4619]" />
              <h4 className="font-bold text-lg text-[#0B4619]">추천 사유</h4>
            </div>
            <div className="text-sm text-gray-600 whitespace-pre-line px-2">{record.reason}</div>
          </div>

          {/* 추천 영양제 목록 */}
          <div className="space-y-4 bg-gray-50/50 rounded-lg p-5">
            <div className="flex items-center gap-2 border-b-2 border-[#0B4619]/10 pb-2">
              <Pill className="w-5 h-5 text-[#0B4619]" />
              <h4 className="font-bold text-lg text-[#0B4619]">추천 영양제 목록</h4>
            </div>
            <div className="space-y-6">
              {record.supplements.map((supplement: any, idx: number) => (
                <div key={idx} className="border border-gray-200 bg-white rounded-lg p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-base text-[#0B4619]">{supplement.name}</p>
                      <Badge className="bg-[#0B4619]/10 text-[#0B4619] border-none text-sm px-3 py-1 mt-2">
                        {supplement.type}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 mt-0.5 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-600">복용 정보</p>
                          <p className="text-sm font-medium mt-1">{supplement.dosage}, {supplement.timing}</p>
                          <p className="text-sm font-medium">기간: {supplement.duration}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-600">기대 효과</p>
                          <ul className="mt-1 space-y-1">
                            {supplement.benefits.map((benefit: string, benefitIdx: number) => (
                              <li key={benefitIdx} className="flex items-center gap-2 text-sm font-medium">
                                <span className="w-1 h-1 rounded-full bg-[#0B4619] flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 mt-0.5 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-600">주의사항</p>
                        <ul className="mt-1 space-y-1">
                          {supplement.precautions.map((precaution: string, precautionIdx: number) => (
                            <li key={precautionIdx} className="flex items-center gap-2 text-sm font-medium">
                              <span className="w-1 h-1 rounded-full bg-[#0B4619] flex-shrink-0" />
                              {precaution}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 식이 고려사항 */}
          <div className="space-y-4 bg-gray-50/50 rounded-lg p-5">
            <div className="flex items-center gap-2 border-b-2 border-[#0B4619]/10 pb-2">
              <Utensils className="w-5 h-5 text-[#0B4619]" />
              <h4 className="font-bold text-lg text-[#0B4619]">식이 고려사항</h4>
            </div>
            <div className="text-sm text-gray-600 whitespace-pre-line px-2">{record.dietaryConsiderations}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 