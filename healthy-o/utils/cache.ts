const CACHE_DURATION = 1 * 60 * 1000; // 1 minute in milliseconds

export const getCachedData = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);
  const timestamp = localStorage.getItem(`${key}_timestamp`);

  if (!data || !timestamp) return null;

  const cacheAge = Date.now() - parseInt(timestamp);
  if (cacheAge > CACHE_DURATION) {
    localStorage.removeItem(key);
    localStorage.removeItem(`${key}_timestamp`);
    return null;
  }

  try {
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
};

export const setCachedData = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
  localStorage.setItem(`${key}_timestamp`, Date.now().toString());
};

export const clearCache = (key: string): void => {
  localStorage.removeItem(key);
  localStorage.removeItem(`${key}_timestamp`);
};

// 모든 마이페이지 관련 캐시를 지우는 함수 추가
export const clearMypageCache = (): void => {
  const keys = [
    'mypage_data',
    'mypage_diagnosis_data',
    'mypage_hospital_data',
    'mypage_supplement_data'
  ];
  
  keys.forEach(key => {
    clearCache(key);
  });
}; 