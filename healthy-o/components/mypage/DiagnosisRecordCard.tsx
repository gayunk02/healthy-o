import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Stethoscope } from "lucide-react";
import { DateRange } from "react-day-picker";
import { DiagnosisRecord } from "@/types/records";

interface Disease {
  diseaseName: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  mainSymptoms: string[];
  managementTips: string[];
}

interface Supplement {
  supplementName: string;
  description: string;
  benefits: string[];
  matchingSymptoms: string[];
}

interface DiagnosisRecordCardProps {
  records: DiagnosisRecord[];
  onRecordClick: (record: DiagnosisRecord) => void;
  dateRange?: DateRange;
}

export default function DiagnosisRecordCard({ records, onRecordClick, dateRange }: DiagnosisRecordCardProps) {
  // 날짜순으로 정렬 (오래된 순)
  const sortedRecords = [...records].sort((a, b) => 
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-200">
      <div className="flex items-center gap-3">
        <div className="bg-[#0B4619]/10 p-2 rounded-lg">
          <Stethoscope className="w-5 h-5 text-[#0B4619]" />
        </div>
        <h3 className="font-bold text-lg text-[#0B4619]">건강 검색 결과 기록</h3>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {sortedRecords.length > 0 ? (
          sortedRecords.map((record, index) => (
            <div
              key={record.id}
              className="p-4 rounded-lg border bg-white hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onRecordClick(record)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0B4619]/5 text-[#0B4619] font-semibold">
                    {index + 1}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {(() => {
                        try {
                          const date = new Date(record.createdAt);
                          if (isNaN(date.getTime())) {
                            return '날짜 정보 없음';
                          }
                          return format(date, "yyyy년 MM월 dd일", { locale: ko });
                        } catch (error) {
                          console.error('날짜 포맷팅 오류:', error);
                          return '날짜 정보 없음';
                        }
                      })()}
                    </p>
                    {record.diseases && record.diseases.length > 0 && (
                      <p className="text-sm text-gray-600">
                        {record.diseases.map(disease => disease.diseaseName).join(", ")}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-[#0B4619]">→</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 text-sm">
            {dateRange?.from ? 
              `${format(dateRange.from, "yyyy년 MM월 dd일", { locale: ko })} - ${dateRange.to ? format(dateRange.to, "yyyy년 MM월 dd일", { locale: ko }) : '현재'} 기간에 건강 검색 기록이 없습니다.` : 
              '건강 검색 기록이 없습니다.'}
          </div>
        )}
      </div>
    </div>
  );
} 