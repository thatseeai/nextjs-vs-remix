import type { Config } from "tailwindcss";

/**
 * Tailwind CSS 설정 파일
 *
 * [Tailwind CSS 특징]
 * - 유틸리티 우선(Utility-First) CSS 프레임워크
 * - JIT(Just-In-Time) 컴파일러로 빠른 빌드 성능
 * - 프로덕션에서 사용하지 않는 CSS 자동 제거 (Tree-shaking)
 *
 * [신입 개발자를 위한 설명]
 * Tailwind는 HTML에 직접 클래스명을 작성하여 스타일링하는 방식입니다.
 * 예: <div className="bg-blue-500 text-white p-4 rounded">
 *
 * 장점:
 * - 빠른 개발 속도
 * - 일관된 디자인 시스템
 * - 작은 최종 번들 크기 (사용한 클래스만 포함)
 */
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
      },
      fontFamily: {
        sans: [
          "Inter var",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
