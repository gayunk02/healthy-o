"use client"

import { Pill } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { RecordCard } from "./RecordCard"

interface SupplementRecordSectionProps {
  records: any[]
  onDetailClick: (record: any) => void
  onRelatedClick: (date: string) => void
}

export function SupplementRecordSection({
  records,
  onDetailClick,
  onRelatedClick,
}: SupplementRecordSectionProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg space-y-6 border border-gray-200">
      <div className="flex items-center gap-2">
        <Pill className="w-5 h-5 text-[#0B4619]" />
        <h3 className="font-bold text-lg text-[#0B4619]">영양제 추천 기록</h3>
      </div>
      <ScrollArea className="h-[400px] rounded-md border">
        <div className="p-4 space-y-4">
          {records.map((rec, index) => (
            <RecordCard
              key={rec.id}
              index={index}
              totalCount={records.length}
              date={rec.date}
              onDetailClick={() => onDetailClick(rec)}
              onRelatedClick={() => onRelatedClick(rec.date)}
            >
              <div className="flex flex-wrap gap-2">
                {rec.supplements.slice(0, 3).map((supplement: any, idx: number) => (
                  <Badge key={idx} variant="outline" className="text-sm bg-[#0B4619]/5 text-[#0B4619] border-[#0B4619]/20">
                    {supplement.name}
                  </Badge>
                ))}
                {rec.supplements.length > 3 && (
                  <Badge variant="outline" className="text-sm bg-[#0B4619]/5 text-[#0B4619] border-[#0B4619]/20">
                    +{rec.supplements.length - 3}개
                  </Badge>
                )}
              </div>
            </RecordCard>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
} 