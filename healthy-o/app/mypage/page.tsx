'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Edit2, Activity, Coffee, Search, Stethoscope, Building2, Pill } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { IUserProfileData, ILifestyle } from "@/types/ui";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import {
  GENDER_OPTIONS,
  SMOKING_OPTIONS,
  DRINKING_OPTIONS,
  EXERCISE_OPTIONS,
  SLEEP_OPTIONS,
  WORK_STYLE_OPTIONS,
  DIET_OPTIONS,
  MEAL_REGULARITY_OPTIONS
} from "@/lib/constants";

import { FilterSection } from "@/components/mypage/FilterSection";
import { HealthRecordSection } from "@/components/mypage/HealthRecordSection";
import { HospitalRecordSection } from "@/components/mypage/HospitalRecordSection";
import { SupplementRecordSection } from "@/components/mypage/SupplementRecordSection";
import { HealthDetailModal } from "@/components/mypage/modals/HealthDetailModal";
import { HospitalDetailModal } from "@/components/mypage/modals/HospitalDetailModal";
import { SupplementDetailModal } from "@/components/mypage/modals/SupplementDetailModal";
import { EditProfileModal } from "@/components/mypage/modals/EditProfileModal";
import { EditHealthModal } from "@/components/mypage/modals/EditHealthModal";
import { EditLifestyleModal } from "@/components/mypage/modals/EditLifestyleModal";
import { BasicInfoCard } from "@/components/mypage/BasicInfoCard";
import { HealthInfoCard } from "@/components/mypage/HealthInfoCard";
import { LifestyleInfoCard } from "@/components/mypage/LifestyleInfoCard";
import { DiagnosisRecord, HospitalRecord, SupplementRecord } from "@/types/records";

import { useUserData } from "@/hooks/mypage/useUserData";
import { useDiagnosisRecords } from "@/hooks/mypage/useDiagnosisRecords";
import { useHospitalRecords } from "@/hooks/mypage/useHospitalRecords";
import { useSupplementRecords } from "@/hooks/mypage/useSupplementRecords";
import { filterByDate, filterBySearch } from "@/utils/filters";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

// 기본 사용자 데이터 타입
const defaultUserData: IUserProfileData = {
  id: 0,
  name: "",
  email: "",
  phone: "",
  birthDate: "",
  gender: undefined,
  marketingAgree: false,
  height: "",
  weight: "",
  medicalHistory: "",
  medications: "",
  smoking: undefined,
  drinking: undefined,
  lifestyle: {
    exercise: undefined,
    sleep: undefined,
    occupation: "",
    workStyle: undefined,
    diet: undefined,
    mealRegularity: undefined
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export default function MyPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoggedIn, initialized, token } = useAuth();
  const { userData, loading: userLoading, error, updateUserData} = useUserData();
  const { records: diagnosisRecords, loading: diagnosisLoading, refresh: refreshDiagnosis, error: diagnosisError } = useDiagnosisRecords();
  const { records: hospitalRecords, loading: hospitalLoading, refresh: refreshHospital, error: hospitalError } = useHospitalRecords();
  const { records: supplementRecords, loading: supplementLoading, refresh: refreshSupplement, error: supplementError } = useSupplementRecords();

  const [activeTab, setActiveTab] = useState("info");
  const [selectedRecord, setSelectedRecord] = useState<DiagnosisRecord | null>(null);
  const [selectedHospitalRec, setSelectedHospitalRec] = useState<HospitalRecord | null>(null);
  const [selectedSupplementRec, setSelectedSupplementRec] = useState<{
    id: number;
    userId: number;
    diagnosisId: number;
    supplements: Array<{
      supplementName: string;
      description: string;
      benefits: string[];
      matchingSymptoms: string[];
    }>;
    recommendedAt: string;
  } | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showHospitalDetail, setShowHospitalDetail] = useState(false);
  const [showSupplementDetail, setShowSupplementDetail] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditHealth, setShowEditHealth] = useState(false);
  const [showEditLifestyle, setShowEditLifestyle] = useState(false);

  // 페이지 진입시 모든 데이터 새로고침
  useEffect(() => {
    if (isLoggedIn && initialized) {
      refreshDiagnosis();
      refreshHospital();
      refreshSupplement();
    }
  }, [isLoggedIn, initialized]);

  // 인증 상태 체크
  if (!initialized) {
    return null;
  }

  if (!isLoggedIn) {
    router.push('/login');
    return null;
  }

  const loading = userLoading || diagnosisLoading || hospitalLoading || supplementLoading;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B4619] mx-auto"></div>
          <p className="text-[#0B4619] font-medium">정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <p className="text-red-500 font-medium">{error}</p>
          <Button onClick={() => router.push('/login')}>
            다시 로그인하기
          </Button>
        </div>
      </div>
    );
  }

  // 필터링된 데이터
  const filteredHealthRecords = diagnosisRecords
    .filter(record => filterByDate(record.createdAt, dateRange))
    .filter(record => filterBySearch(record, searchQuery, 'health'))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const filteredHospitalRecs = hospitalRecords
    .filter(rec => filterByDate(rec.createdAt, dateRange))
    .filter(rec => filterBySearch(rec, searchQuery, 'hospital'))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const filteredSupplementRecs = supplementRecords
    .filter(rec => filterByDate(rec.recommendedAt, dateRange))
    .filter(rec => filterBySearch(rec, searchQuery, 'supplement'))
    .sort((a, b) => new Date(b.recommendedAt).getTime() - new Date(a.recommendedAt).getTime());

  // 연관 기록 이동 핸들러
  const handleRelatedRecordClick = (healthRecordId: number) => {
    const record = diagnosisRecords.find(r => r.id === healthRecordId);
    if (record) {
      setSelectedRecord(record);
      setShowDetail(true);
    }
  };

  // lifestyle 관련 헬퍼 함수
  const getLifestyleValue = (key: keyof ILifestyle): string => {
    return userData?.lifestyle?.[key] ?? "";
  };

  // 헬퍼 함수들
  const formatBirthDate = (birthDate: string): string => {
    if (!birthDate) return '정보 없음';
    try {
      const date = new Date(birthDate);
      if (isNaN(date.getTime())) {
        return '정보 없음';
      }
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}년 ${month}월 ${day}일`;
    } catch (error) {
      console.error('생년월일 변환 중 오류 발생:', error);
      return '정보 없음';
    }
  };

  const formatValue = (value: string | null | undefined, unit: string = ''): string => {
    if (!value || value.trim() === '') return '정보 없음';
    return `${value}${unit}`;
  };

  const getGenderText = (value: string | null | undefined): string => {
    if (!value) return '정보 없음';
    return GENDER_OPTIONS[value as keyof typeof GENDER_OPTIONS] || '정보 없음';
  };

  const getSmokingText = (value: string | null | undefined): string => {
    if (!value) return '정보 없음';
    return SMOKING_OPTIONS[value as keyof typeof SMOKING_OPTIONS] || '정보 없음';
  };

  const getDrinkingText = (value: string | null | undefined): string => {
    if (!value) return '정보 없음';
    return DRINKING_OPTIONS[value as keyof typeof DRINKING_OPTIONS] || '정보 없음';
  };

  const getExerciseText = (value: string | null | undefined): string => {
    if (!value) return '정보 없음';
    return EXERCISE_OPTIONS[value as keyof typeof EXERCISE_OPTIONS] || '정보 없음';
  };

  const getSleepText = (value: string | null | undefined): string => {
    if (!value) return '정보 없음';
    return SLEEP_OPTIONS[value as keyof typeof SLEEP_OPTIONS] || '정보 없음';
  };

  const getWorkStyleText = (value: string | null | undefined): string => {
    if (!value) return '정보 없음';
    return WORK_STYLE_OPTIONS[value as keyof typeof WORK_STYLE_OPTIONS] || '정보 없음';
  };

  const getDietText = (value: string | null | undefined): string => {
    if (!value) return '정보 없음';
    return DIET_OPTIONS[value as keyof typeof DIET_OPTIONS] || '정보 없음';
  };

  const getMealRegularityText = (value: string | null | undefined): string => {
    if (!value) return '정보 없음';
    return MEAL_REGULARITY_OPTIONS[value as keyof typeof MEAL_REGULARITY_OPTIONS] || '정보 없음';
  };

  // 기본 사용자 데이터 설정
  const safeUserData: IUserProfileData = {
    ...defaultUserData,
    ...userData
  };

  const fetchDiagnosisRecords = async () => {
    try {
      const response = await fetch('/api/mypage/diagnosis', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('진단 기록을 가져오는데 실패했습니다.');
      }

      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        router.refresh();
      }
    } catch (error) {
      console.error('진단 기록 조회 중 오류 발생:', error);
      toast({
        title: "오류",
        description: "진단 기록을 가져오는데 실패했습니다.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="w-full pt-[100px] pb-20">
      <Card className="w-full max-w-[800px] mx-auto bg-white">
        <CardHeader className="space-y-3 pb-8">
          <CardTitle className="text-3xl font-bold text-center text-[#0B4619]">
            👤 마이페이지
          </CardTitle>
          <CardDescription className="text-center text-base">
            내 정보와 건강 기록을 관리할 수 있습니다
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger 
                value="info"
                className="data-[state=active]:bg-[#0B4619]/10"
              >
                내 정보
              </TabsTrigger>
              <TabsTrigger 
                value="history"
                className="data-[state=active]:bg-[#0B4619]/10"
              >
                건강 기록
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-6">
              <div className="space-y-6">
                <BasicInfoCard
                  userData={safeUserData}
                  onEdit={() => setShowEditProfile(true)}
                />
                <HealthInfoCard
                  userData={safeUserData}
                  onEdit={() => setShowEditHealth(true)}
                />
                <LifestyleInfoCard
                  userData={safeUserData}
                  onEdit={() => setShowEditLifestyle(true)}
                />
              </div>

              <EditProfileModal
                open={showEditProfile}
                onOpenChange={setShowEditProfile}
                userData={{
                  name: safeUserData.name,
                  email: safeUserData.email,
                  phone: safeUserData.phone,
                  birthDate: safeUserData.birthDate,
                  gender: safeUserData.gender,
                  marketingAgree: safeUserData.marketingAgree,
                }}
                onSubmit={updateUserData}
              />

              <EditHealthModal
                open={showEditHealth}
                onOpenChange={setShowEditHealth}
                userData={{
                  height: safeUserData.height,
                  weight: safeUserData.weight,
                  medicalHistory: safeUserData.medicalHistory,
                  medications: safeUserData.medications,
                  smoking: safeUserData.smoking,
                  drinking: safeUserData.drinking,
                }}
                onSubmit={updateUserData}
              />

              <EditLifestyleModal
                open={showEditLifestyle}
                onOpenChange={setShowEditLifestyle}
                userData={{
                  lifestyle: {
                    exercise: safeUserData.lifestyle?.exercise,
                    sleep: safeUserData.lifestyle?.sleep,
                    occupation: safeUserData.lifestyle?.occupation || "",
                    workStyle: safeUserData.lifestyle?.workStyle,
                    diet: safeUserData.lifestyle?.diet,
                    mealRegularity: safeUserData.lifestyle?.mealRegularity
                  }
                }}
                onSubmit={updateUserData}
              />
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <FilterSection
                dateRange={dateRange}
                setDateRange={setDateRange}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onRefresh={async () => {
                  try {
                    await Promise.all([
                      refreshDiagnosis(),
                      refreshHospital(),
                      refreshSupplement()
                    ]);
                  } catch (error) {
                    console.error('데이터 새로고침 중 오류 발생:', error);
                    toast({
                      title: "새로고침 실패",
                      description: "데이터를 새로고침하는 중 오류가 발생했습니다.",
                      variant: "destructive",
                    });
                  }
                }}
              />

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <HealthRecordSection
                    onDetailClick={(record) => {
                      setSelectedRecord(record);
                      setShowDetail(true);
                    }}
                    dateRange={dateRange}
                    searchQuery={searchQuery}
                    records={diagnosisRecords}
                    isLoading={diagnosisLoading}
                    error={diagnosisError}
                  />
                  <HospitalRecordSection
                    onDetailClick={(record) => {
                      setSelectedHospitalRec(record);
                      setShowHospitalDetail(true);
                    }}
                    onRelatedClick={handleRelatedRecordClick}
                    dateRange={dateRange}
                    searchQuery={searchQuery}
                    records={hospitalRecords}
                    isLoading={hospitalLoading}
                    error={hospitalError}
                  />
                  <SupplementRecordSection
                    onDetailClick={(record) => {
                      console.log('Selected supplement record:', record);
                      setSelectedSupplementRec(record);
                      const diagRecord = diagnosisRecords.find(r => r.diagnosisId === record.diagnosisId || r.id === record.diagnosisId);
                      console.log('Found diagnosis record:', diagRecord);
                      setShowSupplementDetail(true);
                    }}
                    onRelatedClick={handleRelatedRecordClick}
                    diagnosisRecords={diagnosisRecords}
                    dateRange={dateRange}
                    searchQuery={searchQuery}
                    records={supplementRecords}
                    isLoading={supplementLoading}
                    error={supplementError}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <HealthDetailModal
        open={showDetail}
        onOpenChange={setShowDetail}
        record={selectedRecord}
      />

      <HospitalDetailModal
        open={showHospitalDetail}
        onOpenChange={setShowHospitalDetail}
        record={selectedHospitalRec}
        healthRecord={diagnosisRecords.find(r => r.id === selectedHospitalRec?.healthRecordId) || null}
        diagnosisResults={selectedHospitalRec?.diagnosisResults || []}
        userData={{
          name: safeUserData.name || "",
          birthDate: safeUserData.birthDate || "",
          gender: safeUserData.gender || "",
        }}
        setSelectedRecord={setSelectedRecord}
        setShowDetail={setShowDetail}
        diagnosis={diagnosisRecords.find(r => r.id === selectedHospitalRec?.diagnosisId) || null}
        diagnosisRecord={diagnosisRecords.find(r => r.id === selectedHospitalRec?.diagnosisId) || null}
      />

      <SupplementDetailModal
        open={showSupplementDetail}
        onOpenChange={setShowSupplementDetail}
        record={selectedSupplementRec}
        setSelectedRecord={setSelectedRecord}
        setShowDetail={setShowDetail}
        diagnosis={diagnosisRecords.find(r => r.diagnosisId === selectedSupplementRec?.diagnosisId || r.id === selectedSupplementRec?.diagnosisId) || null}
        diagnosisRecord={diagnosisRecords.find(r => r.diagnosisId === selectedSupplementRec?.diagnosisId || r.id === selectedSupplementRec?.diagnosisId) || null}
      />
    </div>
  );
} 