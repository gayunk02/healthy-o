const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

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