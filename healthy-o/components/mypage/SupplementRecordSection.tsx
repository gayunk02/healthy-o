"use client"

import { Pill } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import type { SupplementRecord } from "@/types/records"
import { RecordItem } from "./RecordItem"
import { DateRange } from "react-day-picker"
import { filterByDate, filterBySearch } from "@/utils/filters"

// SupplementRecord 타입 확장
interface ExtendedSupplementRecord extends Omit<SupplementRecord, 'supplements'> {
  supplements: Array<{
    supplementName: string;
    description: string;
    benefits: string[];
    matchingSymptoms: string[];
  }>;
  diagnosis?: {
    symptoms: string;
    diagnosisResult?: {
      diseases: Array<{
        diseaseName: string;
        riskLevel: string;
      }>;
    };
  };
}

interface SupplementRecordSectionProps {
  onDetailClick: (record: SupplementRecord) => void;
  onRelatedClick: (healthRecordId: number) => void;
  diagnosisRecords: Array<{
    id: number;
    diagnosisId?: number;
    diseases: Array<{
      diseaseName: string;
      riskLevel: string;
    }>;
  }>;
  dateRange?: DateRange;
  searchQuery?: string;
  records: ExtendedSupplementRecord[];
  isLoading: boolean;
  error?: string | null;
}

export function SupplementRecordSection({
  onDetailClick,
  onRelatedClick,
  diagnosisRecords,
  dateRange,
  searchQuery = "",
  records,
  isLoading,
  error
}: SupplementRecordSectionProps) {
  if (isLoading) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#0B4619]/10 p-2 rounded-lg">
              <Pill className="w-5 h-5 text-[#0B4619]" />
            </div>
            <h3 className="font-bold text-lg text-[#0B4619]">영양제 추천 기록</h3>
          </div>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0B4619] mx-auto"></div>
          <p className="text-[#0B4619] mt-4">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#0B4619]/10 p-2 rounded-lg">
              <Pill className="w-5 h-5 text-[#0B4619]" />
            </div>
            <h3 className="font-bold text-lg text-[#0B4619]">영양제 추천 기록</h3>
          </div>
        </div>
        <div className="text-center py-8 text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#0B4619]/10 p-2 rounded-lg">
            <Pill className="w-5 h-5 text-[#0B4619]" />
          </div>
          <h3 className="font-bold text-lg text-[#0B4619]">영양제 추천 기록</h3>
        </div>
      </div>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-2">
          {(() => {
            const filteredRecords = records
              .sort((a, b) => new Date(b.recommendedAt).getTime() - new Date(a.recommendedAt).getTime())
              .filter(record => filterByDate(record.recommendedAt, dateRange))
              .filter(record => {
                if (!searchQuery) return true;
                const searchLower = searchQuery.toLowerCase();
                
                // 영양제 이름으로 검색
                const supplementNames = record.supplements.map(s => s.supplementName.toLowerCase());
                if (supplementNames.some(name => name.includes(searchLower))) return true;
                
                // 진단 기록의 질병 이름으로 검색
                const diagRecord = diagnosisRecords.find(d => d.id === record.diagnosisId || d.diagnosisId === record.diagnosisId);
                const diseaseNames = diagRecord?.diseases.map(d => d.diseaseName.toLowerCase()) || [];
                if (diseaseNames.some(name => name.includes(searchLower))) return true;
                
                return false;
              });

            if (filteredRecords.length === 0) {
              return (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-base">검색 결과가 없습니다</p>
                  <p className="text-sm mt-2 text-gray-400">
                    {records.length === 0 
                      ? "건강 검색을 통해 맞춤 영양제를 추천받아보세요"
                      : "다른 검색어나 날짜를 선택해보세요"}
                  </p>
                </div>
              );
            }

            return filteredRecords.map((record, index) => {
              const mainTitle = record.supplements[0]?.supplementName || '';
              const suffix = record.supplements.length > 1 ? `외 ${record.supplements.length - 1}개` : '';

              // 진단 기록에서 질병 정보 가져오기
              const diagnosisRecord = diagnosisRecords.find(d => d.id === record.diagnosisId || d.diagnosisId === record.diagnosisId);
              const diseases = diagnosisRecord?.diseases.map(d => d.diseaseName) || [];

              return (
                <RecordItem
                  key={record.id}
                  number={(filteredRecords.length - index).toString()}
                  date={format(new Date(record.recommendedAt), 'yyyy년 MM월 dd일', { locale: ko })}
                  title={mainTitle}
                  suffix={suffix}
                  tags={diseases}
                  onClick={() => onDetailClick(record)}
                />
              );
            });
          })()}
        </div>
      </ScrollArea>
    </div>
  );
} 