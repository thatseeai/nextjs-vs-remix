import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * Vitest 설정 파일 (React Router 7)
 *
 * [Vitest 특징]
 * - Vite와 동일한 변환 파이프라인 사용으로 설정 공유
 * - Jest 대비 5-10배 빠른 테스트 실행 속도
 * - HMR 지원으로 테스트 파일 변경 시 즉시 재실행
 * - TypeScript, JSX, CSS Modules 네이티브 지원
 *
 * [커버리지 목표]
 * - 80% 이상 코드 커버리지 유지
 * - v8 provider 사용 (빠른 성능)
 */
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.config.ts',
        '**/*.config.js',
        '**/build/',
        '**/dist/',
      ],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    // 테스트 실행 시간 측정
    reporters: ['verbose'],
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './app'),
    },
  },
});
