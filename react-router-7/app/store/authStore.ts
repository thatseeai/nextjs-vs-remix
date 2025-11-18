import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * 파일명: authStore.ts
 * 용도: 인증 상태 관리 (Zustand)
 *
 * [Zustand 특징]
 * - 간단한 API: Redux보다 훨씬 간단
 * - TypeScript 지원: 완벽한 타입 추론
 * - 미들웨어: persist, devtools 등
 * - 보일러플레이트 최소화
 *
 * [신입 개발자를 위한 설명]
 * Zustand는 React 애플리케이션의 전역 상태를 관리하는 라이브러리입니다.
 * Context API보다 간단하고, Redux보다 가볍습니다.
 *
 * 사용 예시:
 * const { user, login, logout } = useAuthStore();
 */

/**
 * [사용자 타입]
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

/**
 * [인증 상태 타입]
 */
interface AuthState {
  /** 현재 로그인한 사용자 */
  user: User | null;
  /** 인증 토큰 */
  token: string | null;
  /** 로그인 상태 */
  isAuthenticated: boolean;
  /** 로딩 상태 */
  isLoading: boolean;
}

/**
 * [인증 액션 타입]
 */
interface AuthActions {
  /** 로그인 */
  login: (user: User, token: string) => void;
  /** 로그아웃 */
  logout: () => void;
  /** 사용자 정보 업데이트 */
  updateUser: (user: Partial<User>) => void;
  /** 로딩 상태 설정 */
  setLoading: (isLoading: boolean) => void;
}

/**
 * [전체 스토어 타입]
 */
type AuthStore = AuthState & AuthActions;

/**
 * [초기 상태]
 */
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
};

/**
 * [Zustand 스토어 생성]
 *
 * create() 함수로 스토어를 생성합니다.
 * set 함수로 상태를 업데이트하고, get 함수로 현재 상태를 읽습니다.
 */
export const useAuthStore = create<AuthStore>()(
  /**
   * [persist 미들웨어]
   * 상태를 localStorage에 자동으로 저장합니다.
   * 페이지를 새로고침해도 상태가 유지됩니다.
   *
   * 주의: 서버 사이드에서는 localStorage가 없으므로
   * 클라이언트에서만 동작합니다.
   */
  persist(
    (set, get) => ({
      ...initialState,

      /**
       * [로그인 액션]
       * 사용자 정보와 토큰을 저장하고 인증 상태를 true로 설정합니다.
       *
       * @param user - 사용자 정보
       * @param token - JWT 토큰
       */
      login: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      /**
       * [로그아웃 액션]
       * 모든 인증 정보를 초기화합니다.
       */
      logout: () => {
        set({
          ...initialState,
        });
      },

      /**
       * [사용자 정보 업데이트 액션]
       * 현재 사용자 정보를 부분적으로 업데이트합니다.
       *
       * @param userData - 업데이트할 사용자 데이터
       */
      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              ...userData,
            },
          });
        }
      },

      /**
       * [로딩 상태 설정]
       * 비동기 작업 중 로딩 상태를 표시합니다.
       *
       * @param isLoading - 로딩 상태
       */
      setLoading: (isLoading) => {
        set({ isLoading });
      },
    }),
    {
      name: "auth-storage", // localStorage 키 이름
      /**
       * [부분 상태 저장]
       * token은 보안상 localStorage에 저장하지 않을 수도 있습니다.
       * 실제 프로젝트에서는 httpOnly 쿠키 사용을 권장합니다.
       */
      partialize: (state) => ({
        user: state.user,
        // token은 저장하지 않음 (보안)
      }),
    }
  )
);

/**
 * [선택자 함수]
 * 특정 상태만 선택하여 불필요한 리렌더링을 방지합니다.
 *
 * 사용 예시:
 * const user = useAuthStore(selectUser);
 */
export const selectUser = (state: AuthStore) => state.user;
export const selectIsAuthenticated = (state: AuthStore) => state.isAuthenticated;
export const selectToken = (state: AuthStore) => state.token;
