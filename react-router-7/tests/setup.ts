import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

/**
 * Vitest 테스트 환경 설정 파일
 *
 * [용도]
 * 모든 테스트 실행 전에 자동으로 로드되는 설정 파일입니다.
 * 테스트 환경 초기화, 전역 모킹, 헬퍼 함수 등을 정의합니다.
 *
 * [신입 개발자를 위한 설명]
 * 이 파일은 vitest.config.ts의 setupFiles 옵션으로 지정되어
 * 모든 테스트 파일 실행 전에 자동으로 로드됩니다.
 *
 * 주요 설정:
 * 1. @testing-library/jest-dom: DOM 매처 추가 (toBeInTheDocument 등)
 * 2. cleanup: 각 테스트 후 DOM 정리
 * 3. 전역 모킹: window, fetch 등
 */

/**
 * 각 테스트 후 정리 작업
 *
 * [React Testing Library cleanup]
 * 테스트 간 간섭을 방지하기 위해 각 테스트 후
 * 렌더링된 컴포넌트를 자동으로 제거합니다.
 */
afterEach(() => {
  cleanup();
});

/**
 * 전역 모킹 설정
 */

// window.matchMedia 모킹 (반응형 테스트용)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// IntersectionObserver 모킹 (이미지 lazy loading 테스트용)
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// ResizeObserver 모킹
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;

/**
 * 환경 변수 모킹
 *
 * [Vite 환경 변수]
 * 테스트 환경에서 사용할 환경 변수를 설정합니다.
 */
process.env.VITE_PUBLIC_API_URL = "http://localhost:3000/api";
process.env.NODE_ENV = "test";

/**
 * 커스텀 매처 확장
 *
 * [신입 개발자를 위한 설명]
 * expect 객체에 커스텀 매처를 추가할 수 있습니다.
 * 예: expect(element).toBeVisible()
 */
expect.extend({
  /**
   * 요소가 화면에 보이는지 확인하는 커스텀 매처
   */
  toBeVisible(received: HTMLElement) {
    const isVisible =
      received.style.display !== "none" &&
      received.style.visibility !== "hidden" &&
      received.style.opacity !== "0";

    return {
      pass: isVisible,
      message: () =>
        `Expected element to ${this.isNot ? "not " : ""}be visible`,
    };
  },
});

/**
 * 전역 테스트 헬퍼 함수
 */

/**
 * 비동기 작업 대기 헬퍼
 *
 * @param ms 대기 시간 (밀리초)
 */
export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 로컬 스토리지 모킹 헬퍼
 */
export const mockLocalStorage = () => {
  const storage: Record<string, string> = {};

  return {
    getItem: (key: string) => storage[key] || null,
    setItem: (key: string, value: string) => {
      storage[key] = value;
    },
    removeItem: (key: string) => {
      delete storage[key];
    },
    clear: () => {
      Object.keys(storage).forEach((key) => delete storage[key]);
    },
  };
};

// 로컬 스토리지 전역 모킹
Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage(),
});

/**
 * 콘솔 에러/경고 억제 (필요한 경우)
 *
 * [주의]
 * 테스트 중 예상된 에러는 억제할 수 있지만,
 * 실제 버그를 놓칠 수 있으므로 신중하게 사용하세요.
 */
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  // React 18의 예상된 경고 메시지 억제
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Warning: ReactDOM.render")
    ) {
      return;
    }
    originalError.call(console, ...args);
  };

  console.warn = (...args: any[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Warning: useLayoutEffect")
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});
