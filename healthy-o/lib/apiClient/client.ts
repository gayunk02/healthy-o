import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use((config) => {
  // 쿠키에서 토큰 가져오기
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];

  // 토큰이 있으면 헤더에 추가
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 401 에러 처리
    if (error.response?.status === 401) {
      // 쿠키에서 토큰 삭제
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      // 로그인 페이지로 리다이렉트 (클라이언트 사이드에서만)
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export { apiClient }; 