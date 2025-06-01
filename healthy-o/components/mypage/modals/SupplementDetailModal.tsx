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
import { Pill, Calendar, LineChart, Clock, AlertCircle, Utensils, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

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
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Pill className="w-7 h-7 text-[#0B4619]" />
            <DialogTitle className="text-2xl font-bold text-[#0B4619]">
              영양제 추천 상세 정보
            </DialogTitle>
          </div>
          <div className="flex items-center gap-2 text-gray-500 mt-1">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              {format(new Date(record.date), 'yyyy년 MM월 dd일', { locale: ko })}
            </span>
          </div>
        </DialogHeader>

        <div className="space-y-10 py-8">
          {/* 관련 분석 결과 */}
          {healthRecord && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b-2 border-[#0B4619]/10 pb-3">
                <div className="flex items-center gap-2">
                  <LineChart className="w-6 h-6 text-[#0B4619]" />
                  <h4 className="font-bold text-xl text-[#0B4619]">관련 진단 기록</h4>
                </div>
                <Button
                  variant="ghost"
                  className="text-[#0B4619] hover:text-[#0B4619] hover:bg-[#0B4619]/10"
                  onClick={onViewHealthRecord}
                >
                  <span className="text-sm font-medium">진단 기록 보기</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="space-y-4 px-2">
                <div className="space-y-3 border border-gray-200 bg-gray-50/80 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-gray-900">주요 증상:</span>
                    <span className="text-sm text-gray-600">{healthRecord.symptoms.main}</span>
                  </div>
                  {healthRecord.analysis.possibleConditions.map((condition: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                      <span className="text-sm text-gray-900">{condition.name}</span>
                      <Badge className="bg-[#0B4619]/10 text-[#0B4619] border-none text-sm px-3 py-1">
                        가능성: {condition.probability}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 추천 사유 */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b-2 border-[#0B4619]/10 pb-3">
              <LineChart className="w-6 h-6 text-[#0B4619]" />
              <h4 className="font-bold text-xl text-[#0B4619]">추천 사유</h4>
            </div>
            <div className="border border-gray-200 bg-gray-50/80 rounded-lg p-4">
              <p className="text-sm text-gray-600 whitespace-pre-line">{record.reason}</p>
            </div>
          </div>

          {/* 추천 영양제 목록 */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b-2 border-[#0B4619]/10 pb-3">
              <Pill className="w-6 h-6 text-[#0B4619]" />
              <h4 className="font-bold text-xl text-[#0B4619]">추천 영양제 목록</h4>
            </div>
            <div className="space-y-6 px-2">
              {record.supplements.map((supplement: any, idx: number) => (
                <div key={idx} className="border border-gray-200 bg-gray-50/80 rounded-lg p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-base text-[#0B4619]">{supplement.name}</p>
                      <Badge className="bg-[#0B4619]/10 text-[#0B4619] border-none text-sm px-3 py-1 mt-2">
                        {supplement.type}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-3 border border-gray-200 bg-gray-50/80 rounded-lg p-4">
                      <Clock className="w-5 h-5 mt-0.5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">복용 정보</p>
                        <p className="text-sm text-gray-600 mt-2">{supplement.dosage}, {supplement.timing}</p>
                        <p className="text-sm text-gray-600">기간: {supplement.duration}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 border border-gray-200 bg-gray-50/80 rounded-lg p-4">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">기대 효과</p>
                        <ul className="mt-2 space-y-2">
                          {supplement.benefits.map((benefit: string, benefitIdx: number) => (
                            <li key={benefitIdx} className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0B4619] flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 border border-gray-200 bg-gray-50/80 rounded-lg p-4">
                      <AlertCircle className="w-5 h-5 mt-0.5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">주의사항</p>
                        <ul className="mt-2 space-y-2">
                          {supplement.precautions.map((precaution: string, precautionIdx: number) => (
                            <li key={precautionIdx} className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0B4619] flex-shrink-0" />
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
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b-2 border-[#0B4619]/10 pb-3">
              <Utensils className="w-6 h-6 text-[#0B4619]" />
              <h4 className="font-bold text-xl text-[#0B4619]">식이 고려사항</h4>
            </div>
            <div className="border border-gray-200 bg-gray-50/80 rounded-lg p-4">
              <ul className="space-y-3">
                {record.dietaryConsiderations.map((consideration: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B4619] flex-shrink-0" />
                    {consideration}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 