/**
 * 파일명: api.ts
 * 용도: API 호출 유틸리티 함수
 *
 * [Next.js 특징]
 * - fetch API를 래핑하여 일관된 에러 처리 제공
 * - 서버/클라이언트 양쪽에서 사용 가능
 * - TypeScript 제네릭을 활용한 타입 안정성
 *
 * [신입 개발자를 위한 설명]
 * API 유틸리티는 서버와 통신하는 모든 요청을 표준화합니다.
 * 에러 처리, 인증 토큰 추가, 응답 파싱 등을 자동으로 처리하여
 * 비즈니스 로직에서는 간단하게 API를 호출할 수 있습니다.
 */

import { HTTP_STATUS, ERROR_MESSAGES } from './constants';

/**
 * API 에러 클래스
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * API 응답 타입
 */
interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

/**
 * 기본 fetch 옵션
 */
const defaultOptions: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // 쿠키 포함
};

/**
 * 공통 fetch 함수
 * @param url - 요청 URL
 * @param options - fetch 옵션
 * @returns Promise<T>
 */
async function fetchApi<T>(url: string, options: RequestInit = {}): Promise<T> {
  try {
    // 토큰이 있으면 헤더에 추가 (클라이언트 사이드)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }

    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    });

    // 응답 본문 파싱
    let data: ApiResponse<T>;
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = { data: (await response.text()) as any };
    }

    // HTTP 상태 코드 체크
    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.error || data.message || getErrorMessage(response.status),
        data
      );
    }

    return data.data as T;
  } catch (error) {
    // ApiError는 그대로 전달
    if (error instanceof ApiError) {
      throw error;
    }

    // 네트워크 에러 등
    if (error instanceof Error) {
      throw new ApiError(0, error.message || ERROR_MESSAGES.NETWORK_ERROR);
    }

    // 알 수 없는 에러
    throw new ApiError(0, ERROR_MESSAGES.SERVER_ERROR);
  }
}

/**
 * HTTP 상태 코드에 따른 에러 메시지 반환
 */
function getErrorMessage(status: number): string {
  switch (status) {
    case HTTP_STATUS.BAD_REQUEST:
      return ERROR_MESSAGES.VALIDATION_ERROR;
    case HTTP_STATUS.UNAUTHORIZED:
      return ERROR_MESSAGES.UNAUTHORIZED;
    case HTTP_STATUS.FORBIDDEN:
      return ERROR_MESSAGES.FORBIDDEN;
    case HTTP_STATUS.NOT_FOUND:
      return ERROR_MESSAGES.NOT_FOUND;
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      return ERROR_MESSAGES.SERVER_ERROR;
    default:
      return ERROR_MESSAGES.NETWORK_ERROR;
  }
}

/**
 * GET 요청
 * @param url - 요청 URL
 * @param params - 쿼리 파라미터 (선택)
 * @returns Promise<T>
 */
export async function get<T>(url: string, params?: Record<string, any>): Promise<T> {
  let fullUrl = url;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    fullUrl = queryString ? `${url}?${queryString}` : url;
  }

  return fetchApi<T>(fullUrl, { method: 'GET' });
}

/**
 * POST 요청
 * @param url - 요청 URL
 * @param body - 요청 본문
 * @returns Promise<T>
 */
export async function post<T>(url: string, body?: any): Promise<T> {
  return fetchApi<T>(url, {
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * PUT 요청
 * @param url - 요청 URL
 * @param body - 요청 본문
 * @returns Promise<T>
 */
export async function put<T>(url: string, body?: any): Promise<T> {
  return fetchApi<T>(url, {
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * PATCH 요청
 * @param url - 요청 URL
 * @param body - 요청 본문
 * @returns Promise<T>
 */
export async function patch<T>(url: string, body?: any): Promise<T> {
  return fetchApi<T>(url, {
    method: 'PATCH',
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * DELETE 요청
 * @param url - 요청 URL
 * @returns Promise<T>
 */
export async function del<T>(url: string): Promise<T> {
  return fetchApi<T>(url, { method: 'DELETE' });
}

/**
 * 파일 업로드 (FormData 사용)
 * @param url - 요청 URL
 * @param formData - FormData 객체
 * @returns Promise<T>
 */
export async function upload<T>(url: string, formData: FormData): Promise<T> {
  try {
    // 파일 업로드 시 Content-Type을 자동 설정하도록 제거
    const options: RequestInit = {
      method: 'POST',
      body: formData,
      credentials: 'include',
    };

    // 토큰이 있으면 헤더에 추가
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        options.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
    }

    const response = await fetch(url, options);
    const data: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.error || data.message || getErrorMessage(response.status),
        data
      );
    }

    return data.data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(0, ERROR_MESSAGES.NETWORK_ERROR);
  }
}

/**
 * 타입별 API 함수들
 */
export const api = {
  get,
  post,
  put,
  patch,
  delete: del,
  upload,
};
