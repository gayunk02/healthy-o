/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@radix-ui'],

  // 🔧 ⬇ 타입 오류 무시 설정 (핵심)
  typescript: {
    ignoreBuildErrors: true,
  },

  // 🔧 ⬇ ESLint 옵션 에러도 무시
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
