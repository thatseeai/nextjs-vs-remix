/**
 * 테스트 파일: uiStore.test.ts (Remix)
 * 용도: Zustand UI 스토어 유닛 테스트
 *
 * [테스트 커버리지]
 * - 테마 설정
 * - 사이드바 토글
 * - 모달 열기/닫기
 * - 알림 관리
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { useUIStore } from '~/store/uiStore';
import { act, renderHook } from '@testing-library/react';

// 로컬 스토리지 모킹
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

describe('uiStore - UI 스토어 (Remix)', () => {
  beforeEach(() => {
    // 로컬 스토리지 초기화
    localStorageMock.clear();
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    // 스토어 초기화
    useUIStore.getState().clearNotifications();

    // 타이머 초기화
    vi.clearAllTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  /**
   * [초기 상태 테스트]
   */
  it('초기 상태가 올바르게 설정되어야 한다', () => {
    const { result } = renderHook(() => useUIStore());

    expect(result.current.theme).toBe('light');
    expect(result.current.isSidebarOpen).toBe(false);
    expect(result.current.isModalOpen).toBe(false);
    expect(result.current.notifications).toEqual([]);
  });

  /**
   * [테마 설정 테스트]
   */
  it('테마를 light로 설정할 수 있어야 한다', () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.setTheme('light');
    });

    expect(result.current.theme).toBe('light');
  });

  it('테마를 dark로 설정할 수 있어야 한다', () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.setTheme('dark');
    });

    expect(result.current.theme).toBe('dark');
  });

  it('테마를 system으로 설정할 수 있어야 한다', () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.setTheme('system');
    });

    expect(result.current.theme).toBe('system');
  });

  it('테마 변경 시 로컬 스토리지에 저장되어야 한다', () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.setTheme('dark');
    });

    expect(localStorageMock.getItem('theme')).toBe('dark');
  });

  /**
   * [사이드바 토글 테스트]
   */
  it('사이드바를 토글할 수 있어야 한다', () => {
    const { result } = renderHook(() => useUIStore());

    expect(result.current.isSidebarOpen).toBe(false);

    act(() => {
      result.current.toggleSidebar();
    });

    expect(result.current.isSidebarOpen).toBe(true);

    act(() => {
      result.current.toggleSidebar();
    });

    expect(result.current.isSidebarOpen).toBe(false);
  });

  /**
   * [모달 테스트]
   */
  it('모달을 열 수 있어야 한다', () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.openModal();
    });

    expect(result.current.isModalOpen).toBe(true);
  });

  it('모달을 닫을 수 있어야 한다', () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.openModal();
      result.current.closeModal();
    });

    expect(result.current.isModalOpen).toBe(false);
  });

  /**
   * [알림 관리 테스트]
   */
  it('success 알림을 추가할 수 있어야 한다', () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.addNotification({
        type: 'success',
        message: '성공했습니다',
      });
    });

    expect(result.current.notifications).toHaveLength(1);
    expect(result.current.notifications[0].type).toBe('success');
    expect(result.current.notifications[0].message).toBe('성공했습니다');
    expect(result.current.notifications[0].id).toBeDefined();
  });

  it('error 알림을 추가할 수 있어야 한다', () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.addNotification({
        type: 'error',
        message: '오류가 발생했습니다',
      });
    });

    expect(result.current.notifications[0].type).toBe('error');
  });

  it('warning 알림을 추가할 수 있어야 한다', () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.addNotification({
        type: 'warning',
        message: '경고',
      });
    });

    expect(result.current.notifications[0].type).toBe('warning');
  });

  it('info 알림을 추가할 수 있어야 한다', () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.addNotification({
        type: 'info',
        message: '정보',
      });
    });

    expect(result.current.notifications[0].type).toBe('info');
  });

  it('여러 알림을 추가할 수 있어야 한다', () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.addNotification({ type: 'success', message: '알림 1' });
      result.current.addNotification({ type: 'error', message: '알림 2' });
      result.current.addNotification({ type: 'warning', message: '알림 3' });
    });

    expect(result.current.notifications).toHaveLength(3);
  });

  it('알림을 ID로 제거할 수 있어야 한다', () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.addNotification({ type: 'success', message: '알림 1' });
      result.current.addNotification({ type: 'error', message: '알림 2' });
    });

    const firstNotificationId = result.current.notifications[0].id;

    act(() => {
      result.current.removeNotification(firstNotificationId);
    });

    expect(result.current.notifications).toHaveLength(1);
    expect(result.current.notifications[0].message).toBe('알림 2');
  });

  it('모든 알림을 제거할 수 있어야 한다', () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.addNotification({ type: 'success', message: '알림 1' });
      result.current.addNotification({ type: 'error', message: '알림 2' });
      result.current.addNotification({ type: 'warning', message: '알림 3' });
    });

    expect(result.current.notifications).toHaveLength(3);

    act(() => {
      result.current.clearNotifications();
    });

    expect(result.current.notifications).toHaveLength(0);
  });

  it('알림이 지정된 시간 후 자동으로 제거되어야 한다', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.addNotification({
        type: 'success',
        message: '자동 제거 테스트',
        duration: 3000,
      });
    });

    expect(result.current.notifications).toHaveLength(1);

    // 3초 경과
    await act(async () => {
      vi.advanceTimersByTime(3000);
      // setTimeout 콜백이 실행될 시간을 줌
      await Promise.resolve();
    });

    expect(result.current.notifications).toHaveLength(0);

    vi.useRealTimers();
  });

  it('duration을 지정하지 않으면 기본 3초 후 제거되어야 한다', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.addNotification({
        type: 'info',
        message: '기본 duration 테스트',
      });
    });

    expect(result.current.notifications).toHaveLength(1);

    await act(async () => {
      vi.advanceTimersByTime(3000);
      await Promise.resolve();
    });

    expect(result.current.notifications).toHaveLength(0);

    vi.useRealTimers();
  });

  /**
   * [복합 시나리오 테스트]
   */
  it('여러 UI 상태를 동시에 관리할 수 있어야 한다', () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.setTheme('dark');
      result.current.toggleSidebar();
      result.current.openModal();
      result.current.addNotification({ type: 'success', message: '테스트' });
    });

    expect(result.current.theme).toBe('dark');
    expect(result.current.isSidebarOpen).toBe(true);
    expect(result.current.isModalOpen).toBe(true);
    expect(result.current.notifications).toHaveLength(1);
  });

  /**
   * [성능 테스트]
   */
  it('테마 변경이 50ms 이내에 완료되어야 한다', () => {
    const { result } = renderHook(() => useUIStore());

    const startTime = performance.now();

    act(() => {
      result.current.setTheme('dark');
    });

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(executionTime).toBeLessThan(50);
  });

  it('알림 추가가 50ms 이내에 완료되어야 한다', () => {
    const { result } = renderHook(() => useUIStore());

    const startTime = performance.now();

    act(() => {
      result.current.addNotification({ type: 'success', message: '성능 테스트' });
    });

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(executionTime).toBeLessThan(50);
  });
});
