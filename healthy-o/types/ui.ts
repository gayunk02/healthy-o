import { IHealthResult as IDatabaseHealthResult } from './health';
import { IHospital as IDatabaseHospital, ISupplement as IDatabaseSupplement } from './recommendation';
import { IDiseaseResult } from './diagnosis';
import { IDateRange } from './index';

// UI 전용 필드를 위한 타입
export type UIHospitalExtension = {
  distance?: number;
  operatingHours?: string;
};

export type UISupplementExtension = {
  dosage?: string;
  timing?: string;
  precautions?: string[];
  duration?: string;
};

// 레이아웃 관련 인터페이스
export interface IRootLayoutProps {
  children: React.ReactNode;
}

// 마이페이지 건강 기록 인터페이스
export interface IHealthRecord {
  id: number;
  date: string;
  type: string;
  basicInfo: {
    height: string;
    weight: string;
    bloodPressure: string;
    bloodSugar: string;
    bmi: string;
  };
  symptoms: {
    main: string;
    duration: string;
    painLevel: string;
    frequency: string;
    triggers: string;
    accompaniedSymptoms: string;
  };
  lifestyle: {
    sleepQuality: string;
    stressLevel: string;
    exercise: string;
    diet: string;
    smoking: string;
    drinking: string;
  };
  analysis: {
    possibleConditions: Array<{
      name: string;
      probability: string;
      description: string;
      recommendedActions: string[];
    }>;
    riskLevel: string;
    recommendedLifestyleChanges: string[];
  };
}

// 마이페이지 병원 추천 기록 인터페이스
export interface IHospitalRecord {
  id: number;
  date: string;
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
  }>;
  reason: string;
}

// UI에서 사용하는 건강 결과 인터페이스
export interface IHealthResultUI {
  name: string;
  description: string;
  mainSymptoms: string[];
  keyAdvice: string[];
  riskLevel: '낮음' | '중간' | '높음';
}

// UI에서 사용하는 병원 정보 인터페이스
export interface IHospitalUI {
  name: string;
  address: string;
  phone: string;
  category: string;
  position: {
    lat: number;
    lng: number;
  };
  department: string;
  placeId: string;
  placeUrl: string;
  distance?: number;
  operatingHours?: string;
}

// UI에서 사용하는 영양제 정보 인터페이스
export interface ISupplementUI {
  name: string;
  description: string;
  benefits: string[];
  matchingSymptoms: string[];
  dosage?: string;
  timing?: string;
  precautions?: string[];
  duration?: string;
}

// 마이페이지에서 사용하는 사용자 데이터 인터페이스
export interface IUserProfileData {
  name: string;
  email: string;
  birthDate: string;
  gender: 'M' | 'F';
  height: string;
  weight: string;
  medicalHistory: string;
  medications: string;
  smoking: string;
  drinking: string;
  lifestyle: {
    exercise: string;
    sleep: string;
    occupation: string;
    workStyle: string;
    diet: string;
    mealRegularity: string;
  };
}

// 날짜 범위 선택을 위한 인터페이스
export interface IDateRangeUI {
  from: Date | undefined;
  to: Date | undefined;
}

// 데이터베이스 타입과 UI 타입 간의 변환 함수들
export const convertToUIDisease = (dbResult: IDiseaseResult): IDiseaseResult & { riskLevelKor: string } => ({
  ...dbResult,
  riskLevelKor: convertRiskLevel(dbResult.riskLevel)
});

export const convertToUIHealthResult = (dbResult: IDatabaseHealthResult): IHealthResultUI => ({
  name: dbResult.diseaseName,
  description: dbResult.description,
  mainSymptoms: dbResult.mainSymptoms,
  keyAdvice: dbResult.managementTips,
  riskLevel: convertRiskLevel(dbResult.riskLevel)
});

export const convertToUIHospital = (dbHospital: IDatabaseHospital): IHospitalUI => ({
  name: dbHospital.hospitalName,
  position: {
    lat: dbHospital.latitude,
    lng: dbHospital.longitude
  },
  placeId: dbHospital.placeId,
  placeUrl: dbHospital.placeUrl,
  address: dbHospital.address,
  phone: dbHospital.phone,
  category: dbHospital.category,
  department: dbHospital.department
});

export const convertToUISupplement = (dbSupplement: IDatabaseSupplement): ISupplementUI => ({
  name: dbSupplement.supplementName,
  description: dbSupplement.description,
  benefits: dbSupplement.benefits,
  matchingSymptoms: dbSupplement.matchingSymptoms
});

// 헬퍼 함수
const convertRiskLevel = (dbLevel: 'low' | 'medium' | 'high'): '낮음' | '중간' | '높음' => {
  const map: Record<typeof dbLevel, '낮음' | '중간' | '높음'> = {
    low: '낮음',
    medium: '중간',
    high: '높음'
  };
  return map[dbLevel];
}; 