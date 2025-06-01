"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

interface RecordCardProps {
  index: number
  totalCount: number
  date: string
  badge?: {
    text: string
    variant?: "default" | "outline" | "secondary"
    className?: string
  }
  children: React.ReactNode
  onDetailClick: () => void
  onRelatedClick?: () => void
}

export function RecordCard({
  index,
  totalCount,
  date,
  badge,
  children,
  onDetailClick,
  onRelatedClick,
}: RecordCardProps) {
  const formattedDate = format(new Date(date), 'yyyy년 MM월 dd일', { locale: ko })
  const dayOfWeek = format(new Date(date), 'EEEE', { locale: ko })

  return (
    <div className="group p-4 bg-white rounded-lg border border-gray-200 hover:border-[#0B4619]/30 hover:shadow-[0_2px_8px_rgba(11,70,25,0.07)] transition-all duration-200">
      <div className="flex justify-between items-center mb-2.5 pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#0B4619] text-sm">#{totalCount - index}</span>
            <span className="text-gray-200">|</span>
            <div className="flex items-center gap-1">
              <p className="font-medium text-sm text-gray-600">{formattedDate}</p>
              <span className="text-sm text-gray-400">({dayOfWeek})</span>
            </div>
          </div>
          {badge && (
            <>
              <span className="text-gray-200">|</span>
              <Badge 
                variant={badge.variant || "outline"} 
                className={`${badge.className} text-xs font-medium tracking-tight px-2 py-0.5`}
              >
                {badge.text}
              </Badge>
            </>
          )}
        </div>
        <div className="flex gap-1.5 ml-3 opacity-80 group-hover:opacity-100 transition-opacity">
          {onRelatedClick && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onRelatedClick}
              className="text-xs px-2 py-0.5 h-6 text-[#0B4619] border-[#0B4619]/60 hover:border-[#0B4619] hover:bg-[#0B4619]/5 whitespace-nowrap font-medium transition-colors"
            >
              관련 검진기록
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm"
            onClick={onDetailClick}
            className="text-xs px-2 py-0.5 h-6 text-[#0B4619] border-[#0B4619]/60 hover:border-[#0B4619] hover:bg-[#0B4619]/5 whitespace-nowrap font-medium transition-colors"
          >
            자세히 보기
          </Button>
        </div>
      </div>
      
      <div className="min-h-[32px] text-sm text-gray-600">
        {children}
      </div>
    </div>
  )
} 