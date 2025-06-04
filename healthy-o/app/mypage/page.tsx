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
import DiagnosisRecordCard from "@/components/mypage/DiagnosisRecordCard";
import { HospitalRecordCard } from "@/components/mypage/HospitalRecordCard";
import { SupplementRecordCard } from "@/components/mypage/SupplementRecordCard";
import { DiagnosisRecord, HospitalRecord, SupplementRecord } from "@/types/records";

// 임시 데이터 제거
const mockUserData: IUserProfileData = {
  id: 1,
  name: "",
  email: "",
  phone: "",
  birthDate: "",
  gender: undefined,
  marketingAgree: false,
  height: "",
  weight: "",
  medicalHistory: "없음",
  medications: "없음",
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

// 건강 검진 기록과 분석 결과를 통합
const mockHealthRecords: DiagnosisRecord[] = [
  {
    id: 1,
    diagnosisId: 1,
    createdAt: "2024-03-15",
    height: "170",
    weight: "65",
    bmi: "22.5",
    chronicDiseases: "없음",
    medications: "없음",
    smoking: "NON",
    drinking: "NON",
    exercise: "NONE",
    sleep: "GOOD",
    occupation: "회사원",
    workStyle: "DESK",
    diet: "BALANCED",
    mealRegularity: "REGULAR",
    symptoms: "두통, 어지러움",
    symptomStartDate: "2024-03-14",
    diseases: [
      {
        diseaseName: "긴장성 두통",
        description: "스트레스나 피로로 인한 근육 긴장이 원인일 수 있음",
        riskLevel: "high",
        mainSymptoms: ["두통", "어지러움", "메스꺼움", "목 뻣뻣함"],
        managementTips: [
          "충분한 수면",
          "스트레스 관리",
          "목 스트레칭",
          "규칙적인 운동"
        ]
      },
      {
        diseaseName: "빈혈",
        description: "철분 부족으로 인한 증상일 수 있음",
        riskLevel: "medium",
        mainSymptoms: ["어지러움", "피로감", "창백함"],
        managementTips: [
          "철분이 풍부한 식사",
          "비타민 C 섭취",
          "정기적인 혈액검사",
          "충분한 휴식"
        ]
      }
    ],
    recommendedDepartments: ["신경과", "내과"],
    supplements: ["비타민 B 복합체", "철분제"]
  },
  {
    id: 2,
    diagnosisId: 2,
    createdAt: "2024-03-10",
    height: "170",
    weight: "65",
    bmi: "22.5",
    chronicDiseases: "없음",
    medications: "없음",
    smoking: "NON",
    drinking: "NON",
    exercise: "NONE",
    sleep: "GOOD",
    occupation: "회사원",
    workStyle: "DESK",
    diet: "BALANCED",
    mealRegularity: "REGULAR",
    symptoms: "기침, 가래",
    symptomStartDate: "2024-03-09",
    diseases: [
      {
        diseaseName: "감기",
        description: "바이러스성 상기도 감염으로 인한 증상",
        riskLevel: "low",
        mainSymptoms: ["기침", "가래", "인후통", "코막힘"],
        managementTips: [
          "충분한 휴식",
          "수분 섭취",
          "비타민 C 보충",
          "따뜻한 차 마시기"
        ]
      }
    ],
    recommendedDepartments: ["이비인후과", "가정의학과"],
    supplements: ["비타민 C", "아연"]
  }
];

const mockHospitalRecommendations: HospitalRecord[] = [
  {
    id: 1,
    createdAt: "2024-03-15",
    recommendedDepartment: "신경과",
    hospitals: [
      {
        name: "서울대학교병원",
        specialty: "신경과",
        distance: "2.5km",
        rating: 4.8,
        availableTime: "09:00-18:00",
        reservation: "예약 가능",
        address: "서울특별시 종로구 대학로 101",
        contact: "02-2072-2114",
        hospitalUrl: "https://www.snuh.org",
        phoneNumber: "02-2072-2114"
      },
      {
        name: "세브란스병원",
        specialty: "신경과",
        distance: "3.2km",
        rating: 4.7,
        availableTime: "09:00-17:30",
        reservation: "예약 가능",
        address: "서울특별시 서대문구 연세로 50-1",
        contact: "02-2228-0114",
        hospitalUrl: "https://sev.iseverance.com",
        phoneNumber: "02-2228-0114"
      }
    ],
    reason: "두통 및 어지러움 증상에 대한 전문적인 진단 필요",
    healthRecordId: 1,
    diagnosisId: 1,
    diagnosisResults: [
      {
        id: 1,
        diseaseName: "긴장성 두통",
        description: "스트레스나 피로로 인한 근육 긴장이 원인일 수 있음",
        riskLevel: "high",
        createdAt: "2024-03-15",
        symptoms: "두통, 어지러움"
      },
      {
        id: 2,
        diseaseName: "빈혈",
        description: "철분 부족으로 인한 증상일 수 있음",
        riskLevel: "medium",
        createdAt: "2024-03-15",
        symptoms: "두통, 어지러움"
      }
    ]
  },
  {
    id: 2,
    createdAt: "2024-03-10",
    recommendedDepartment: "호흡기내과",
    hospitals: [
      {
        name: "서울아산병원",
        specialty: "호흡기내과",
        distance: "4.1km",
        rating: 4.9,
        availableTime: "09:00-17:00",
        reservation: "예약 가능",
        address: "서울특별시 송파구 올림픽로43길 88",
        contact: "02-3010-3114",
        hospitalUrl: "http://www.amc.seoul.kr",
        phoneNumber: "02-3010-3114"
      },
      {
        name: "삼성서울병원",
        specialty: "호흡기내과",
        distance: "3.8km",
        rating: 4.8,
        availableTime: "09:00-17:30",
        reservation: "예약 가능",
        address: "서울특별시 강남구 일원로 81",
        contact: "02-3410-2114",
        hospitalUrl: "https://www.samsunghospital.com",
        phoneNumber: "02-3410-2114"
      }
    ],
    reason: "지속적인 기침과 가래 증상에 대한 정확한 진단 필요",
    healthRecordId: 2,
    diagnosisId: 2,
    diagnosisResults: [
      {
        id: 3,
        diseaseName: "감기",
        description: "바이러스성 상기도 감염으로 인한 증상",
        riskLevel: "low",
        createdAt: "2024-03-10",
        symptoms: "기침, 가래"
      }
    ]
  }
];

const mockSupplementRecommendations: SupplementRecord[] = [
  {
    id: 1,
    createdAt: "2024-03-15",
    supplements: [
      {
        name: "비타민 B 복합체",
        type: "비타민",
        dosage: "1정/일",
        timing: "아침 식사 후",
        benefits: ["두통 완화", "신경 안정", "에너지 대사 개선"],
        precautions: ["공복 섭취 피하기", "과다 섭취 주의"],
        duration: "3개월"
      },
      {
        name: "마그네슘",
        type: "미네랄",
        dosage: "1정/일",
        timing: "취침 전",
        benefits: ["근육 이완", "스트레스 감소", "수면 질 개선"],
        precautions: ["신장 질환자 주의", "다른 약물과 상호작용 주의"],
        duration: "3개월"
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
    createdAt: "2024-03-10",
    supplements: [
      {
        name: "비타민 C",
        type: "비타민",
        dosage: "1000mg/일",
        timing: "식사와 함께",
        benefits: ["면역력 강화", "항산화 작용", "피로 회복"],
        precautions: ["고용량 섭취 시 위장 장애 가능", "신장 결석 주의"],
        duration: "2개월"
      },
      {
        name: "아연",
        type: "미네랄",
        dosage: "15mg/일",
        timing: "식사와 함께",
        benefits: ["면역 기능 향상", "감기 예방", "상처 치유 촉진"],
        precautions: ["구리 흡수 저해 가능", "과다 섭취 시 메스꺼움"],
        duration: "2개월"
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
  const { isLoggedIn, initialized } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<IUserProfileData>(mockUserData);
  const [diagnosisRecords, setDiagnosisRecords] = useState<DiagnosisRecord[]>([]);
  const [hospitalRecords, setHospitalRecords] = useState<HospitalRecord[]>([]);
  const [supplementRecords, setSupplementRecords] = useState<SupplementRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("info");
  const [selectedRecord, setSelectedRecord] = useState<DiagnosisRecord | null>(null);
  const [selectedHospitalRec, setSelectedHospitalRec] = useState<HospitalRecord | null>(null);
  const [selectedSupplementRec, setSelectedSupplementRec] = useState<SupplementRecord | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showHospitalDetail, setShowHospitalDetail] = useState(false);
  const [showSupplementDetail, setShowSupplementDetail] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditHealth, setShowEditHealth] = useState(false);
  const [showEditLifestyle, setShowEditLifestyle] = useState(false);

  // 인증 상태 체크
  useEffect(() => {
    if (initialized && !isLoggedIn) {
      router.push('/login');
    }
  }, [initialized, isLoggedIn, router]);

  // 사용자 데이터 로드
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!initialized || !isLoggedIn) return;

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
            // 토큰이 만료되었거나 유효하지 않은 경우
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast({
              title: "세션이 만료되었습니다",
              description: "다시 로그인해주세요.",
              variant: "destructive",
            });
            router.push('/login');
            return;
          }
          throw new Error('Failed to fetch user data');
        }

        const result = await response.json();
        if (!result.success) {
          if (result.message.includes('토큰이 만료')) {
            // 토큰 만료 메시지가 포함된 경우
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast({
              title: "세션이 만료되었습니다",
              description: "다시 로그인해주세요.",
              variant: "destructive",
            });
            router.push('/login');
            return;
          }
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
          gender: user.gender || undefined,
          marketingAgree: user.marketingAgree || false,
          height: healthInfo?.height || "",
          weight: healthInfo?.weight || "",
          medicalHistory: healthInfo?.chronicDiseases || "없음",
          medications: healthInfo?.medications || "없음",
          smoking: healthInfo?.smoking || undefined,
          drinking: healthInfo?.drinking || undefined,
          lifestyle: {
            exercise: healthInfo?.exercise || undefined,
            sleep: healthInfo?.sleep || undefined,
            occupation: healthInfo?.occupation || "",
            workStyle: healthInfo?.workStyle || undefined,
            diet: healthInfo?.diet || undefined,
            mealRegularity: healthInfo?.mealRegularity || undefined
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
          description: err instanceof Error ? err.message : "사용자 정보를 불러오는데 실패했습니다.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (initialized && isLoggedIn) {
      fetchUserData();
    }
  }, [initialized, isLoggedIn, router, toast]);

  // 진단 결과 로드
  useEffect(() => {
    const fetchDiagnosisResults = async () => {
      try {
        if (!initialized || !isLoggedIn) return;

        console.log('=== [MyPage] 진단 결과 조회 시작 ===');
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('=== [MyPage] 토큰이 없습니다! ===');
          throw new Error('인증 토큰이 없습니다.');
        }

        console.log('=== [MyPage] API 호출 시작 ===');
        const response = await fetch('/api/mypage/diagnosis', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('=== [MyPage] API 응답 상태:', response.status);
        
        if (!response.ok) {
          if (response.status === 401) {
            // 토큰이 만료되었거나 유효하지 않은 경우
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast({
              title: "세션이 만료되었습니다",
              description: "다시 로그인해주세요.",
              variant: "destructive",
            });
            router.push('/login');
            return;
          }
          const errorData = await response.json();
          console.error('=== [MyPage] API 에러 응답:', errorData);
          throw new Error(errorData.message || '진단 결과를 불러오는데 실패했습니다.');
        }
        
        const result = await response.json();
        console.log('=== [MyPage] API 응답 데이터:', result);

        if (!result.success) {
          if (result.message.includes('토큰이 만료')) {
            // 토큰 만료 메시지가 포함된 경우
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast({
              title: "세션이 만료되었습니다",
              description: "다시 로그인해주세요.",
              variant: "destructive",
            });
            router.push('/login');
            return;
          }
          throw new Error(result.message);
        }

        // 데이터 유효성 검사
        if (!Array.isArray(result.data)) {
          console.error('=== [MyPage] API 데이터가 배열이 아닙니다:', result.data);
          throw new Error('잘못된 데이터 형식입니다.');
        }

        // 데이터 형식 변환 및 유효성 검사
        const diagnosisData = result.data.map((record: any) => {
          console.log('=== [MyPage] 레코드 처리 중:', record);

          // 필수 필드 확인
          if (!record.id || !record.createdAt || !record.diseases) {
            console.error('=== [MyPage] 레코드에 필수 필드가 없습니다:', record);
            return null;
          }

          try {
            // diseases가 문자열인 경우 파싱
            const diseases = typeof record.diseases === 'string' 
              ? JSON.parse(record.diseases) 
              : record.diseases;

            // recommendedDepartments가 문자열인 경우 파싱
            const departments = typeof record.recommendedDepartments === 'string'
              ? JSON.parse(record.recommendedDepartments)
              : record.recommendedDepartments;

            // supplements가 문자열인 경우 파싱
            const supplements = typeof record.supplements === 'string'
              ? JSON.parse(record.supplements)
              : record.supplements;

            return {
              id: record.id,
              diagnosisId: record.diagnosisId,
              createdAt: new Date(record.createdAt).toISOString(),
              // 기본 정보
              height: record.height?.toString() || "",
              weight: record.weight?.toString() || "",
              bmi: record.bmi?.toString() || "",
              chronicDiseases: record.chronicDiseases || "없음",
              medications: record.medications || "없음",
              // 생활습관 정보
              smoking: record.smoking || "NON",
              drinking: record.drinking || "NON",
              exercise: record.exercise || "NONE",
              sleep: record.sleep || "",
              occupation: record.occupation || "",
              workStyle: record.workStyle || "",
              diet: record.diet || "",
              mealRegularity: record.mealRegularity || "",
              // 증상 정보
              symptoms: record.symptoms || "",
              symptomStartDate: record.symptomStartDate || "",
              // 진단 결과
              diseases: Array.isArray(diseases) ? diseases : [],
              recommendedDepartments: Array.isArray(departments) ? departments : [],
              supplements: Array.isArray(supplements) ? supplements : []
            };
          } catch (error) {
            console.error('=== [MyPage] 레코드 처리 중 에러:', error);
            return null;
          }
        }).filter(Boolean);

        console.log('=== [MyPage] 최종 처리된 데이터:', diagnosisData);
        setDiagnosisRecords(diagnosisData);
      } catch (error) {
        console.error('=== [MyPage] fetchDiagnosisResults 에러:', error);
        toast({
          title: "오류",
          description: error instanceof Error ? error.message : "진단 결과를 불러오는데 실패했습니다.",
          variant: "destructive",
        });
      }
    };

    if (initialized && isLoggedIn) {
      console.log('[MyPage] User is logged in, fetching diagnosis results...');
      fetchDiagnosisResults();
    } else {
      console.log('[MyPage] User is not logged in or not initialized');
    }
  }, [initialized, isLoggedIn, toast, router]);

  // 병원 추천 기록 로드
  useEffect(() => {
    const fetchHospitalRecords = async () => {
      try {
        if (!initialized || !isLoggedIn) return;

        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('인증 토큰이 없습니다.');
        }

        const response = await fetch('/api/mypage/hospital-records', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast({
              title: "세션이 만료되었습니다",
              description: "다시 로그인해주세요.",
              variant: "destructive",
            });
            router.push('/login');
            return;
          }
          throw new Error('병원 추천 기록을 불러오는데 실패했습니다.');
        }

        const result = await response.json();
        if (!result.success) {
          throw new Error(result.message);
        }

        setHospitalRecords(result.data);
      } catch (error) {
        console.error('Error fetching hospital records:', error);
        toast({
          title: "오류",
          description: error instanceof Error ? error.message : "병원 추천 기록을 불러오는데 실패했습니다.",
          variant: "destructive",
        });
      }
    };

    if (initialized && isLoggedIn) {
      fetchHospitalRecords();
    }
  }, [initialized, isLoggedIn, router, toast]);

  // 영양제 추천 기록 로드
  useEffect(() => {
    const fetchSupplementRecords = async () => {
      try {
        if (!initialized || !isLoggedIn) return;

        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('인증 토큰이 없습니다.');
        }

        const response = await fetch('/api/mypage/supplement-records', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast({
              title: "세션이 만료되었습니다",
              description: "다시 로그인해주세요.",
              variant: "destructive",
            });
            router.push('/login');
            return;
          }
          throw new Error('영양제 추천 기록을 불러오는데 실패했습니다.');
        }

        const result = await response.json();
        if (!result.success) {
          throw new Error(result.message);
        }

        setSupplementRecords(result.data);
      } catch (error) {
        console.error('Error fetching supplement records:', error);
        toast({
          title: "오류",
          description: error instanceof Error ? error.message : "영양제 추천 기록을 불러오는데 실패했습니다.",
          variant: "destructive",
        });
      }
    };

    if (initialized && isLoggedIn) {
      fetchSupplementRecords();
    }
  }, [initialized, isLoggedIn, router, toast]);

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
            exercise: healthInfo.exercise || undefined,
            sleep: healthInfo.sleep || undefined,
            occupation: healthInfo.occupation || "",
            workStyle: healthInfo.workStyle || undefined,
            diet: healthInfo.diet || undefined,
            mealRegularity: healthInfo.mealRegularity || undefined
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
      return item.diseases.some((disease: any) => 
        disease.diseaseName.toLowerCase().includes(query) ||
        disease.mainSymptoms.some((symptom: string) => 
          symptom.toLowerCase().includes(query)
        )
      );
    } else if (type === 'hospital') {
      return item.recommendedDepartment.toLowerCase().includes(query) ||
             item.hospitals.some((h: any) => h.name.toLowerCase().includes(query));
    } else {
      return item.supplements.some((s: any) => s.name.toLowerCase().includes(query));
    }
  };

  // 필터링된 데이터
  const filteredHealthRecords = diagnosisRecords
    .filter(record => filterByDate(record.createdAt))
    .filter(record => filterBySearch(record, 'health'))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const filteredHospitalRecs = hospitalRecords
    .filter(rec => filterByDate(rec.createdAt))
    .filter(rec => filterBySearch(rec, 'hospital'))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const filteredSupplementRecs = supplementRecords
    .filter(rec => filterByDate(rec.createdAt))
    .filter(rec => filterBySearch(rec, 'supplement'))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // 연관 기록 이동 핸들러
  const handleRelatedRecordClick = (date: string) => {
    const record = diagnosisRecords.find(r => r.createdAt === date);
    if (record) {
      const diagnosisRecord: DiagnosisRecord = {
        id: record.id,
        diagnosisId: record.diagnosisId,
        createdAt: record.createdAt,
        height: record.height,
        weight: record.weight,
        bmi: record.bmi,
        chronicDiseases: record.chronicDiseases,
        medications: record.medications,
        smoking: record.smoking,
        drinking: record.drinking,
        exercise: record.exercise,
        sleep: record.sleep,
        occupation: record.occupation,
        workStyle: record.workStyle,
        diet: record.diet,
        mealRegularity: record.mealRegularity,
        symptoms: record.symptoms,
        symptomStartDate: record.symptomStartDate,
        diseases: record.diseases,
        recommendedDepartments: record.recommendedDepartments,
        supplements: record.supplements
      };
      setSelectedRecord(diagnosisRecord);
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

              <DiagnosisRecordCard
                records={filteredHealthRecords}
                onRecordClick={(record) => {
                  const diagnosisRecord: DiagnosisRecord = {
                    id: record.id,
                    diagnosisId: record.diagnosisId,
                    createdAt: record.createdAt,
                    height: record.height,
                    weight: record.weight,
                    bmi: record.bmi,
                    chronicDiseases: record.chronicDiseases,
                    medications: record.medications,
                    smoking: record.smoking,
                    drinking: record.drinking,
                    exercise: record.exercise,
                    sleep: record.sleep,
                    occupation: record.occupation,
                    workStyle: record.workStyle,
                    diet: record.diet,
                    mealRegularity: record.mealRegularity,
                    symptoms: record.symptoms,
                    symptomStartDate: record.symptomStartDate,
                    diseases: record.diseases,
                    recommendedDepartments: record.recommendedDepartments,
                    supplements: record.supplements
                  };
                  setSelectedRecord(diagnosisRecord);
                  setShowDetail(true);
                }}
                dateRange={dateRange}
              />

              <HospitalRecordCard
                records={filteredHospitalRecs}
                onRecordClick={(record) => {
                  const hospitalRecord = mockHospitalRecommendations.find(hr => hr.id === record.id);
                  if (!hospitalRecord) return;
                  setSelectedHospitalRec(hospitalRecord);
                  setShowHospitalDetail(true);
                }}
                dateRange={dateRange}
              />

              <SupplementRecordCard
                records={filteredSupplementRecs}
                onRecordClick={(record: SupplementRecord) => {
                  setSelectedSupplementRec(record);
                  setShowSupplementDetail(true);
                }}
                dateRange={dateRange}
              />

              <HealthDetailModal
                record={selectedRecord}
                open={showDetail}
                onOpenChange={setShowDetail}
                userData={{
                  name: userData.name || '',
                  birthDate: userData.birthDate || '',
                  gender: userData.gender || '',
                }}
              />

              <HospitalDetailModal
                record={selectedHospitalRec}
                healthRecord={null}
                open={showHospitalDetail}
                onOpenChange={setShowHospitalDetail}
                diagnosisResults={selectedHospitalRec?.diagnosisResults || []}
                userData={{
                  name: userData.name || '',
                  birthDate: userData.birthDate || '',
                  gender: userData.gender || '',
                }}
                setSelectedRecord={setSelectedRecord}
                setShowDetail={setShowDetail}
              />

              <SupplementDetailModal
                record={selectedSupplementRec}
                healthRecord={selectedSupplementRec ? mockHealthRecords.find(r => r.createdAt === selectedSupplementRec.createdAt) : null}
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