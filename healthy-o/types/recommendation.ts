interface IHospital {
  hospitalName: string;
  placeId: string;
  placeUrl: string;
  address: string;
  phone: string;
  category: string;
  latitude: number;
  longitude: number;
  department: string;
}

export interface IHospitalRecommendation {
  id: number;
  userId: string;
  diagnosisId: number;
  hospitals: IHospital[];
  recommendedAt: Date;
}

interface ISupplement {
  supplementName: string;    // 영양제 이름
  description: string;       // 설명
  benefits: string[];        // 주요 효능 3개
  matchingSymptoms: string[]; // 관련 증상 3개
}

export interface ISupplementRecommendation {
  id: number;
  userId: string;
  diagnosisId: number;
  supplements: ISupplement[];  // 최대 3개의 영양제 정보
  recommendedAt: Date;
} 