"use client"

import { Pill } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { RecordCard } from "./RecordCard"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { useAuth } from "@/hooks/useAuth"

interface Supplement {
  name: string;
  type: string;
  dosage: string;
  timing: string;
  benefits: string[];
  precautions: string[];
  duration: string;
}

interface SupplementRecord {
  id: number;
  createdAt: string;
  supplements: Supplement[];
  reason: string;
  dietaryConsiderations: string[];
  healthRecordId: number;
  condition: string;
  healthRecord: {
    symptoms: {
      main: string;
    };
    analysis: {
      riskLevel: string;
      possibleConditions: Array<{
        name: string;
        probability: string;
      }>;
    };
  };
}

interface SupplementRecordSectionProps {
  onDetailClick: (record: SupplementRecord) => void;
  onRelatedClick: (healthRecordId: number) => void;
}

export function SupplementRecordSection({
  onDetailClick,
  onRelatedClick,
}: SupplementRecordSectionProps) {
  const [records, setRecords] = useState<SupplementRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        if (!token) {
          throw new Error("인증이 필요합니다.");
        }

        const response = await fetch("/api/mypage/supplement-records", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch records");
        }

        const data = await response.json();
        if (data.success) {
          setRecords(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch records");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, [token]);

  if (isLoading) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg space-y-6 border border-gray-200">
        <div className="flex items-center gap-2">
          <Pill className="w-5 h-5 text-[#0B4619]" />
          <h3 className="font-bold text-lg text-[#0B4619]">영양제 추천 기록</h3>
        </div>
        <div className="text-center py-8">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg space-y-6 border border-gray-200">
        <div className="flex items-center gap-2">
          <Pill className="w-5 h-5 text-[#0B4619]" />
          <h3 className="font-bold text-lg text-[#0B4619]">영양제 추천 기록</h3>
        </div>
        <div className="text-center py-8 text-red-500">{error}</div>
      </div>
    );
  }

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
              date={format(new Date(rec.createdAt), 'yyyy년 MM월 dd일', { locale: ko })}
              badge={{
                text: rec.condition,
                variant: "outline",
                className: "bg-[#0B4619]/5 text-[#0B4619] border-[#0B4619]/20"
              }}
              onDetailClick={() => onDetailClick(rec)}
              onRelatedClick={() => onRelatedClick(rec.healthRecordId)}
            >
              <div className="flex flex-wrap gap-2">
                {rec.supplements.slice(0, 3).map((supplement, idx) => (
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
          {records.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              영양제 추천 기록이 없습니다.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
} 