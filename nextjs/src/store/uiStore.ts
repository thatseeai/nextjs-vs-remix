/**
 * 파일명: uiStore.ts
 * 용도: UI 상태 관리 스토어 (테마, 언어, 모달 등)
 *
 * [Next.js 특징]
 * - 클라이언트 사이드 UI 상태를 전역으로 관리
 * - persist 미들웨어로 로컬 스토리지에 자동 저장
 * - 테마 변경, 다국어 전환 등 UI 관련 상태 중앙 관리
 *
 * [신입 개발자를 위한 설명]
 * UI 스토어는 사용자 인터페이스의 상태를 관리합니다.
 * 예를 들어 다크모드/라이트모드, 언어 설정, 사이드바 열림/닫힘 등입니다.
 * 이러한 상태를 전역으로 관리하면 어떤 컴포넌트에서든 쉽게 접근할 수 있습니다.
 *
 * 사용 예시:
 * const { theme, toggleTheme, language, setLanguage } = useUIStore();
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULTS, LANGUAGES, THEMES } from '@/lib/constants';

/**
 * 언어 타입
 */
export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

/**
 * 테마 타입
 */
export type Theme = (typeof THEMES)[keyof typeof THEMES];

/**
 * 토스트 알림 타입
 */
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

/**
 * UI 스토어 상태 타입
 */
interface UIState {
  // 상태
  theme: Theme;
  language: Language;
  sidebarOpen: boolean;
  toasts: Toast[];

  // 테마 관련 액션
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  // 언어 관련 액션
  setLanguage: (language: Language) => void;

  // 사이드바 관련 액션
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // 토스트 관련 액션
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

/**
 * UI 상태 관리 스토어
 */
export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      theme: DEFAULTS.THEME,
      language: DEFAULTS.LANGUAGE,
      sidebarOpen: false,
      toasts: [],

      /**
       * 테마 설정
       * @param theme - 설정할 테마 ('light' | 'dark')
       */
      setTheme: (theme: Theme) => {
        set({ theme });

        // HTML 요소에 클래스 추가/제거 (Tailwind dark mode)
        if (typeof window !== 'undefined') {
          if (theme === THEMES.DARK) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      },

      /**
       * 테마 토글 (라이트 ↔ 다크)
       */
      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
        get().setTheme(newTheme);
      },

      /**
       * 언어 설정
       * @param language - 설정할 언어 ('ko' | 'en')
       */
      setLanguage: (language: Language) => {
        set({ language });

        // HTML lang 속성 변경
        if (typeof window !== 'undefined') {
          document.documentElement.lang = language;
        }
      },

      /**
       * 사이드바 열림/닫힘 설정
       * @param open - 열림 여부
       */
      setSidebarOpen: (open: boolean) => {
        set({ sidebarOpen: open });
      },

      /**
       * 사이드바 토글
       */
      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },

      /**
       * 토스트 알림 추가
       * @param toast - 토스트 정보 (id는 자동 생성)
       */
      addToast: (toast: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast: Toast = {
          id,
          duration: 3000, // 기본 3초
          ...toast,
        };

        set((state) => ({
          toasts: [...state.toasts, newToast],
        }));

        // 자동 제거 (duration 후)
        if (newToast.duration && newToast.duration > 0) {
          setTimeout(() => {
            get().removeToast(id);
          }, newToast.duration);
        }
      },

      /**
       * 토스트 알림 제거
       * @param id - 제거할 토스트 ID
       */
      removeToast: (id: string) => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
      },

      /**
       * 모든 토스트 알림 제거
       */
      clearToasts: () => {
        set({ toasts: [] });
      },
    }),
    {
      name: 'ui-storage', // 로컬 스토리지 키
      partialize: (state) => ({
        // 저장할 상태만 선택 (toasts는 제외)
        theme: state.theme,
        language: state.language,
        sidebarOpen: state.sidebarOpen,
      }),
      onRehydrateStorage: () => (state) => {
        // 스토리지에서 복원 후 실행
        if (state && typeof window !== 'undefined') {
          // 테마 적용
          if (state.theme === THEMES.DARK) {
            document.documentElement.classList.add('dark');
          }
          // 언어 적용
          document.documentElement.lang = state.language;
        }
      },
    }
  )
);
