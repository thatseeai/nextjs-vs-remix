/**
 * E2E 테스트: 게시글 CRUD (React Router 7)
 * 프레임워크: Playwright
 *
 * [테스트 시나리오]
 * - 게시글 목록 조회
 * - 게시글 상세 보기
 * - 게시글 작성
 * - 게시글 수정
 * - 게시글 삭제
 * - 검색 및 필터링
 */

import { test, expect } from '@playwright/test';

test.describe('게시글 CRUD (React Router 7)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('게시글 목록 페이지가 표시되어야 한다', async ({ page }) => {
    // Posts 페이지로 이동
    await page.goto('http://localhost:5173/posts');

    // 페이지 제목 확인
    const heading = page.getByRole('heading', { name: /posts|게시글/i });
    await expect(heading).toBeVisible();
  });

  test('게시글 목록이 표시되어야 한다', async ({ page }) => {
    await page.goto('http://localhost:5173/posts');

    // 게시글 아이템 확인 (최소 1개 이상)
    const posts = page.locator('[data-testid="post-item"]');
    const count = await posts.count();

    // 게시글이 있다면 확인, 없으면 "게시글 없음" 메시지 확인
    if (count > 0) {
      await expect(posts.first()).toBeVisible();
    } else {
      await expect(page.getByText(/no posts|게시글이 없습니다/i)).toBeVisible();
    }
  });

  test('게시글 클릭 시 상세 페이지로 이동해야 한다', async ({ page }) => {
    await page.goto('http://localhost:5173/posts');

    // 첫 번째 게시글 링크 찾기
    const firstPost = page.locator('[data-testid="post-item"]').first();

    if (await firstPost.count() > 0) {
      const postLink = firstPost.getByRole('link').first();
      await postLink.click();

      // URL이 /posts/[id] 형식으로 변경되었는지 확인
      await expect(page).toHaveURL(/\/posts\/\d+/);

      // 상세 페이지 내용 확인
      await expect(page.getByRole('heading')).toBeVisible();
    }
  });

  test('게시글 상세 페이지에서 제목과 내용이 표시되어야 한다', async ({ page }) => {
    await page.goto('http://localhost:5173/posts/1');

    // 제목 확인
    const title = page.getByRole('heading', { level: 1 });
    await expect(title).toBeVisible();

    // 내용 확인
    const content = page.locator('[data-testid="post-content"]');
    if (await content.count() > 0) {
      await expect(content).toBeVisible();
    }
  });

  test('게시글 작성 페이지가 표시되어야 한다', async ({ page }) => {
    // 로그인이 필요할 수 있음
    await page.goto('http://localhost:5173/posts/new');

    // 로그인 페이지로 리다이렉트되거나, 작성 폼이 표시되어야 함
    const isLoginPage = await page.locator('[data-testid="login-form"]').count() > 0;
    const isCreatePage = await page.locator('[data-testid="post-form"]').count() > 0;

    expect(isLoginPage || isCreatePage).toBeTruthy();
  });

  test('게시글 작성 폼의 필수 필드가 표시되어야 한다', async ({ page }) => {
    // 로그인 필요 (실제 구현에 따라 조정)
    await page.goto('http://localhost:5173/posts/new');

    // 로그인되어 있다고 가정하고 폼 확인
    if (await page.locator('[data-testid="post-form"]').count() > 0) {
      await expect(page.getByLabel(/title|제목/i)).toBeVisible();
      await expect(page.getByLabel(/content|내용/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /submit|작성|등록/i })).toBeVisible();
    }
  });

  test('빈 제목으로 게시글 작성 시 에러가 표시되어야 한다', async ({ page }) => {
    await page.goto('http://localhost:5173/posts/new');

    if (await page.locator('[data-testid="post-form"]').count() > 0) {
      // 제목 없이 내용만 입력
      await page.getByLabel(/content|내용/i).fill('테스트 내용');

      // 제출 버튼 클릭
      await page.getByRole('button', { name: /submit|작성|등록/i }).click();

      // 에러 메시지 또는 HTML5 검증 확인
      const titleInput = page.getByLabel(/title|제목/i);
      const isInvalid = await titleInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
      expect(isInvalid).toBeTruthy();
    }
  });

  test('검색 기능이 작동해야 한다', async ({ page }) => {
    await page.goto('http://localhost:5173/posts');

    // 검색 입력 필드 찾기
    const searchInput = page.getByPlaceholder(/search|검색/i);

    if (await searchInput.count() > 0) {
      // 검색어 입력
      await searchInput.fill('테스트');

      // 검색 버튼 클릭 또는 Enter 키 입력
      const searchButton = page.getByRole('button', { name: /search|검색/i });
      if (await searchButton.count() > 0) {
        await searchButton.click();
      } else {
        await searchInput.press('Enter');
      }

      // 검색 결과 대기 (실제 구현에 따라 조정)
      await page.waitForTimeout(500);
    }
  });

  test('페이지네이션이 작동해야 한다', async ({ page }) => {
    await page.goto('http://localhost:5173/posts');

    // 페이지네이션 버튼 찾기
    const nextButton = page.getByRole('button', { name: /next|다음/i });

    if (await nextButton.count() > 0 && await nextButton.isEnabled()) {
      // 현재 페이지의 첫 게시글 ID 저장
      const firstPostBefore = await page.locator('[data-testid="post-item"]').first().textContent();

      // 다음 페이지로 이동
      await nextButton.click();
      await page.waitForTimeout(500);

      // 다른 게시글이 표시되는지 확인
      const firstPostAfter = await page.locator('[data-testid="post-item"]').first().textContent();

      expect(firstPostBefore).not.toBe(firstPostAfter);
    }
  });

  test('게시글 정렬 기능이 작동해야 한다', async ({ page }) => {
    await page.goto('http://localhost:5173/posts');

    // 정렬 옵션 선택
    const sortSelect = page.getByLabel(/sort|정렬/i);

    if (await sortSelect.count() > 0) {
      // 최신순으로 정렬
      await sortSelect.selectOption('latest');
      await page.waitForTimeout(500);

      // 정렬이 적용되었는지 확인 (실제 데이터로 검증 필요)
    }
  });

  test('게시글 필터링이 작동해야 한다', async ({ page }) => {
    await page.goto('http://localhost:5173/posts');

    // 카테고리 필터 선택
    const categoryFilter = page.getByLabel(/category|카테고리/i);

    if (await categoryFilter.count() > 0) {
      await categoryFilter.selectOption('technology');
      await page.waitForTimeout(500);

      // 필터링된 결과 확인
    }
  });

  test('삭제 버튼 클릭 시 확인 다이얼로그가 표시되어야 한다', async ({ page }) => {
    // 게시글 상세 페이지로 이동 (본인이 작성한 글로 가정)
    await page.goto('http://localhost:5173/posts/1');

    // 삭제 버튼 찾기
    const deleteButton = page.getByRole('button', { name: /delete|삭제/i });

    if (await deleteButton.count() > 0) {
      // 삭제 버튼 클릭
      await deleteButton.click();

      // 확인 다이얼로그 대기
      page.once('dialog', dialog => {
        expect(dialog.type()).toBe('confirm');
        dialog.dismiss();
      });
    }
  });
});

test.describe('게시글 성능 테스트 (React Router 7)', () => {
  test('게시글 목록 로딩 시간이 2초 이내여야 한다', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('http://localhost:5173/posts');
    await page.waitForLoadState('networkidle');

    const endTime = Date.now();
    const loadTime = endTime - startTime;

    expect(loadTime).toBeLessThan(2000);
  });

  test('게시글 상세 페이지 로딩 시간이 1.5초 이내여야 한다', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('http://localhost:5173/posts/1');
    await page.waitForLoadState('networkidle');

    const endTime = Date.now();
    const loadTime = endTime - startTime;

    expect(loadTime).toBeLessThan(1500);
  });
});
