import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E 테스트 설정 (React Router 7)
 *
 * [E2E 테스트 시나리오]
 * 1. 라우팅 네비게이션 테스트
 * 2. 폼 제출 및 검증 테스트
 * 3. 인증 플로우 테스트
 *
 * [성능 측정]
 * - 페이지 로딩 시간
 * - 상호작용 응답 시간
 * - Core Web Vitals
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
