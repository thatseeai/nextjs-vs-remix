import type { Config } from 'tailwindcss';

/**
 * Tailwind CSS 설정 (React Router 7)
 *
 * [스타일링 전략]
 * - Utility-first CSS 프레임워크
 * - JIT(Just-In-Time) 컴파일로 빠른 빌드
 * - 커스텀 디자인 토큰 정의
 */
export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
