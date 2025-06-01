"use client"

import { History } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { RecordCard } from "./RecordCard"

interface HealthRecordSectionProps {
  records: any[]
  onDetailClick: (record: any) => void
}

export function HealthRecordSection({
  records,
  onDetailClick,
}: HealthRecordSectionProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg space-y-6 border border-gray-200">
      <div className="flex items-center gap-2">
        <History className="w-5 h-5 text-[#0B4619]" />
        <h3 className="font-bold text-lg text-[#0B4619]">건강상태 검색 기록</h3>
      </div>
      <ScrollArea className="h-[400px] rounded-md border">
        <div className="p-4 space-y-4">
          {records.map((record, index) => (
            <RecordCard
              key={record.id}
              index={index}
              totalCount={records.length}
              date={record.date}
              badge={{
                text: `위험도: ${record.analysis.riskLevel}`,
                variant: "outline",
                className: 
                  record.analysis.riskLevel === "높음" ? "bg-red-50 text-red-700 border-red-200" :
                  record.analysis.riskLevel === "중간" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                  "bg-green-50 text-green-700 border-green-200"
              }}
              onDetailClick={() => onDetailClick(record)}
            >
              <div className="flex flex-wrap gap-2">
                {record.analysis.possibleConditions.slice(0, 3).map((condition: any, idx: number) => (
                  <Badge key={idx} variant="outline" className="text-sm bg-[#0B4619]/5 text-[#0B4619] border-[#0B4619]/20">
                    {condition.name} ({condition.probability})
                  </Badge>
                ))}
              </div>
            </RecordCard>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
} 