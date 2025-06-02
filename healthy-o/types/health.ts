// 공통 열거형 정의
export type SmokingStatus = 'NON' | 'ACTIVE' | 'QUIT';
export type DrinkingStatus = 'NON' | 'LIGHT' | 'MODERATE' | 'HEAVY';
export type ExerciseStatus = 'NONE' | 'LIGHT' | 'MODERATE' | 'HEAVY';
export type SleepStatus = 'LESS_5' | '5_TO_6' | '6_TO_7' | '7_TO_8' | 'MORE_8';
export type WorkStyle = 'SITTING' | 'STANDING' | 'ACTIVE' | 'MIXED';
export type DietType = 'BALANCED' | 'MEAT' | 'FISH' | 'VEGGIE' | 'INSTANT';
export type MealRegularity = 'REGULAR' | 'MOSTLY' | 'IRREGULAR' | 'VERY_IRREGULAR';
export type Gender = 'MALE' | 'FEMALE';

// 신체 정보 인터페이스
export interface IPhysicalInfo {
  height: number;
  weight: number;
  bmi: number;
}

// 건강 상태 정보 인터페이스
export interface IHealthStatus {
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
  sleep: SleepStatus;
  occupation: string;
  workStyle: WorkStyle;
  diet: DietType;
  mealRegularity: MealRegularity;
}

// 생활 습관 정보 인터페이스
export interface ILifestyleInfo {
  exercise: ExerciseStatus;
  sleep: SleepStatus;
  occupation: string;
  workStyle: WorkStyle;
  diet: DietType;
  mealRegularity: MealRegularity;
}

// DB에 저장되는 건강 정보 인터페이스
export interface IHealthInfo extends IPhysicalInfo {
  id: number;
  userId: number;
  name: string;
  age: number;
  gender: Gender;
  chronicDiseases?: string;
  medications?: string;
  smoking: SmokingStatus;
  drinking: DrinkingStatus;
  exercise: ExerciseStatus;
  sleep: SleepStatus;
  occupation: string;
  workStyle: WorkStyle;
  diet: DietType;
  mealRegularity: MealRegularity;
  createdAt: Date;
  updatedAt: Date;
}

// 건강 검진 결과 인터페이스
export interface IHealthResult {
  diseaseName: string;
  description: string;
  mainSymptoms: string[];
  managementTips: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export interface IHealthQuestion {
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
  sleep: SleepStatus;
  occupation: string;
  workStyle: WorkStyle;
  diet: DietType;
  mealRegularity: MealRegularity;
} 