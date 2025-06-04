import { Badge } from "@/components/ui/badge";
import { Building2, ArrowRight } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";

// 날짜 포맷 함수 추가
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월 ${String(date.getDate()).padStart(2, '0')}일`;
};

interface Hospital {
  name: string;
  specialty: string;
  distance: string;
  rating: number;
  availableTime: string;
  reservation: string;
  address: string;
  contact: string;
}

interface HospitalRecord {
  id: number;
  createdAt: string;
  recommendedDepartment: string;
  hospitals: Hospital[];
  reason: string;
  healthRecordId?: number;
}

interface HospitalRecordCardProps {
  records: HospitalRecord[];
  onRecordClick: (record: HospitalRecord) => void;
  onHealthRecordClick?: (healthRecordId: number) => void;
  dateRange?: DateRange;
}

export function HospitalRecordCard({ records, onRecordClick, onHealthRecordClick, dateRange }: HospitalRecordCardProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-200">
      <div className="flex items-center gap-3">
        <div className="bg-[#0B4619]/10 p-2 rounded-lg">
          <Building2 className="w-5 h-5 text-[#0B4619]" />
        </div>
        <h3 className="font-bold text-lg text-[#0B4619]">병원 추천 기록</h3>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {records.length > 0 ? (
          records.map((record, index) => (
            <div
              key={record.id}
              className="p-4 rounded-lg border bg-white hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0B4619]/5 text-[#0B4619] font-semibold">
                    {index + 1}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900">{formatDate(record.createdAt)}</p>
                      <Badge className="bg-[#0B4619]/5 text-[#0B4619] border-[#0B4619]/20">
                        {record.recommendedDepartment}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-600">{record.hospitals[0].name}</p>
                      {record.hospitals.length > 1 && (
                        <span className="text-sm text-gray-400">외 {record.hospitals.length - 1}곳</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {record.healthRecordId && onHealthRecordClick && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#0B4619] hover:text-[#0B4619] hover:bg-[#0B4619]/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (record.healthRecordId) {
                          onHealthRecordClick(record.healthRecordId);
                        }
                      }}
                    >
                      <span className="text-sm">건강 검색 기록</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#0B4619]"
                    onClick={() => onRecordClick(record)}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 text-sm">
            {dateRange?.from ? 
              `${formatDate(dateRange.from.toISOString())} - ${dateRange.to ? formatDate(dateRange.to.toISOString()) : '현재'} 기간에 건강 검색 기록이 없습니다.` : 
              '병원 추천 기록이 없습니다.'}
          </div>
        )}
      </div>
    </div>
  );
} 