// 병원 정보 인터페이스
export interface IHospital {
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

// 병원 추천 정보 인터페이스
export interface IHospitalRecommendation {
  id: number;
  userId: number;
  diagnosisId: number;
  hospitals: IHospital[];
  recommendedAt: Date;
}

// 영양제 정보 인터페이스
export interface ISupplement {
  supplementName: string;
  description: string;
  benefits: string[];
  matchingSymptoms: string[];
}

// 영양제 추천 정보 인터페이스
export interface ISupplementRecommendation {
  id: number;
  userId: number;
  diagnosisId: number;
  supplements: ISupplement[];
  recommendedAt: Date;
} 