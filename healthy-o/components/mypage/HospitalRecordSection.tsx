"use client"

import { Building2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RecordCard } from "./RecordCard"

interface HospitalRecordSectionProps {
  records: any[]
  onDetailClick: (record: any) => void
  onRelatedClick: (date: string) => void
}

export function HospitalRecordSection({
  records,
  onDetailClick,
  onRelatedClick,
}: HospitalRecordSectionProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg space-y-6 border border-gray-200">
      <div className="flex items-center gap-2">
        <Building2 className="w-5 h-5 text-[#0B4619]" />
        <h3 className="font-bold text-lg text-[#0B4619]">병원 추천 기록</h3>
      </div>
      <ScrollArea className="h-[400px] rounded-md border">
        <div className="p-4 space-y-4">
          {records.map((rec, index) => (
            <RecordCard
              key={rec.id}
              index={index}
              totalCount={records.length}
              date={rec.date}
              badge={{
                text: rec.recommendedDepartment,
                variant: "outline",
                className: "bg-[#0B4619]/5 text-[#0B4619] border-[#0B4619]/20"
              }}
              onDetailClick={() => onDetailClick(rec)}
              onRelatedClick={() => onRelatedClick(rec.date)}
            >
              <div className="flex items-center">
                {rec.hospitals.slice(0, 3).map((hospital: any, idx: number) => (
                  <div key={idx} className="flex items-center">
                    <span className="text-sm font-medium text-gray-700">{hospital.name}</span>
                    {idx < rec.hospitals.slice(0, 3).length - 1 && (
                      <span className="mx-2 text-gray-300">•</span>
                    )}
                  </div>
                ))}
              </div>
            </RecordCard>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
} 