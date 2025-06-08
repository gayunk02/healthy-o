"use client"

import { History } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { useAuth } from "@/hooks/useAuth"
import { DiagnosisRecord } from "@/types/records"
import { RecordItem } from "./RecordItem"
import { DateRange } from "react-day-picker"
import { filterByDate, filterBySearch } from "@/utils/filters"

interface HealthRecordSectionProps {
  onDetailClick: (record: DiagnosisRecord) => void;
  dateRange?: DateRange;
  searchQuery?: string;
}

export function HealthRecordSection({
  onDetailClick,
  dateRange,
  searchQuery = "",
}: HealthRecordSectionProps) {
  const [records, setRecords] = useState<DiagnosisRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        if (!token) {
          throw new Error("인증이 필요합니다.");
        }

        // 캐시된 데이터 확인
        const cachedData = localStorage.getItem('health_records_cache');
        const cacheTimestamp = localStorage.getItem('health_records_cache_timestamp');
        
        if (cachedData && cacheTimestamp) {
          const cacheAge = Date.now() - parseInt(cacheTimestamp);
          if (cacheAge < 5 * 60 * 1000) { // 5분
            setRecords(JSON.parse(cachedData));
            setIsLoading(false);
            return;
          }
        }

        const response = await fetch("/api/mypage/diagnosis", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("인증이 만료되었습니다. 다시 로그인해주세요.");
          }
          throw new Error("건강 검색 기록을 불러오는데 실패했습니다.");
        }

        const data = await response.json();
        if (data.success) {
          // 데이터 유효성 검사
          if (!Array.isArray(data.data)) {
            throw new Error("잘못된 데이터 형식입니다.");
          }

          // 캐시 저장
          localStorage.setItem('health_records_cache', JSON.stringify(data.data));
          localStorage.setItem('health_records_cache_timestamp', Date.now().toString());

          setRecords(data.data);
        } else {
          throw new Error(data.message || "건강 검색 기록을 불러오는데 실패했습니다.");
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "오류가 발생했습니다.";
        setError(errorMessage);
        // 캐시 삭제
        localStorage.removeItem('health_records_cache');
        localStorage.removeItem('health_records_cache_timestamp');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, [token]);

  if (isLoading) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#0B4619]/10 p-2 rounded-lg">
              <History className="w-5 h-5 text-[#0B4619]" />
            </div>
            <h3 className="font-bold text-lg text-[#0B4619]">건강 검색 결과 기록</h3>
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
              <History className="w-5 h-5 text-[#0B4619]" />
            </div>
            <h3 className="font-bold text-lg text-[#0B4619]">건강 검색 결과 기록</h3>
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
            <History className="w-5 h-5 text-[#0B4619]" />
          </div>
          <h3 className="font-bold text-lg text-[#0B4619]">건강 검색 결과 기록</h3>
        </div>
      </div>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-2">
          {(() => {
            const filteredRecords = records
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .filter(record => filterByDate(record.createdAt, dateRange))
              .filter(record => filterBySearch(record, searchQuery, 'health'));

            if (filteredRecords.length === 0) {
              return (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-base">검색 결과가 없습니다</p>
                  <p className="text-sm mt-2 text-gray-400">
                    {records.length === 0 
                      ? "건강 검색을 통해 맞춤 정보를 받아보세요"
                      : "다른 검색어나 날짜를 선택해보세요"}
                  </p>
                </div>
              );
            }

            return filteredRecords.map((record, index) => {
              try {
                // 데이터 유효성 검사
                if (!record || typeof record !== 'object') {
                  console.error('잘못된 레코드 형식:', record);
                  return null;
                }

                // diseases 배열 안전하게 처리하여 모든 질병명 표시
                const title = Array.isArray(record.diseases)
                  ? record.diseases
                      .filter(d => d && typeof d === 'object' && d.diseaseName)
                      .map(d => d.diseaseName)
                      .join(', ') || record.symptoms || '기록 없음'
                  : record.symptoms || '기록 없음';
                
                return (
                  <RecordItem
                    key={record.id}
                    number={(filteredRecords.length - index).toString()}
                    date={format(new Date(record.createdAt), 'yyyy년 MM월 dd일', { locale: ko })}
                    title={title}
                    onClick={() => onDetailClick(record)}
                  />
                );
              } catch (error) {
                console.error('레코드 처리 중 오류:', error);
                return null;
              }
            }).filter(Boolean);
          })()}
        </div>
      </ScrollArea>
    </div>
  )
} 