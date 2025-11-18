/**
 * 테스트 파일: authStore.test.ts
 * 용도: Zustand 인증 스토어 유닛 테스트
 *
 * [테스트 커버리지]
 * - 로그인 액션
 * - 로그아웃 액션
 * - 사용자 정보 업데이트
 * - 인증 상태 확인
 * - 로컬 스토리지 연동
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { useAuthStore, type User } from '@/store/authStore';
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

// fetch API 모킹
global.fetch = vi.fn();

describe('authStore - 인증 스토어', () => {
  beforeEach(() => {
    // 각 테스트 전에 스토어 초기화
    const { result } = renderHook(() => useAuthStore());
    act(() => {
      result.current.logout();
    });

    // 로컬 스토리지 초기화
    localStorageMock.clear();
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    // fetch 모킹 초기화
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  /**
   * [초기 상태 테스트]
   */
  it('초기 상태가 올바르게 설정되어야 한다', () => {
    const { result } = renderHook(() => useAuthStore());

    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  /**
   * [로그인 액션 테스트]
   */
  it('로그인 시 사용자 정보와 토큰이 저장되어야 한다', () => {
    const { result } = renderHook(() => useAuthStore());

    const mockUser: User = {
      id: '1',
      email: 'test@example.com',
      name: '테스트 사용자',
      role: 'user',
    };
    const mockToken = 'test-jwt-token';

    act(() => {
      result.current.login(mockUser, mockToken);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.token).toBe(mockToken);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it('로그인 시 토큰이 로컬 스토리지에 저장되어야 한다', () => {
    const { result } = renderHook(() => useAuthStore());

    const mockUser: User = {
      id: '1',
      email: 'test@example.com',
      name: '홍길동',
    };
    const mockToken = 'jwt-token-123';

    act(() => {
      result.current.login(mockUser, mockToken);
    });

    expect(localStorageMock.getItem('auth_token')).toBe(mockToken);
  });

  /**
   * [로그아웃 액션 테스트]
   */
  it('로그아웃 시 모든 상태가 초기화되어야 한다', () => {
    const { result } = renderHook(() => useAuthStore());

    // 먼저 로그인
    const mockUser: User = {
      id: '1',
      email: 'test@example.com',
      name: '테스트',
    };
    act(() => {
      result.current.login(mockUser, 'token');
    });

    // 로그아웃
    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('로그아웃 시 로컬 스토리지에서 토큰이 제거되어야 한다', () => {
    const { result } = renderHook(() => useAuthStore());

    // 로그인 후 로그아웃
    act(() => {
      result.current.login({ id: '1', email: 'test@test.com', name: 'Test' }, 'token');
      result.current.logout();
    });

    expect(localStorageMock.getItem('auth_token')).toBeNull();
  });

  /**
   * [사용자 정보 업데이트 테스트]
   */
  it('사용자 정보를 부분적으로 업데이트할 수 있어야 한다', () => {
    const { result } = renderHook(() => useAuthStore());

    const mockUser: User = {
      id: '1',
      email: 'old@example.com',
      name: '이전 이름',
      role: 'user',
    };

    act(() => {
      result.current.login(mockUser, 'token');
    });

    // 이름만 업데이트
    act(() => {
      result.current.updateUser({ name: '새 이름' });
    });

    expect(result.current.user?.name).toBe('새 이름');
    expect(result.current.user?.email).toBe('old@example.com'); // 다른 필드는 유지
    expect(result.current.user?.id).toBe('1');
  });

  it('사용자가 로그인하지 않은 상태에서 updateUser는 무시되어야 한다', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.updateUser({ name: '새 이름' });
    });

    expect(result.current.user).toBeNull();
  });

  it('여러 필드를 동시에 업데이트할 수 있어야 한다', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.login(
        { id: '1', email: 'old@test.com', name: 'Old Name' },
        'token'
      );
    });

    act(() => {
      result.current.updateUser({
        email: 'new@test.com',
        name: 'New Name',
        avatar: 'https://example.com/avatar.jpg',
      });
    });

    expect(result.current.user).toEqual({
      id: '1',
      email: 'new@test.com',
      name: 'New Name',
      avatar: 'https://example.com/avatar.jpg',
    });
  });

  /**
   * [로딩 상태 테스트]
   */
  it('로딩 상태를 변경할 수 있어야 한다', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.setLoading(false);
    });

    expect(result.current.isLoading).toBe(false);
  });

  /**
   * [인증 상태 확인 테스트]
   */
  it('토큰이 없으면 인증 확인 시 로그아웃 상태로 설정되어야 한다', async () => {
    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.checkAuth();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('유효한 토큰이 있으면 사용자 정보를 가져와야 한다', async () => {
    const { result } = renderHook(() => useAuthStore());

    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: '테스트 사용자',
    };

    // 먼저 로그인하여 토큰 설정
    act(() => {
      result.current.login(mockUser, 'valid-token');
    });

    // fetch 모킹
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    await act(async () => {
      await result.current.checkAuth();
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/auth/me', {
      headers: {
        Authorization: 'Bearer valid-token',
      },
    });
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('유효하지 않은 토큰이면 로그아웃되어야 한다', async () => {
    const { result } = renderHook(() => useAuthStore());

    // 로그인
    act(() => {
      result.current.login(
        { id: '1', email: 'test@test.com', name: 'Test' },
        'invalid-token'
      );
    });

    // fetch 실패 응답 모킹
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 401,
    });

    await act(async () => {
      await result.current.checkAuth();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
  });

  it('인증 확인 중 네트워크 오류 발생 시 로그아웃되어야 한다', async () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.login(
        { id: '1', email: 'test@test.com', name: 'Test' },
        'token'
      );
    });

    // fetch 에러 모킹
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    // console.error 모킹 (에러 로그 숨기기)
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await act(async () => {
      await result.current.checkAuth();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();

    consoleErrorSpy.mockRestore();
  });

  /**
   * [역할(Role) 관련 테스트]
   */
  it('사용자 역할을 올바르게 저장해야 한다', () => {
    const { result } = renderHook(() => useAuthStore());

    const adminUser: User = {
      id: '1',
      email: 'admin@example.com',
      name: '관리자',
      role: 'admin',
    };

    act(() => {
      result.current.login(adminUser, 'token');
    });

    expect(result.current.user?.role).toBe('admin');
  });

  it('역할을 업데이트할 수 있어야 한다', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.login(
        { id: '1', email: 'user@test.com', name: 'User', role: 'user' },
        'token'
      );
    });

    act(() => {
      result.current.updateUser({ role: 'admin' });
    });

    expect(result.current.user?.role).toBe('admin');
  });

  /**
   * [복합 시나리오 테스트]
   */
  it('로그인 -> 정보 업데이트 -> 로그아웃 플로우가 정상 동작해야 한다', () => {
    const { result } = renderHook(() => useAuthStore());

    // 1. 로그인
    act(() => {
      result.current.login(
        { id: '1', email: 'test@example.com', name: '홍길동' },
        'token-123'
      );
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user?.name).toBe('홍길동');

    // 2. 사용자 정보 업데이트
    act(() => {
      result.current.updateUser({
        name: '김철수',
        avatar: 'https://example.com/avatar.jpg',
      });
    });

    expect(result.current.user?.name).toBe('김철수');
    expect(result.current.user?.avatar).toBe('https://example.com/avatar.jpg');

    // 3. 로그아웃
    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(localStorageMock.getItem('auth_token')).toBeNull();
  });

  /**
   * [성능 테스트]
   */
  it('로그인 액션이 50ms 이내에 완료되어야 한다', () => {
    const { result } = renderHook(() => useAuthStore());

    const startTime = performance.now();

    act(() => {
      result.current.login(
        { id: '1', email: 'test@test.com', name: 'Test' },
        'token'
      );
    });

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(executionTime).toBeLessThan(50);
  });

  it('로그아웃 액션이 50ms 이내에 완료되어야 한다', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.login(
        { id: '1', email: 'test@test.com', name: 'Test' },
        'token'
      );
    });

    const startTime = performance.now();

    act(() => {
      result.current.logout();
    });

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    expect(executionTime).toBeLessThan(50);
  });
});
