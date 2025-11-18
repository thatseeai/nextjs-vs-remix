import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * Vitest 설정 파일
 *
 * [Vitest 선택 이유]
 * - Vite와 동일한 설정 및 변환 파이프라인 사용
 * - Jest 대비 5-10배 빠른 테스트 실행 속도
 * - HMR 지원으로 테스트 파일 수정 시 즉시 재실행
 * - TypeScript, JSX, CSS Modules 네이티브 지원
 * - Watch 모드에서 변경된 테스트만 재실행
 *
 * [신입 개발자를 위한 설명]
 * Vitest는 Jest와 유사한 API를 제공하지만 훨씬 빠릅니다.
 * Vite 기반이므로 별도의 설정 없이 TypeScript, JSX를 사용할 수 있습니다.
 *
 * 주요 기능:
 * - describe, it, expect 등 Jest와 동일한 API
 * - React Testing Library와 완벽한 호환
 * - 코드 커버리지 측정 (v8 또는 istanbul)
 * - UI 모드로 브라우저에서 테스트 결과 확인
 */
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    // jsdom 환경: 브라우저 환경 시뮬레이션
    environment: "jsdom",

    // 전역 API 사용 (describe, it, expect 등을 import 없이 사용)
    globals: true,

    // 테스트 실행 전 설정 파일
    setupFiles: ["./tests/setup.ts"],

    // 코드 커버리지 설정
    coverage: {
      provider: "v8", // v8 엔진 기반 커버리지 (빠름)
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "node_modules/",
        "tests/",
        "**/*.config.*",
        "**/*.d.ts",
        "**/build/",
        "**/.remix/",
      ],
      // 커버리지 목표: 80% 이상
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },

    // 테스트 실행 시간 측정
    reporters: ["verbose", "json"],
    outputFile: "./test-results.json",

    // 병렬 실행 설정
    pool: "threads",
    poolOptions: {
      threads: {
        singleThread: false, // 멀티스레드 활용
      },
    },

    // 타임아웃 설정 (기본값: 5000ms)
    testTimeout: 10000,
    hookTimeout: 10000,
  },
});
