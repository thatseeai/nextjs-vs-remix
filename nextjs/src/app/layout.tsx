/**
 * 레이아웃명: Root Layout
 * 용도: 전역 루트 레이아웃
 *
 * [Next.js 특징]
 * - App Router의 최상위 레이아웃
 * - 모든 페이지에 공통으로 적용되는 구조
 * - 메타데이터, 폰트, 전역 스타일 설정
 *
 * [신입 개발자를 위한 설명]
 * 루트 레이아웃은 앱 전체의 뼈대를 구성합니다.
 * Header와 Footer 같은 공통 컴포넌트를 여기에 배치하면
 * 모든 페이지에서 일관된 UI를 제공할 수 있습니다.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js vs Remix 비교 프로젝트",
  description: "Next.js와 Remix 프레임워크의 정량적 비교를 위한 교육용 프로젝트",
  keywords: ["Next.js", "Remix", "React", "프레임워크 비교", "SSR", "SSG"],
  authors: [{ name: "Development Team" }],
  openGraph: {
    title: "Next.js vs Remix 비교 프로젝트",
    description: "Next.js와 Remix 프레임워크의 정량적 비교",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
