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
  height: string;
  weight: string;
  bmi: string;
  chronicDiseases: string;
  medications: string;
  smoking: "NON" | "LIGHT" | "HEAVY";
  drinking: "NON" | "LIGHT" | "HEAVY";
  exercise: "NONE" | "LIGHT" | "MODERATE" | "HEAVY";
  sleep: string;
  occupation: string;
  workStyle: string;
  diet: string;
  mealRegularity: string;
  symptoms: string;
  symptomStartDate: string;
  diseases: Array<{
    diseaseName: string;
    description: string;
    riskLevel: "high" | "medium" | "low";
    mainSymptoms: string[];
    managementTips: string[];
  }>;
  recommendedDepartments: string[];
  supplements: string[];
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
  hospitals: Array<{
    name: string;
    specialty: string;
    distance: string;
    rating: number;
    availableTime: string;
    reservation: string;
    address: string;
    contact: string;
    hospitalUrl: string;
    phoneNumber: string;
  }>;
  reason: string;
  healthRecordId: number;
  diagnosisId: number;
  diagnosisResults: Array<{
    id: number;
    diseaseName: string;
    description: string;
    riskLevel: "high" | "medium" | "low";
    createdAt: string;
    symptoms: string;
  }>;
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
  supplements: Array<{
    name: string;
    type: string;
    dosage: string;
    timing: string;
    benefits: string[];
    precautions: string[];
    duration: string;
  }>;
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