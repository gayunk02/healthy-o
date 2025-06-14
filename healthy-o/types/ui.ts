import { IHealthResult as IDatabaseHealthResult } from './health';
import { IHospital as IDatabaseHospital, ISupplement as IDatabaseSupplement } from './recommendation';
import { IDiseaseResult } from './diagnosis';
import { IDateRange } from './index';
import { Gender, SmokingStatus, DrinkingStatus, ExerciseStatus, WorkStyle, DietType, MealRegularity } from './health';

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
    name: string;
    age: number;
    gender: Gender;
    height: string;
    weight: string;
    bmi: string;
  };
  lifestyle: {
    sleep: string;
    exercise: ExerciseStatus;
    diet: DietType;
    smoking: SmokingStatus;
    drinking: DrinkingStatus;
    occupation: string;
    workStyle: WorkStyle;
    mealRegularity: MealRegularity;
  };
  medicalInfo: {
    chronicDiseases?: string;
    medications?: string;
  };
}

// 마이페이지 병원 추천 기록 인터페이스
export interface IHospitalRecord {
  id: number;
  date: string;
  recommendedDepartment: string;
  hospitals: Array<IDatabaseHospital>;
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
export interface IHospitalUI extends IDatabaseHospital {
  hospitalName: string;
  latitude: number;
  longitude: number;
  operatingHours?: string;
  distance?: number;
  specialties?: string[];
}

// UI에서 사용하는 영양제 정보 인터페이스
export interface ISupplementUI {
  supplementName: string;
  description: string;
  benefits: string[];
  matchingSymptoms: string[];
}

export interface ILifestyle {
  exercise?: "NONE" | "LIGHT" | "MODERATE" | "HEAVY";
  sleep?: "LESS_5" | "5_TO_6" | "6_TO_7" | "7_TO_8" | "MORE_8";
  occupation?: string;
  workStyle?: "SITTING" | "STANDING" | "ACTIVE" | "MIXED";
  diet?: "BALANCED" | "MEAT" | "FISH" | "VEGGIE" | "INSTANT";
  mealRegularity?: "REGULAR" | "MOSTLY" | "IRREGULAR" | "VERY_IRREGULAR";
}

// 마이페이지에서 사용하는 사용자 데이터 인터페이스
export interface IUserProfileData {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  gender?: "M" | "F";
  marketingAgree?: boolean;
  height?: string;
  weight?: string;
  medicalHistory?: string;
  medications?: string;
  smoking?: "NON" | "ACTIVE" | "QUIT";
  drinking?: "NON" | "LIGHT" | "MODERATE" | "HEAVY";
  lifestyle?: ILifestyle;
  createdAt?: string;
  updatedAt?: string;
}

// 날짜 범위 선택을 위한 인터페이스
export interface IDateRangeUI extends IDateRange {}

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
  ...dbHospital,
  specialties: [dbHospital.department]
});

export const convertToUISupplement = (dbSupplement: IDatabaseSupplement): ISupplementUI => ({
  supplementName: dbSupplement.supplementName,
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

export interface IHealthResult {
  diseaseName: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  mainSymptoms: string[];
  managementTips: string[];
}

export interface ISupplementRecommendation {
  supplementName: string;
  description: string;
  benefits: string[];
  matchingSymptoms: string[];
}

export interface IHealthDiagnosisResultUI {
  results: IHealthResult[];
  recommendedDepartments: string[];
  supplement_recommendations: ISupplementRecommendation[];
  disclaimer: string;
} 