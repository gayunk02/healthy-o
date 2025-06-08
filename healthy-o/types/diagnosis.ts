import { DrinkingStatus, ExerciseStatus, Gender, SmokingStatus, WorkStyle, DietType, MealRegularity } from './health';

export interface IDiagnosis {
  id: number;
  userId: number;
  name: string;
  age: number;
  gender: Gender;
  height: number;
  weight: number;
  bmi: number;
  chronicDiseases?: string;
  medications?: string;
  smoking: SmokingStatus;
  drinking: DrinkingStatus;
  exercise: ExerciseStatus;
  sleep: string;
  occupation: string;
  workStyle: WorkStyle;
  diet: DietType;
  mealRegularity: MealRegularity;
  submittedAt: Date;
}

export interface IDiseaseResult {
  diseaseName: string;        // 질병명
  description: string;        // 질병 설명
  riskLevel: 'low' | 'medium' | 'high';  // 위험도
  mainSymptoms: string[];     // 해당 질병의 주요 증상 3개
  managementTips: string[];   // 해당 질병의 관리수칙 3개
}

export interface IDiagnosisResult {
  id: number;
  diagnosisId: number;
  recommendedDepartment: string;  // 전체 진단에 대한 추천 진료과
  diseases: IDiseaseResult[];     // 추정되는 질병 3개의 정보
  createdAt: Date;
} 