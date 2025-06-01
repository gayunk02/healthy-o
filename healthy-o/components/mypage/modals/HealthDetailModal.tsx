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
import { Stethoscope, Calendar, Activity, LineChart } from "lucide-react"

interface HealthDetailModalProps {
  record: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HealthDetailModal({
  record,
  open,
  onOpenChange,
}: HealthDetailModalProps) {
  if (!record) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Stethoscope className="w-7 h-7 text-[#0B4619]" />
            <DialogTitle className="text-2xl font-bold text-[#0B4619]">
              건강 검진 상세 정보
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
          {/* 기본 정보 */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b-2 border-[#0B4619]/10 pb-3">
              <Activity className="w-6 h-6 text-[#0B4619]" />
              <h4 className="font-bold text-xl text-[#0B4619]">기본 정보</h4>
            </div>
            <div className="grid grid-cols-2 gap-8 px-2">
              <div className="space-y-6">
                <div className="space-y-2 border border-gray-200 bg-gray-50/80 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500">키</p>
                  <p className="text-base font-medium text-gray-900">{record.basicInfo.height}</p>
                </div>
                <div className="space-y-2 border border-gray-200 bg-gray-50/80 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500">체중</p>
                  <p className="text-base font-medium text-gray-900">{record.basicInfo.weight}</p>
                </div>
                <div className="space-y-2 border border-gray-200 bg-gray-50/80 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500">BMI</p>
                  <p className="text-base font-medium text-gray-900">{record.basicInfo.bmi}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2 border border-gray-200 bg-gray-50/80 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500">혈압</p>
                  <p className="text-base font-medium text-gray-900">{record.basicInfo.bloodPressure}</p>
                </div>
                <div className="space-y-2 border border-gray-200 bg-gray-50/80 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500">혈당</p>
                  <p className="text-base font-medium text-gray-900">{record.basicInfo.bloodSugar}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 증상 정보 */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b-2 border-[#0B4619]/10 pb-3">
              <Activity className="w-6 h-6 text-[#0B4619]" />
              <h4 className="font-bold text-xl text-[#0B4619]">증상 정보</h4>
            </div>
            <div className="grid grid-cols-2 gap-8 px-2">
              <div className="space-y-6">
                <div className="space-y-2 border border-gray-200 bg-gray-50/80 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500">주요 증상</p>
                  <p className="text-base font-medium text-gray-900">{record.symptoms.main}</p>
                </div>
                <div className="space-y-2 border border-gray-200 bg-gray-50/80 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500">지속 기간</p>
                  <p className="text-base font-medium text-gray-900">{record.symptoms.duration}</p>
                </div>
                <div className="space-y-2 border border-gray-200 bg-gray-50/80 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500">통증 정도</p>
                  <p className="text-base font-medium text-gray-900">{record.symptoms.painLevel}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2 border border-gray-200 bg-gray-50/80 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500">빈도</p>
                  <p className="text-base font-medium text-gray-900">{record.symptoms.frequency}</p>
                </div>
                <div className="space-y-2 border border-gray-200 bg-gray-50/80 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500">유발 요인</p>
                  <p className="text-base font-medium text-gray-900">{record.symptoms.triggers}</p>
                </div>
                <div className="space-y-2 border border-gray-200 bg-gray-50/80 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500">동반 증상</p>
                  <p className="text-base font-medium text-gray-900">{record.symptoms.accompaniedSymptoms}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 생활습관 */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b-2 border-[#0B4619]/10 pb-3">
              <Activity className="w-6 h-6 text-[#0B4619]" />
              <h4 className="font-bold text-xl text-[#0B4619]">생활습관</h4>
            </div>
            <div className="grid grid-cols-2 gap-8 px-2">
              <div className="space-y-6">
                <div className="space-y-2 border border-gray-200 bg-gray-50/80 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500">수면</p>
                  <p className="text-base font-medium text-gray-900">{record.lifestyle.sleepQuality}</p>
                </div>
                <div className="space-y-2 border border-gray-200 bg-gray-50/80 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500">스트레스</p>
                  <p className="text-base font-medium text-gray-900">{record.lifestyle.stressLevel}</p>
                </div>
                <div className="space-y-2 border border-gray-200 bg-gray-50/80 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500">운동</p>
                  <p className="text-base font-medium text-gray-900">{record.lifestyle.exercise}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2 border border-gray-200 bg-gray-50/80 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500">식사</p>
                  <p className="text-base font-medium text-gray-900">{record.lifestyle.diet}</p>
                </div>
                <div className="space-y-2 border border-gray-200 bg-gray-50/80 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500">흡연</p>
                  <p className="text-base font-medium text-gray-900">{record.lifestyle.smoking}</p>
                </div>
                <div className="space-y-2 border border-gray-200 bg-gray-50/80 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500">음주</p>
                  <p className="text-base font-medium text-gray-900">{record.lifestyle.drinking}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 분석 결과 */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b-2 border-[#0B4619]/10 pb-3">
              <LineChart className="w-6 h-6 text-[#0B4619]" />
              <h4 className="font-bold text-xl text-[#0B4619]">분석 결과</h4>
            </div>
            <div className="space-y-6 px-2">
              {record.analysis.possibleConditions.map((condition: any, idx: number) => (
                <div key={idx} className="border border-gray-200 bg-gray-50/80 rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-base text-[#0B4619]">{condition.name}</p>
                    <Badge className="bg-[#0B4619]/10 text-[#0B4619] border-none text-sm px-3 py-1">
                      가능성: {condition.probability}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{condition.description}</p>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-[#0B4619]">권장 조치:</p>
                    <ul className="grid grid-cols-2 gap-3">
                      {condition.recommendedActions.map((action: string, actionIdx: number) => (
                        <li key={actionIdx} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0B4619] flex-shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 