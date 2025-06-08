import {
  GENDER_OPTIONS,
  SMOKING_OPTIONS,
  DRINKING_OPTIONS,
  EXERCISE_OPTIONS,
  SLEEP_OPTIONS,
  WORK_STYLE_OPTIONS,
  DIET_OPTIONS,
  MEAL_REGULARITY_OPTIONS
} from "@/lib/constants";

export const formatBirthDate = (birthDate: string): string => {
  if (!birthDate) return '정보 없음';
  try {
    const date = new Date(birthDate);
    if (isNaN(date.getTime())) {
      return '정보 없음';
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  } catch (error) {
    console.error('생년월일 변환 중 오류 발생:', error);
    return '정보 없음';
  }
};

export const formatValue = (value: string | null | undefined, unit: string = ''): string => {
  if (!value || value.trim() === '') return '정보 없음';
  return `${value}${unit}`;
};

export const getGenderText = (value: string | null | undefined): string => {
  if (!value) return '정보 없음';
  return GENDER_OPTIONS[value as keyof typeof GENDER_OPTIONS] || '정보 없음';
};

export const getSmokingText = (value: string | null | undefined): string => {
  if (!value) return '정보 없음';
  return SMOKING_OPTIONS[value as keyof typeof SMOKING_OPTIONS] || '정보 없음';
};

export const getDrinkingText = (value: string | null | undefined): string => {
  if (!value) return '정보 없음';
  return DRINKING_OPTIONS[value as keyof typeof DRINKING_OPTIONS] || '정보 없음';
};

export const getExerciseText = (value: string | null | undefined): string => {
  if (!value) return '정보 없음';
  return EXERCISE_OPTIONS[value as keyof typeof EXERCISE_OPTIONS] || '정보 없음';
};

export const getSleepText = (value: string | null | undefined): string => {
  if (!value) return '정보 없음';
  return SLEEP_OPTIONS[value as keyof typeof SLEEP_OPTIONS] || '정보 없음';
};

export const getWorkStyleText = (value: string | null | undefined): string => {
  if (!value) return '정보 없음';
  return WORK_STYLE_OPTIONS[value as keyof typeof WORK_STYLE_OPTIONS] || '정보 없음';
};

export const getDietText = (value: string | null | undefined): string => {
  if (!value) return '정보 없음';
  return DIET_OPTIONS[value as keyof typeof DIET_OPTIONS] || '정보 없음';
};

export const getMealRegularityText = (value: string | null | undefined): string => {
  if (!value) return '정보 없음';
  return MEAL_REGULARITY_OPTIONS[value as keyof typeof MEAL_REGULARITY_OPTIONS] || '정보 없음';
}; 