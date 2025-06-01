export interface IDiagnosis {
  id: number;
  userId: string;
  // 진단 요청 정보
  mainSymptoms: string;
  symptomDuration: string;
  additionalInfo: string;
  // 진단 시점의 건강 정보
  height: number;
  weight: number;
  bmi: number;
  chronicDiseases: string;
  medications: string;
  smoking: string;
  drinking: string;
  exercise: string;
  sleep: string;
  occupation: string;
  workStyle: string;
  diet: string;
  mealRegularity: string;
  createdAt: Date;
}

interface IDiseaseResult {
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