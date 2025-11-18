/**
 * E2E 테스트: 홈 페이지 (Next.js)
 * 프레임워크: Playwright
 *
 * [테스트 시나리오]
 * - 홈 페이지 로딩
 * - 주요 요소 렌더링 확인
 * - 네비게이션 링크 동작
 * - SEO 메타 태그 확인
 */

import { test, expect } from '@playwright/test';

test.describe('홈 페이지 (Next.js)', () => {
  test.beforeEach(async ({ page }) => {
    // 각 테스트 전에 홈 페이지로 이동
    await page.goto('http://localhost:3000');
  });

  test('홈 페이지가 정상적으로 로딩되어야 한다', async ({ page }) => {
    // 페이지 제목 확인
    await expect(page).toHaveTitle(/Next.js/i);

    // 주요 헤딩 확인
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
  });

  test('네비게이션 링크들이 표시되어야 한다', async ({ page }) => {
    // About 링크
    const aboutLink = page.getByRole('link', { name: /about/i });
    await expect(aboutLink).toBeVisible();

    // Blog 링크
    const blogLink = page.getByRole('link', { name: /blog/i });
    await expect(blogLink).toBeVisible();

    // Posts 링크
    const postsLink = page.getByRole('link', { name: /posts/i });
    await expect(postsLink).toBeVisible();
  });

  test('About 페이지로 이동할 수 있어야 한다', async ({ page }) => {
    // About 링크 클릭
    await page.getByRole('link', { name: /about/i }).click();

    // URL 확인
    await expect(page).toHaveURL(/.*about/);

    // About 페이지 내용 확인
    await expect(page.getByText(/about/i)).toBeVisible();
  });

  test('Posts 페이지로 이동할 수 있어야 한다', async ({ page }) => {
    // Posts 링크 클릭
    await page.getByRole('link', { name: /posts/i }).click();

    // URL 확인
    await expect(page).toHaveURL(/.*posts/);
  });

  test('로그인 버튼이 표시되어야 한다', async ({ page }) => {
    const loginButton = page.getByRole('link', { name: /login|로그인/i });
    await expect(loginButton).toBeVisible();
  });

  test('로그인 페이지로 이동할 수 있어야 한다', async ({ page }) => {
    await page.getByRole('link', { name: /login|로그인/i }).click();

    await expect(page).toHaveURL(/.*login/);
  });

  test('SEO 메타 태그가 설정되어 있어야 한다', async ({ page }) => {
    // description 메타 태그
    const description = await page.locator('meta[name="description"]');
    await expect(description).toHaveCount(1);

    // viewport 메타 태그
    const viewport = await page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveCount(1);
  });

  test('반응형 디자인이 적용되어야 한다', async ({ page }) => {
    // 모바일 뷰포트로 변경
    await page.setViewportSize({ width: 375, height: 667 });

    // 네비게이션이 여전히 접근 가능해야 함
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('페이지 로딩 성능이 기준 이내여야 한다', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('http://localhost:3000');
    await page.waitForLoadState('load');

    const endTime = Date.now();
    const loadTime = endTime - startTime;

    // 3초 이내에 로딩되어야 함
    expect(loadTime).toBeLessThan(3000);
  });
});
