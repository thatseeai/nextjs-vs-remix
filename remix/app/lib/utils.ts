/**
 * 파일명: utils.ts
 * 용도: 애플리케이션 전역에서 사용되는 유틸리티 함수
 *
 * [Remix v2 특징]
 * - 서버와 클라이언트에서 모두 사용 가능
 * - TypeScript를 활용한 타입 안정성
 *
 * [신입 개발자를 위한 설명]
 * 유틸리티 함수는 여러 곳에서 반복적으로 사용되는 기능을
 * 재사용 가능한 함수로 만든 것입니다.
 *
 * 장점:
 * 1. 코드 중복 방지
 * 2. 유지보수 용이
 * 3. 테스트 가능
 * 4. 가독성 향상
 */

import { REGEX_PATTERNS } from "./constants";

/**
 * [클래스명 결합]
 * 여러 클래스명을 조건부로 결합하는 함수
 *
 * @param classes - 결합할 클래스명들
 * @returns 결합된 클래스명 문자열
 *
 * @example
 * cn("base-class", isActive && "active", "another-class")
 * // "base-class active another-class"
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * [날짜 포맷팅]
 * Date 객체를 원하는 형식의 문자열로 변환
 *
 * @param date - 포맷팅할 Date 객체 또는 날짜 문자열
 * @param format - 날짜 포맷 (기본값: "YYYY-MM-DD")
 * @returns 포맷팅된 날짜 문자열
 *
 * @example
 * formatDate(new Date(), "YYYY-MM-DD HH:mm")
 * // "2024-01-15 14:30"
 */
export function formatDate(
  date: Date | string,
  format: string = "YYYY-MM-DD"
): string {
  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) {
    return "Invalid Date";
  }

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  return format
    .replace("YYYY", String(year))
    .replace("MM", month)
    .replace("DD", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
}

/**
 * [상대 시간 표시]
 * "3분 전", "2시간 전" 등으로 표시
 *
 * @param date - 기준 날짜
 * @returns 상대 시간 문자열
 */
export function timeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (seconds < 60) return "방금 전";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}분 전`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}시간 전`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}일 전`;
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)}주 전`;
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)}개월 전`;
  return `${Math.floor(seconds / 31536000)}년 전`;
}

/**
 * [문자열 트리밍]
 * 지정된 길이로 문자열을 자르고 "..." 추가
 *
 * @param str - 자를 문자열
 * @param maxLength - 최대 길이
 * @returns 잘린 문자열
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

/**
 * [이메일 유효성 검사]
 * 이메일 형식이 올바른지 확인
 *
 * @param email - 검사할 이메일 주소
 * @returns 유효하면 true, 아니면 false
 */
export function isValidEmail(email: string): boolean {
  return REGEX_PATTERNS.EMAIL.test(email);
}

/**
 * [전화번호 유효성 검사]
 * 한국 전화번호 형식이 올바른지 확인
 *
 * @param phone - 검사할 전화번호
 * @returns 유효하면 true, 아니면 false
 */
export function isValidPhone(phone: string): boolean {
  return REGEX_PATTERNS.PHONE.test(phone);
}

/**
 * [URL 유효성 검사]
 * URL 형식이 올바른지 확인
 *
 * @param url - 검사할 URL
 * @returns 유효하면 true, 아니면 false
 */
export function isValidUrl(url: string): boolean {
  return REGEX_PATTERNS.URL.test(url);
}

/**
 * [숫자 포맷팅]
 * 숫자를 천 단위 구분 기호가 있는 문자열로 변환
 *
 * @param num - 포맷팅할 숫자
 * @returns 포맷팅된 문자열
 *
 * @example
 * formatNumber(1234567)
 * // "1,234,567"
 */
export function formatNumber(num: number): string {
  return num.toLocaleString("ko-KR");
}

/**
 * [파일 크기 포맷팅]
 * 바이트를 사람이 읽기 쉬운 형식으로 변환
 *
 * @param bytes - 바이트 수
 * @returns 포맷팅된 파일 크기 문자열
 *
 * @example
 * formatFileSize(1536)
 * // "1.5 KB"
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

/**
 * [디바운스]
 * 함수 호출을 지연시켜 과도한 호출을 방지
 *
 * @param func - 디바운스할 함수
 * @param delay - 지연 시간 (밀리초)
 * @returns 디바운스된 함수
 *
 * @example
 * const debouncedSearch = debounce((query) => search(query), 300);
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * [쓰로틀]
 * 함수가 일정 시간 내에 한 번만 실행되도록 제한
 *
 * @param func - 쓰로틀할 함수
 * @param limit - 제한 시간 (밀리초)
 * @returns 쓰로틀된 함수
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * [딥 클론]
 * 객체를 깊은 복사
 *
 * @param obj - 복사할 객체
 * @returns 복사된 객체
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any;
  }

  if (obj instanceof Array) {
    return obj.map((item) => deepClone(item)) as any;
  }

  if (obj instanceof Object) {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }

  return obj;
}

/**
 * [슬러그 생성]
 * 문자열을 URL 친화적인 슬러그로 변환
 *
 * @param str - 변환할 문자열
 * @returns 슬러그 문자열
 *
 * @example
 * slugify("Hello World!")
 * // "hello-world"
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * [랜덤 문자열 생성]
 * 지정된 길이의 랜덤 문자열 생성
 *
 * @param length - 생성할 문자열 길이
 * @returns 랜덤 문자열
 */
export function randomString(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * [배열 셔플]
 * 배열의 순서를 무작위로 섞음
 *
 * @param array - 셔플할 배열
 * @returns 셔플된 배열
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * [객체에서 빈 값 제거]
 * 객체에서 null, undefined, 빈 문자열을 제거
 *
 * @param obj - 정리할 객체
 * @returns 정리된 객체
 */
export function removeEmptyValues<T extends Record<string, any>>(
  obj: T
): Partial<T> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
}

/**
 * [sleep]
 * 지정된 시간 동안 대기
 *
 * @param ms - 대기 시간 (밀리초)
 * @returns Promise
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
