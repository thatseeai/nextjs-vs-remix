/**
 * 파일명: api.ts
 * 용도: API 호출을 위한 유틸리티 함수
 *
 * [Remix v2 특징]
 * - 클라이언트 사이드에서 API 호출 시 사용
 * - loader와 action에서도 활용 가능
 * - TypeScript를 통한 타입 안정성
 *
 * [신입 개발자를 위한 설명]
 * API 함수는 서버와 데이터를 주고받는 역할을 합니다.
 * fetch API를 래핑하여 사용하기 쉽게 만들었습니다.
 *
 * 주요 기능:
 * 1. 자동 헤더 설정 (Content-Type, Authorization 등)
 * 2. 에러 처리
 * 3. 타임아웃 설정
 * 4. 요청/응답 인터셉터
 */

import { API_BASE_URL, API_TIMEOUT, HTTP_STATUS } from "./constants";

/**
 * [API 응답 타입]
 * API 응답의 타입을 정의합니다.
 */
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
}

/**
 * [API 에러 클래스]
 * API 호출 중 발생하는 에러를 처리하는 커스텀 에러 클래스
 */
export class ApiError extends Error {
  status: number;
  data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * [요청 옵션 타입]
 */
interface RequestOptions extends RequestInit {
  timeout?: number;
  token?: string;
}

/**
 * [API 클라이언트 생성]
 * fetch를 래핑하여 공통 로직을 처리합니다.
 *
 * @param url - 요청 URL
 * @param options - 요청 옵션
 * @returns API 응답
 */
async function request<T = any>(
  url: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    timeout = API_TIMEOUT,
    token,
    headers = {},
    ...restOptions
  } = options;

  /**
   * [타임아웃 처리]
   * AbortController를 사용하여 타임아웃을 구현합니다.
   */
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  /**
   * [헤더 설정]
   * - Content-Type: JSON 요청
   * - Authorization: 토큰이 있으면 Bearer 토큰 추가
   */
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string>),
  };

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  try {
    /**
     * [fetch 호출]
     * 실제 HTTP 요청을 수행합니다.
     */
    const response = await fetch(url, {
      ...restOptions,
      headers: defaultHeaders,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    /**
     * [응답 파싱]
     * Content-Type에 따라 응답을 파싱합니다.
     */
    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    /**
     * [에러 처리]
     * HTTP 상태 코드가 200번대가 아니면 에러로 처리합니다.
     */
    if (!response.ok) {
      throw new ApiError(
        data.message || data.error || "요청 처리 중 오류가 발생했습니다.",
        response.status,
        data
      );
    }

    return {
      data,
      status: response.status,
    };
  } catch (error) {
    clearTimeout(timeoutId);

    /**
     * [에러 타입별 처리]
     */
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new ApiError("요청 시간이 초과되었습니다.", 408);
      }
      throw new ApiError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }

    throw new ApiError(
      "알 수 없는 오류가 발생했습니다.",
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
}

/**
 * [GET 요청]
 * 데이터를 조회할 때 사용합니다.
 *
 * @param url - 요청 URL
 * @param options - 요청 옵션
 * @returns API 응답
 *
 * @example
 * const response = await api.get("/api/posts");
 */
export async function get<T = any>(
  url: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  return request<T>(url, { ...options, method: "GET" });
}

/**
 * [POST 요청]
 * 새로운 데이터를 생성할 때 사용합니다.
 *
 * @param url - 요청 URL
 * @param data - 전송할 데이터
 * @param options - 요청 옵션
 * @returns API 응답
 *
 * @example
 * const response = await api.post("/api/posts", { title: "제목", content: "내용" });
 */
export async function post<T = any>(
  url: string,
  data?: any,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  return request<T>(url, {
    ...options,
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * [PUT 요청]
 * 기존 데이터를 전체 수정할 때 사용합니다.
 *
 * @param url - 요청 URL
 * @param data - 전송할 데이터
 * @param options - 요청 옵션
 * @returns API 응답
 */
export async function put<T = any>(
  url: string,
  data?: any,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  return request<T>(url, {
    ...options,
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * [PATCH 요청]
 * 기존 데이터를 부분 수정할 때 사용합니다.
 *
 * @param url - 요청 URL
 * @param data - 전송할 데이터
 * @param options - 요청 옵션
 * @returns API 응답
 */
export async function patch<T = any>(
  url: string,
  data?: any,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  return request<T>(url, {
    ...options,
    method: "PATCH",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * [DELETE 요청]
 * 데이터를 삭제할 때 사용합니다.
 *
 * @param url - 요청 URL
 * @param options - 요청 옵션
 * @returns API 응답
 */
export async function del<T = any>(
  url: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  return request<T>(url, { ...options, method: "DELETE" });
}

/**
 * [파일 업로드]
 * FormData를 사용하여 파일을 업로드합니다.
 *
 * @param url - 요청 URL
 * @param formData - FormData 객체
 * @param options - 요청 옵션
 * @returns API 응답
 */
export async function upload<T = any>(
  url: string,
  formData: FormData,
  options: Omit<RequestOptions, "headers"> = {}
): Promise<ApiResponse<T>> {
  const { token, ...restOptions } = options;

  const headers: HeadersInit = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return request<T>(url, {
    ...restOptions,
    method: "POST",
    headers,
    body: formData,
  });
}

/**
 * [API 클라이언트 객체]
 * 모든 HTTP 메서드를 포함하는 객체
 */
export const api = {
  get,
  post,
  put,
  patch,
  delete: del,
  upload,
};

