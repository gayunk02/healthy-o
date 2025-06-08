// 성별
export const GENDER_OPTIONS = {
  MALE: '남성',
  FEMALE: '여성',
} as const;

// 흡연
export const SMOKING_OPTIONS = {
  NON: '비흡연',
  ACTIVE: '흡연',
  QUIT: '금연',
} as const;

// 음주
export const DRINKING_OPTIONS = {
  NON: '비음주',
  LIGHT: '주 1-2회',
  MODERATE: '주 3-4회',
  HEAVY: '주 5회 이상',
} as const;

// 운동
export const EXERCISE_OPTIONS = {
  NONE: '거의 안 함',
  LIGHT: '가벼운 운동 (주 1-2회)',
  MODERATE: '적당한 운동 (주 3-4회)',
  HEAVY: '활발한 운동 (주 5회 이상)',
} as const;

// 수면
export const SLEEP_OPTIONS = {
  LESS_5: '5시간 미만',
  '5_TO_6': '5-6시간',
  '6_TO_7': '6-7시간',
  '7_TO_8': '7-8시간',
  MORE_8: '8시간 초과',
} as const;

// 근무 형태
export const WORK_STYLE_OPTIONS = {
  SITTING: '주로 앉아서 근무',
  STANDING: '주로 서서 근무',
  ACTIVE: '활동이 많은 근무',
  MIXED: '복합적',
} as const;

// 식사 형태
export const DIET_OPTIONS = {
  BALANCED: '균형 잡힌 식단',
  MEAT: '육류 위주',
  FISH: '생선 위주',
  VEGGIE: '채식 위주',
  INSTANT: '인스턴트 위주',
} as const;

// 식사 규칙성
export const MEAL_REGULARITY_OPTIONS = {
  REGULAR: '규칙적',
  MOSTLY: '대체로 규칙적',
  IRREGULAR: '불규칙적',
  VERY_IRREGULAR: '매우 불규칙적',
} as const;

// 역매핑을 위한 유틸리티 함수
export function getKeyByValue<T extends Record<string, string>>(
  object: T,
  value: string
): keyof T | undefined {
  return Object.keys(object).find(key => object[key] === value) as keyof T | undefined;
}

// 타입 정의
export type Gender = keyof typeof GENDER_OPTIONS;
export type Smoking = keyof typeof SMOKING_OPTIONS;
export type Drinking = keyof typeof DRINKING_OPTIONS;
export type Exercise = keyof typeof EXERCISE_OPTIONS;
export type Sleep = keyof typeof SLEEP_OPTIONS;
export type WorkStyle = keyof typeof WORK_STYLE_OPTIONS;
export type Diet = keyof typeof DIET_OPTIONS;
export type MealRegularity = keyof typeof MEAL_REGULARITY_OPTIONS; 