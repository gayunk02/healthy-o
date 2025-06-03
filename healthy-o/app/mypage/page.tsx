'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Edit2, User, Heart, Activity, Coffee, Search, Stethoscope, Building2, Pill } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { IHealthRecord, IHospitalRecord, IUserProfileData, ILifestyle } from "@/types/ui";
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

// 임시 데이터 제거
const mockUserData: IUserProfileData = {
  id: 1,
  name: "",
  email: "",
  phone: "",
  birthDate: "",
  gender: "M",
  marketingAgree: false,
  height: "0",
  weight: "0",
  medicalHistory: "없음",
  medications: "없음",
  smoking: "NON",
  drinking: "NON",
  lifestyle: {
    exercise: "NONE",
    sleep: "7_TO_8",
    occupation: "",
    workStyle: "SITTING",
    diet: "BALANCED",
    mealRegularity: "REGULAR"
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// 건강 검진 기록과 분석 결과를 통합
const mockHealthRecords = [
  {
    id: 1,
    date: "2024-03-15",
    type: "건강 검진",
    basicInfo: {
      height: "175cm",
      weight: "70kg",
      bloodPressure: "120/80mmHg",
      bloodSugar: "95mg/dL",
      bmi: "22.9"
    },
    symptoms: {
      main: "두통, 어지러움",
      duration: "3일",
      painLevel: "중간",
      frequency: "하루 3-4회",
      triggers: "스트레스, 수면 부족",
      accompaniedSymptoms: "메스꺼움, 목 뻣뻣함"
    },
    lifestyle: {
      sleepQuality: "불량",
      stressLevel: "높음",
      exercise: "주 1-2회",
      diet: "불규칙",
      smoking: "비흡연",
      drinking: "주 1-2회"
    },
    analysis: {
      possibleConditions: [
        {
          name: "긴장성 두통",
          probability: "높음",
          description: "스트레스나 피로로 인한 근육 긴장이 원인일 수 있음",
          recommendedActions: [
            "충분한 수면",
            "스트레스 관리",
            "목 스트레칭",
            "규칙적인 운동"
          ]
        },
        {
          name: "빈혈",
          probability: "중간",
          description: "철분 부족으로 인한 증상일 수 있음",
          recommendedActions: [
            "철분이 풍부한 식사",
            "비타민 C 섭취",
            "정기적인 혈액검사",
            "충분한 휴식"
          ]
        }
      ],
      riskLevel: "중간",
      recommendedLifestyleChanges: [
        "수면 시간 규칙적으로 맞추기",
        "스트레스 관리 방법 찾기",
        "균형 잡힌 식단 유지"
      ]
    }
  },
  {
    id: 2,
    date: "2024-03-10",
    type: "건강 검진",
    basicInfo: {
      height: "175cm",
      weight: "70kg",
      bloodPressure: "118/78mmHg",
      bloodSugar: "92mg/dL",
      bmi: "22.9"
    },
    symptoms: {
      main: "기침, 가래",
      duration: "1주일",
      painLevel: "경미",
      frequency: "지속적",
      triggers: "환절기, 미세먼지",
      accompaniedSymptoms: "인후통, 코막힘"
    },
    lifestyle: {
      sleepQuality: "보통",
      stressLevel: "보통",
      exercise: "주 2-3회",
      diet: "규칙적",
      smoking: "비흡연",
      drinking: "주 1-2회"
    },
    analysis: {
      possibleConditions: [
        {
          name: "감기",
          probability: "높음",
          description: "바이러스성 상기도 감염으로 인한 증상",
          recommendedActions: [
            "충분한 휴식",
            "수분 섭취",
            "비타민 C 보충",
            "따뜻한 차 마시기"
          ]
        },
        {
          name: "기관지염",
          probability: "낮음",
          description: "기도의 염증으로 인한 증상",
          recommendedActions: [
            "가습기 사용",
            "금연",
            "따뜻한 물로 목 헹구기",
            "실내 공기 관리"
          ]
        }
      ],
      riskLevel: "낮음",
      recommendedLifestyleChanges: [
        "실내 습도 관리",
        "마스크 착용",
        "충분한 수면"
      ]
    }
  }
];

const mockHospitalRecommendations = [
  {
    id: 1,
    date: "2024-03-15",
    recommendedDepartment: "신경과",
    hospitals: [
      {
        name: "서울대학교병원",
        specialty: "두통 클리닉",
        distance: "2.5km",
        rating: 4.8,
        availableTime: "09:00-17:30",
        reservation: "예약 가능",
        address: "서울특별시 종로구 대학로 101",
        contact: "02-2072-2114"
      },
      {
        name: "세브란스병원",
        specialty: "신경과 전문",
        distance: "3.2km",
        rating: 4.7,
        availableTime: "09:00-17:00",
        reservation: "예약 필요",
        address: "서울특별시 서대문구 연세로 50-1",
        contact: "02-2228-0114"
      }
    ],
    reason: "두통 및 어지러움 증상에 대한 전문적인 진단 필요"
  },
  {
    id: 2,
    date: "2024-03-10",
    recommendedDepartment: "호흡기내과",
    hospitals: [
      {
        name: "서울아산병원",
        specialty: "호흡기 질환 전문",
        distance: "4.1km",
        rating: 4.9,
        availableTime: "09:00-17:30",
        reservation: "예약 가능",
        address: "서울특별시 송파구 올림픽로43길 88",
        contact: "02-3010-3114"
      },
      {
        name: "삼성서울병원",
        specialty: "호흡기내과 전문",
        distance: "5.0km",
        rating: 4.8,
        availableTime: "09:00-17:00",
        reservation: "예약 필요",
        address: "서울특별시 강남구 일원로 81",
        contact: "02-3410-2114"
      }
    ],
    reason: "지속적인 기침과 가래 증상에 대한 정확한 진단 필요"
  }
];

const mockSupplementRecommendations = [
  {
    id: 1,
    date: "2024-03-15",
    supplements: [
      {
        name: "비타민 B",
        type: "영양제",
        dosage: "1일 1회",
        timing: "아침 식후",
        benefits: [
          "두통 완화",
          "신경 안정",
          "에너지 대사 개선"
        ],
        precautions: [
          "공복 섭취 피하기",
          "과다 섭취 주의"
        ],
        duration: "1개월"
      },
      {
        name: "마그네슘",
        type: "미네랄",
        dosage: "1일 1회",
        timing: "저녁 식후",
        benefits: [
          "근육 이완",
          "스트레스 감소",
          "수면 질 개선"
        ],
        precautions: [
          "칼슘과 함께 섭취 피하기",
          "신장 질환자 주의"
        ],
        duration: "2개월"
      }
    ],
    reason: "두통 완화, 스트레스 관리",
    dietaryConsiderations: [
      "카페인 섭취 제한",
      "충분한 수분 섭취",
      "규칙적인 식사"
    ]
  },
  {
    id: 2,
    date: "2024-03-10",
    supplements: [
      {
        name: "비타민 C",
        type: "영양제",
        dosage: "1일 2회",
        timing: "아침, 저녁 식후",
        benefits: [
          "면역력 강화",
          "항산화 작용",
          "피로 회복"
        ],
        precautions: [
          "위산 과다 주의",
          "저녁 섭취 시 수면 방해 가능"
        ],
        duration: "2주"
      },
      {
        name: "아연",
        type: "미네랄",
        dosage: "1일 1회",
        timing: "아침 식후",
        benefits: [
          "면역 기능 향상",
          "감기 예방",
          "상처 치유 촉진"
        ],
        precautions: [
          "공복 섭취 피하기",
          "구리 흡수 저해 가능"
        ],
        duration: "1개월"
      }
    ],
    reason: "면역력 강화",
    dietaryConsiderations: [
      "단백질 섭취 증가",
      "과일, 채소 섭취 증가",
      "가공식품 제한"
    ]
  }
];

export default function MyPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<IUserProfileData>(mockUserData);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("info");
  const [selectedRecord, setSelectedRecord] = useState<(typeof mockHealthRecords)[0] | null>(null);
  const [selectedHospitalRec, setSelectedHospitalRec] = useState<(typeof mockHospitalRecommendations)[0] | null>(null);
  const [selectedSupplementRec, setSelectedSupplementRec] = useState<(typeof mockSupplementRecommendations)[0] | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showHospitalDetail, setShowHospitalDetail] = useState(false);
  const [showSupplementDetail, setShowSupplementDetail] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditHealth, setShowEditHealth] = useState(false);
  const [showEditLifestyle, setShowEditLifestyle] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch('/api/mypage', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            router.push('/login');
            return;
          }
          throw new Error('Failed to fetch user data');
        }

        const result = await response.json();
        if (!result.success) {
          throw new Error(result.message);
        }

        // 사용자 정보와 건강 정보를 통합하여 상태 업데이트
        const { user, healthInfo } = result.data;
        
        setUserData({
          id: user.id,
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          birthDate: user.birthDate || "",
          gender: user.gender || "M",
          marketingAgree: user.marketingAgree || false,
          height: healthInfo?.height || "",
          weight: healthInfo?.weight || "",
          medicalHistory: healthInfo?.chronicDiseases || "없음",
          medications: healthInfo?.medications || "없음",
          smoking: healthInfo?.smoking || "NON",
          drinking: healthInfo?.drinking || "NON",
          lifestyle: {
            exercise: healthInfo?.exercise || "NONE",
            sleep: healthInfo?.sleep || "7_TO_8",
            occupation: healthInfo?.occupation || "",
            workStyle: healthInfo?.workStyle || "SITTING",
            diet: healthInfo?.diet || "BALANCED",
            mealRegularity: healthInfo?.mealRegularity || "REGULAR"
          },
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        });

        console.log('Loaded user data:', { user, healthInfo }); // 디버깅용 로그
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('사용자 정보를 불러오는데 실패했습니다.');
        toast({
          title: "오류",
          description: "사용자 정보를 불러오는데 실패했습니다.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchUserData();
    } else {
      router.push('/login');
    }
  }, [isLoggedIn, router, toast]);

  // 프로필 수정 핸들러
  const handleProfileUpdate = async (updatedData: Partial<IUserProfileData>) => {
    try {
      console.log('Updating profile with data:', updatedData); // 디버깅 로그

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('인증 토큰이 없습니다.');
      }

      // 데이터 구조 변환
      const requestData: any = {};
      
      // 기본 정보
      if (updatedData.name !== undefined) requestData.name = updatedData.name;
      if (updatedData.email !== undefined) requestData.email = updatedData.email;
      if (updatedData.phone !== undefined) requestData.phone = updatedData.phone;
      if (updatedData.birthDate !== undefined) requestData.birthDate = updatedData.birthDate;
      if (updatedData.gender !== undefined) requestData.gender = updatedData.gender;
      if (updatedData.marketingAgree !== undefined) requestData.marketingAgree = updatedData.marketingAgree;

      // 건강 정보
      if (updatedData.height !== undefined) requestData.height = updatedData.height;
      if (updatedData.weight !== undefined) requestData.weight = updatedData.weight;
      if (updatedData.medicalHistory !== undefined) requestData.medicalHistory = updatedData.medicalHistory;
      if (updatedData.medications !== undefined) requestData.medications = updatedData.medications;
      if (updatedData.smoking !== undefined) requestData.smoking = updatedData.smoking;
      if (updatedData.drinking !== undefined) requestData.drinking = updatedData.drinking;

      // 생활습관 정보
      if (updatedData.lifestyle) {
        requestData.lifestyle = {
          exercise: updatedData.lifestyle.exercise,
          sleep: updatedData.lifestyle.sleep,
          occupation: updatedData.lifestyle.occupation,
          workStyle: updatedData.lifestyle.workStyle,
          diet: updatedData.lifestyle.diet,
          mealRegularity: updatedData.lifestyle.mealRegularity
        };
      }

      console.log('Sending request with data:', requestData); // 디버깅 로그

      const response = await fetch('/api/mypage', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '서버 응답이 실패했습니다.');
      }

      const result = await response.json();
      console.log('Received response:', result); // 디버깅 로그

      if (!result.success) {
        throw new Error(result.message);
      }

      // 상태 업데이트
      const { user, healthInfo } = result.data;
      setUserData(prev => ({
        ...prev,
        ...user,
        ...(healthInfo && {
          height: healthInfo.height?.toString(),
          weight: healthInfo.weight?.toString(),
          medicalHistory: healthInfo.chronicDiseases,
          medications: healthInfo.medications,
          smoking: healthInfo.smoking,
          drinking: healthInfo.drinking,
          lifestyle: {
            exercise: healthInfo.exercise || "NONE",
            sleep: healthInfo.sleep || "7_TO_8",
            occupation: healthInfo.occupation || "",
            workStyle: healthInfo.workStyle || "SITTING",
            diet: healthInfo.diet || "BALANCED",
            mealRegularity: healthInfo.mealRegularity || "REGULAR"
          }
        })
      }));

      toast({
        title: "정보가 수정되었습니다.",
        description: "변경사항이 성공적으로 저장되었습니다.",
      });
    } catch (err) {
      console.error('Error updating profile:', err);
      toast({
        variant: "destructive",
        title: "오류가 발생했습니다.",
        description: err instanceof Error ? err.message : "정보 수정에 실패했습니다. 다시 시도해주세요.",
      });
      throw err;
    }
  };

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

  // 날짜 필터링 함수
  const filterByDate = (date: string) => {
    if (!dateRange?.from || !dateRange?.to) return true;
    const recordDate = new Date(date);
    return recordDate >= dateRange.from && recordDate <= dateRange.to;
  };

  // 검색 필터링 함수
  const filterBySearch = (item: any, type: 'health' | 'hospital' | 'supplement') => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    
    if (type === 'health') {
      return item.symptoms.main.toLowerCase().includes(query) ||
             item.analysis.possibleConditions.some((c: any) => c.name.toLowerCase().includes(query));
    } else if (type === 'hospital') {
      return item.recommendedDepartment.toLowerCase().includes(query) ||
             item.hospitals.some((h: any) => h.name.toLowerCase().includes(query));
    } else {
      return item.supplements.some((s: any) => s.name.toLowerCase().includes(query));
    }
  };

  // 필터링된 데이터
  const filteredHealthRecords = mockHealthRecords
    .filter(record => filterByDate(record.date))
    .filter(record => filterBySearch(record, 'health'))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredHospitalRecs = mockHospitalRecommendations
    .filter(rec => filterByDate(rec.date))
    .filter(rec => filterBySearch(rec, 'hospital'))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredSupplementRecs = mockSupplementRecommendations
    .filter(rec => filterByDate(rec.date))
    .filter(rec => filterBySearch(rec, 'supplement'))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // 연관 기록 이동 핸들러
  const handleRelatedRecordClick = (date: string) => {
    const record = mockHealthRecords.find(r => r.date === date);
    if (record) {
      setSelectedRecord(record);
      setShowDetail(true);
    }
  };

  // lifestyle 관련 헬퍼 함수
  const getLifestyleValue = (key: keyof ILifestyle): string => {
    return userData.lifestyle?.[key] ?? "";
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

  return (
    <div className="w-full pt-[100px] pb-20">
      <Card className="w-full max-w-[800px] mx-auto shadow-lg">
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
            <TabsList className="grid grid-cols-2 w-full mb-8">
              <TabsTrigger value="info">내 정보</TabsTrigger>
              <TabsTrigger value="history">건강 기록</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-6">
              <div className="space-y-6">
                <BasicInfoCard
                  userData={userData}
                  onEdit={() => setShowEditProfile(true)}
                />
                <HealthInfoCard
                  userData={userData}
                  onEdit={() => setShowEditHealth(true)}
                />
                <LifestyleInfoCard
                  userData={userData}
                  onEdit={() => setShowEditLifestyle(true)}
                />
              </div>

              <EditProfileModal
                open={showEditProfile}
                onOpenChange={setShowEditProfile}
                userData={{
                  name: userData?.name,
                  email: userData?.email,
                  phone: userData?.phone,
                  birthDate: userData?.birthDate,
                  gender: userData?.gender,
                  marketingAgree: userData?.marketingAgree,
                }}
                onSubmit={handleProfileUpdate}
              />

              <EditHealthModal
                open={showEditHealth}
                onOpenChange={setShowEditHealth}
                userData={{
                  height: userData.height,
                  weight: userData.weight,
                  medicalHistory: userData.medicalHistory,
                  medications: userData.medications,
                  smoking: userData.smoking,
                  drinking: userData.drinking,
                }}
                onSubmit={handleProfileUpdate}
              />

              <EditLifestyleModal
                open={showEditLifestyle}
                onOpenChange={setShowEditLifestyle}
                userData={{
                  lifestyle: {
                    exercise: userData.lifestyle?.exercise || undefined,
                    sleep: userData.lifestyle?.sleep || undefined,
                    occupation: userData.lifestyle?.occupation || "",
                    workStyle: userData.lifestyle?.workStyle || undefined,
                    diet: userData.lifestyle?.diet || undefined,
                    mealRegularity: userData.lifestyle?.mealRegularity || undefined
                  }
                }}
                onSubmit={handleProfileUpdate}
              />
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-[#0B4619]/10 p-2 rounded-lg">
                    <Search className="w-5 h-5 text-[#0B4619]" />
                  </div>
                  <h3 className="font-bold text-lg text-[#0B4619]">검색 필터</h3>
                </div>
                <FilterSection
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-[#0B4619]/10 p-2 rounded-lg">
                    <Stethoscope className="w-5 h-5 text-[#0B4619]" />
                  </div>
                  <h3 className="font-bold text-lg text-[#0B4619]">건강 검색 결과 기록</h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {filteredHealthRecords.length > 0 ? (
                    filteredHealthRecords.map((record, index) => (
                      <div
                        key={record.id}
                        className="p-4 rounded-lg border bg-white hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => {
                          setSelectedRecord(record);
                          setShowDetail(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0B4619]/5 text-[#0B4619] font-semibold">
                              {index + 1}
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-gray-900">{record.date}</p>
                                <Badge className="bg-[#0B4619]/5 text-[#0B4619] border-[#0B4619]/20">
                                  {record.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">{record.symptoms.main}</p>
                            </div>
                          </div>
                          <div className="text-[#0B4619]">→</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 text-sm">
                      {dateRange?.from ? 
                        `${dateRange.from.toLocaleDateString()} - ${dateRange.to ? dateRange.to.toLocaleDateString() : '현재'} 기간에 기록된 건강 검진이 없습니다.` : 
                        '기록된 건강 검진이 없습니다.'}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-[#0B4619]/10 p-2 rounded-lg">
                    <Building2 className="w-5 h-5 text-[#0B4619]" />
                  </div>
                  <h3 className="font-bold text-lg text-[#0B4619]">병원 추천 기록</h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {filteredHospitalRecs.length > 0 ? (
                    filteredHospitalRecs.map((record, index) => (
                      <div
                        key={record.id}
                        className="p-4 rounded-lg border bg-white hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => {
                          setSelectedHospitalRec(record);
                          setShowHospitalDetail(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0B4619]/5 text-[#0B4619] font-semibold">
                              {index + 1}
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-gray-900">{record.date}</p>
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
                          <div className="text-[#0B4619]">→</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 text-sm">
                      {dateRange?.from ? 
                        `${dateRange.from.toLocaleDateString()} - ${dateRange.to ? dateRange.to.toLocaleDateString() : '현재'} 기간에 추천된 병원이 없습니다.` : 
                        '추천된 병원이 없습니다.'}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-[#0B4619]/10 p-2 rounded-lg">
                    <Pill className="w-5 h-5 text-[#0B4619]" />
                  </div>
                  <h3 className="font-bold text-lg text-[#0B4619]">영양제 추천 기록</h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {filteredSupplementRecs.length > 0 ? (
                    filteredSupplementRecs.map((record, index) => (
                      <div
                        key={record.id}
                        className="p-4 rounded-lg border bg-white hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => {
                          setSelectedSupplementRec(record);
                          setShowSupplementDetail(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0B4619]/5 text-[#0B4619] font-semibold">
                              {index + 1}
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-gray-900">{record.date}</p>
                                <Badge className="bg-[#0B4619]/5 text-[#0B4619] border-[#0B4619]/20">
                                  {record.reason}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm text-gray-600">{record.supplements[0].name}</p>
                                {record.supplements.length > 1 && (
                                  <span className="text-sm text-gray-400">외 {record.supplements.length - 1}개</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-[#0B4619]">→</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 text-sm">
                      {dateRange?.from ? 
                        `${dateRange.from.toLocaleDateString()} - ${dateRange.to ? dateRange.to.toLocaleDateString() : '현재'} 기간에 추천된 영양제가 없습니다.` : 
                        '추천된 영양제가 없습니다.'}
                    </div>
                  )}
                </div>
              </div>

              <HealthDetailModal
                record={selectedRecord}
                open={showDetail}
                onOpenChange={setShowDetail}
              />

              <HospitalDetailModal
                record={selectedHospitalRec}
                healthRecord={selectedHospitalRec ? mockHealthRecords.find(r => r.date === selectedHospitalRec.date) : null}
                open={showHospitalDetail}
                onOpenChange={setShowHospitalDetail}
              />

              <SupplementDetailModal
                record={selectedSupplementRec}
                healthRecord={selectedSupplementRec ? mockHealthRecords.find(r => r.date === selectedSupplementRec.date) : null}
                open={showSupplementDetail}
                onOpenChange={setShowSupplementDetail}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 