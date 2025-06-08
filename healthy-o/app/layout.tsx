import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import PageTransition from "@/components/layout/PageTransition";
import { Toaster } from "@/components/ui/toaster";
import { IRootLayoutProps } from "@/types/ui";

const pretendard = localFont({
  src: [
    {
      path: './fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
  preload: true,
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Healthy-O",
  description: "당신의 건강한 삶을 위한 맞춤형 의료 서비스",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }: IRootLayoutProps) {
  return (
    <html lang="ko" suppressHydrationWarning className={pretendard.variable}>
      <head>
        <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
        />
      </head>
      <body className={cn('min-h-screen bg-background font-pretendard font-medium antialiased flex flex-col')}>
        <Header />
        <div className="flex-1 w-full pt-[72px]">
          <PageTransition>
            {children}
          </PageTransition>
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
