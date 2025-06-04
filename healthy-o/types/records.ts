import { DateRange } from "react-day-picker";

// 질병 정보 타입
export interface Disease {
  diseaseName: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  mainSymptoms: string[];
  managementTips: string[];
}

// 영양제 정보 타입
export interface SupplementInfo {
  supplementName: string;
  description: string;
  benefits: string[];
  matchingSymptoms: string[];
}

// 진단 결과 타입
export interface DiagnosisRecord {
  id: number;
  diagnosisId: number;
  createdAt: string;
  // 기본 정보
  height: string;
  weight: string;
  bmi: string;
  chronicDiseases: string | null;
  medications: string | null;
  // 생활습관 정보
  smoking: string;
  drinking: string;
  exercise: string;
  sleep: string;
  occupation: string | null;
  workStyle: string;
  diet: string;
  mealRegularity: string;
  // 증상 정보
  symptoms: string;
  symptomStartDate: string;
  // 진단 결과
  diseases: Disease[];
  recommendedDepartments: string[];
  supplements: SupplementInfo[];
}

// 병원 정보 타입
export interface Hospital {
  name: string;
  specialty: string;
  distance: string;
  rating: number;
  availableTime: string;
  reservation: string;
  address: string;
  contact: string;
}

// 병원 추천 기록 타입
export interface HospitalRecord {
  id: number;
  createdAt: string;
  recommendedDepartment: string;
  hospitals: Hospital[];
  reason: string;
}

// 영양제 정보 타입
export interface Supplement {
  name: string;
  type: string;
  dosage: string;
  timing: string;
  benefits: string[];
  precautions: string[];
  duration: string;
}

// 영양제 추천 기록 타입
export interface SupplementRecord {
  id: number;
  createdAt: string;
  supplements: Supplement[];
  reason: string;
  dietaryConsiderations: string[];
}

// 건강 검진 기록 타입
export interface IDiagnosisRecord {
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

// 공통 Props 타입
export interface RecordCardProps<T> {
  records: T[];
  onRecordClick: (record: T) => void;
  dateRange?: DateRange;
} 