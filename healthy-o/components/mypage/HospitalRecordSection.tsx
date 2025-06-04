"use client"

import { Building2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RecordCard } from "./RecordCard"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { useAuth } from "@/hooks/useAuth"

interface HospitalRecord {
  id: number;
  createdAt: string;
  recommendedDepartment: string;
  hospitals: Array<{
    name: string;
    specialty: string;
    distance: string;
    rating: number;
    availableTime: string;
    reservation: string;
    address: string;
    contact: string;
    hospitalUrl?: string;
    phoneNumber?: string;
  }>;
  reason: string;
  healthRecordId: number;
  healthRecord: {
    id: number;
    symptoms: string;
    diseases: Array<{
      diseaseName: string;
      description: string;
      riskLevel: string;
      mainSymptoms: string[];
      managementTips: string[];
    }>;
  };
  diagnosisResults: Array<{
    id: number;
    diseaseName: string;
    description: string;
    riskLevel: string;
    createdAt: string;
  }>;
}

interface HospitalRecordSectionProps {
  onDetailClick: (record: HospitalRecord) => void;
  onRelatedClick: (healthRecordId: number) => void;
}

export function HospitalRecordSection({
  onDetailClick,
  onRelatedClick,
}: HospitalRecordSectionProps) {
  const [records, setRecords] = useState<HospitalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        if (!token) {
          throw new Error("인증이 필요합니다.");
        }

        const response = await fetch("/api/mypage/hospital-records", {
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
          <Building2 className="w-5 h-5 text-[#0B4619]" />
          <h3 className="font-bold text-lg text-[#0B4619]">병원 추천 기록</h3>
        </div>
        <div className="text-center py-8">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg space-y-6 border border-gray-200">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#0B4619]" />
          <h3 className="font-bold text-lg text-[#0B4619]">병원 추천 기록</h3>
        </div>
        <div className="text-center py-8 text-red-500">{error}</div>
      </div>
    );
  }

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
              date={format(new Date(rec.createdAt), 'yyyy년 MM월 dd일', { locale: ko })}
              badge={{
                text: rec.recommendedDepartment,
                variant: "outline",
                className: "bg-[#0B4619]/5 text-[#0B4619] border-[#0B4619]/20"
              }}
              onDetailClick={() => onDetailClick(rec)}
              onRelatedClick={() => onRelatedClick(rec.healthRecordId)}
            >
              <div className="flex items-center">
                {rec.hospitals.slice(0, 3).map((hospital, idx) => (
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
          {records.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              병원 추천 기록이 없습니다.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
} 