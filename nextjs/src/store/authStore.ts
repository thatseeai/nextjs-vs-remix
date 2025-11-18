/**
 * 파일명: authStore.ts
 * 용도: 인증 상태 관리 스토어 (Zustand)
 *
 * [Next.js 특징]
 * - Zustand를 사용한 경량 전역 상태 관리
 * - Redux보다 간단하고 보일러플레이트가 적음
 * - TypeScript와 완벽하게 통합
 *
 * [신입 개발자를 위한 설명]
 * Zustand는 React 상태 관리 라이브러리입니다.
 * Context API보다 성능이 좋고, Redux보다 사용이 간단합니다.
 * create 함수로 스토어를 만들고, 컴포넌트에서 훅처럼 사용합니다.
 * 이 스토어는 사용자의 로그인 상태와 정보를 관리합니다.
 *
 * 사용 예시:
 * const { user, login, logout } = useAuthStore();
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 사용자 타입
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role?: 'user' | 'admin';
  avatar?: string;
}

/**
 * 인증 스토어 상태 타입
 */
interface AuthState {
  // 상태
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // 액션
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  checkAuth: () => Promise<void>;
}

/**
 * 인증 상태 관리 스토어
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      /**
       * 로그인
       * @param user - 사용자 정보
       * @param token - JWT 토큰
       */
      login: (user: User, token: string) => {
        // 로컬 스토리지에 토큰 저장
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', token);
        }

        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      /**
       * 로그아웃
       */
      logout: () => {
        // 로컬 스토리지에서 토큰 제거
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
        }

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      /**
       * 사용자 정보 업데이트
       * @param userData - 업데이트할 사용자 정보 (일부)
       */
      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },

      /**
       * 로딩 상태 설정
       * @param loading - 로딩 여부
       */
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      /**
       * 인증 상태 확인 (페이지 로드 시 실행)
       * 저장된 토큰이 있으면 사용자 정보를 가져옵니다.
       */
      checkAuth: async () => {
        const token = get().token;

        if (!token) {
          set({ isAuthenticated: false, isLoading: false });
          return;
        }

        try {
          set({ isLoading: true });

          // 토큰으로 사용자 정보 가져오기
          const response = await fetch('/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const user = await response.json();
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            // 토큰이 유효하지 않으면 로그아웃
            get().logout();
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          get().logout();
        }
      },
    }),
    {
      name: 'auth-storage', // 로컬 스토리지 키
      partialize: (state) => ({
        // 저장할 상태만 선택 (token은 별도로 localStorage에 저장)
        user: state.user,
        token: state.token,
      }),
    }
  )
);
