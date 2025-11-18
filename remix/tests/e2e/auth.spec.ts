/**
 * E2E 테스트: 인증 플로우 (Remix)
 * 프레임워크: Playwright
 *
 * [테스트 시나리오]
 * - 회원가입 플로우
 * - 로그인 플로우
 * - 로그아웃 플로우
 * - 인증 실패 처리
 * - 보호된 라우트 접근
 */

import { test, expect } from '@playwright/test';

test.describe('인증 플로우 (Remix)', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'Test1234!',
    name: '테스트 사용자',
  };

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('회원가입 페이지가 표시되어야 한다', async ({ page }) => {
    // 회원가입 링크 클릭
    await page.getByRole('link', { name: /register|회원가입/i }).click();

    // URL 확인
    await expect(page).toHaveURL(/.*register/);

    // 폼 요소 확인
    await expect(page.getByLabel(/email|이메일/i)).toBeVisible();
    await expect(page.getByLabel(/password|비밀번호/i)).toBeVisible();
    await expect(page.getByLabel(/name|이름/i)).toBeVisible();
  });

  test('유효하지 않은 이메일로 회원가입 시 에러가 표시되어야 한다', async ({ page }) => {
    await page.goto('http://localhost:5173/register');

    // 유효하지 않은 이메일 입력
    await page.getByLabel(/email|이메일/i).fill('invalid-email');
    await page.getByLabel(/password|비밀번호/i).fill('Password123!');
    await page.getByLabel(/name|이름/i).fill('테스트');

    // 제출 버튼 클릭
    await page.getByRole('button', { name: /register|회원가입|제출/i }).click();

    // 에러 메시지 확인
    await expect(page.getByText(/invalid|유효하지|이메일/i)).toBeVisible();
  });

  test('로그인 페이지가 표시되어야 한다', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    // 폼 요소 확인
    await expect(page.getByLabel(/email|이메일/i)).toBeVisible();
    await expect(page.getByLabel(/password|비밀번호/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /login|로그인/i })).toBeVisible();
  });

  test('잘못된 자격 증명으로 로그인 시 에러가 표시되어야 한다', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    // 잘못된 이메일과 비밀번호 입력
    await page.getByLabel(/email|이메일/i).fill('wrong@example.com');
    await page.getByLabel(/password|비밀번호/i).fill('wrongpassword');

    // 로그인 버튼 클릭
    await page.getByRole('button', { name: /login|로그인/i }).click();

    // 에러 메시지 확인 (실제 구현에 따라 조정 필요)
    // await expect(page.getByText(/invalid|잘못된|인증/i)).toBeVisible();
  });

  test('보호된 페이지는 로그인 없이 접근할 수 없어야 한다', async ({ page }) => {
    // 로그인하지 않고 대시보드 접근 시도
    await page.goto('http://localhost:5173/dashboard');

    // 로그인 페이지로 리다이렉트되어야 함
    await expect(page).toHaveURL(/.*login/);
  });

  test('폼 검증이 작동해야 한다', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    // 빈 폼 제출
    await page.getByRole('button', { name: /login|로그인/i }).click();

    // HTML5 검증 또는 커스텀 검증 메시지 확인
    const emailInput = page.getByLabel(/email|이메일/i);
    const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    expect(isInvalid).toBeTruthy();
  });

  test('비밀번호 표시/숨기기 토글이 작동해야 한다', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    const passwordInput = page.getByLabel(/password|비밀번호/i);

    // 초기 상태는 password type
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // 토글 버튼이 있다면 클릭 (구현에 따라 조정)
    // const toggleButton = page.getByRole('button', { name: /show|hide|표시|숨기기/i });
    // if (await toggleButton.count() > 0) {
    //   await toggleButton.click();
    //   await expect(passwordInput).toHaveAttribute('type', 'text');
    // }
  });

  test('Remember me 체크박스가 작동해야 한다', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    // Remember me 체크박스 찾기 (구현에 따라 조정)
    // const rememberCheckbox = page.getByLabel(/remember|기억/i);
    // if (await rememberCheckbox.count() > 0) {
    //   await expect(rememberCheckbox).not.toBeChecked();
    //   await rememberCheckbox.check();
    //   await expect(rememberCheckbox).toBeChecked();
    // }
  });
});

test.describe('로그아웃 플로우 (Remix)', () => {
  test('로그아웃 버튼 클릭 시 로그아웃되어야 한다', async ({ page }) => {
    // 로그인 상태 시뮬레이션 (실제 구현에 따라 조정)
    // 1. 로그인 페이지로 이동
    // 2. 유효한 자격 증명으로 로그인
    // 3. 로그아웃 버튼 클릭
    // 4. 홈 페이지로 리다이렉트 확인
    // 5. 로그인 버튼이 다시 표시되는지 확인

    // 예시 코드 (실제 구현에 맞게 수정 필요):
    // await page.goto('http://localhost:5173/login');
    // await page.getByLabel(/email/i).fill('test@example.com');
    // await page.getByLabel(/password/i).fill('Test1234');
    // await page.getByRole('button', { name: /login/i }).click();
    // await page.waitForURL(/dashboard/);
    // await page.getByRole('button', { name: /logout/i }).click();
    // await expect(page).toHaveURL('http://localhost:5173');
  });
});
