import { create } from "zustand";

/**
 * 파일명: uiStore.ts
 * 용도: UI 상태 관리 (테마, 모달, 알림 등)
 *
 * [Zustand 활용]
 * 전역 UI 상태를 관리하여 컴포넌트 간 props 전달을 줄입니다.
 */

/**
 * [테마 타입]
 */
type Theme = "light" | "dark" | "system";

/**
 * [알림 타입]
 */
export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
}

/**
 * [UI 상태 타입]
 */
interface UIState {
  /** 현재 테마 */
  theme: Theme;
  /** 사이드바 열림 상태 */
  isSidebarOpen: boolean;
  /** 모달 열림 상태 */
  isModalOpen: boolean;
  /** 알림 목록 */
  notifications: Notification[];
}

/**
 * [UI 액션 타입]
 */
interface UIActions {
  /** 테마 설정 */
  setTheme: (theme: Theme) => void;
  /** 사이드바 토글 */
  toggleSidebar: () => void;
  /** 모달 열기 */
  openModal: () => void;
  /** 모달 닫기 */
  closeModal: () => void;
  /** 알림 추가 */
  addNotification: (
    notification: Omit<Notification, "id">
  ) => void;
  /** 알림 제거 */
  removeNotification: (id: string) => void;
  /** 모든 알림 제거 */
  clearNotifications: () => void;
}

/**
 * [전체 UI 스토어 타입]
 */
type UIStore = UIState & UIActions;

/**
 * [Zustand 스토어 생성]
 */
export const useUIStore = create<UIStore>((set, get) => ({
  // 초기 상태
  theme: "light",
  isSidebarOpen: false,
  isModalOpen: false,
  notifications: [],

  // 액션들
  setTheme: (theme) => {
    set({ theme });
    // 실제 프로젝트에서는 localStorage에 저장
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  },

  toggleSidebar: () => {
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
  },

  openModal: () => {
    set({ isModalOpen: true });
  },

  closeModal: () => {
    set({ isModalOpen: false });
  },

  addNotification: (notification) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newNotification = { ...notification, id };

    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // 자동으로 제거 (기본 3초)
    const duration = notification.duration || 3000;
    setTimeout(() => {
      get().removeNotification(id);
    }, duration);
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },
}));
