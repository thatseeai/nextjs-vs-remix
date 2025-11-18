import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E 테스트 설정 파일
 *
 * [Playwright 특징]
 * - 크로스 브라우저 테스트 (Chromium, Firefox, WebKit)
 * - 자동 대기 및 재시도 메커니즘
 * - 네트워크 모킹 및 가로채기
 * - 스크린샷 및 비디오 녹화
 * - 병렬 테스트 실행
 *
 * [신입 개발자를 위한 설명]
 * E2E(End-to-End) 테스트는 실제 사용자처럼 애플리케이션을 테스트합니다.
 * 예: "로그인 → 대시보드 이동 → 프로필 수정 → 로그아웃"
 *
 * Playwright는 이런 시나리오를 자동화하고 여러 브라우저에서 검증합니다.
 */
export default defineConfig({
  // 테스트 파일 위치
  testDir: "./tests/e2e",

  // 테스트 타임아웃 (30초)
  timeout: 30 * 1000,

  // 각 테스트는 독립적으로 실행
  fullyParallel: true,

  // CI 환경에서 실패 시 재시도하지 않음
  forbidOnly: !!process.env.CI,

  // 실패 시 재시도 횟수
  retries: process.env.CI ? 2 : 0,

  // 병렬 실행 워커 수
  workers: process.env.CI ? 1 : undefined,

  // 리포터 설정
  reporter: [
    ["html", { outputFolder: "playwright-report" }],
    ["json", { outputFile: "playwright-results.json" }],
    ["list"],
  ],

  // 모든 테스트에 적용되는 설정
  use: {
    // 기본 URL
    baseURL: "http://localhost:3000",

    // 각 액션 실행 전 대기 시간
    actionTimeout: 0,

    // 실패 시 스크린샷 촬영
    screenshot: "only-on-failure",

    // 실패 시 비디오 녹화
    video: "retain-on-failure",

    // 브라우저 트레이스 (디버깅용)
    trace: "on-first-retry",
  },

  // 테스트할 브라우저 설정
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    // 모바일 테스트
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  // 개발 서버 설정
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
