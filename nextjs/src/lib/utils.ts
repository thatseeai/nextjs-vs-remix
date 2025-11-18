/**
 * 파일명: utils.ts
 * 용도: 공통 유틸리티 함수 모음
 *
 * [Next.js 특징]
 * - 서버/클라이언트 양쪽에서 사용 가능한 순수 함수
 * - 트리 쉐이킹을 위해 각 함수를 개별 export
 *
 * [신입 개발자를 위한 설명]
 * 유틸리티 함수는 애플리케이션 전체에서 재사용되는 작은 도구들입니다.
 * 순수 함수로 작성하여 테스트하기 쉽고 예측 가능하게 만듭니다.
 * 각 함수는 하나의 명확한 목적을 가지며, 부수 효과가 없어야 합니다.
 */

/**
 * 클래스명을 조건부로 결합하는 함수
 * @param classes - 클래스명 문자열 배열
 * @returns 결합된 클래스명
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * 숫자를 한국식 형식으로 포맷팅 (예: 1000 -> 1,000)
 * @param num - 포맷팅할 숫자
 * @returns 포맷팅된 문자열
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ko-KR').format(num);
}

/**
 * 날짜를 한국식 형식으로 포맷팅 (예: 2025-01-01 14:30)
 * @param date - Date 객체 또는 날짜 문자열
 * @param includeTime - 시간 포함 여부
 * @returns 포맷팅된 날짜 문자열
 */
export function formatDate(date: Date | string, includeTime = false): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }

  return new Intl.DateTimeFormat('ko-KR', options).format(d);
}

/**
 * 상대 시간을 표시 (예: 3분 전, 2시간 전)
 * @param date - Date 객체 또는 날짜 문자열
 * @returns 상대 시간 문자열
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) return '방금 전';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}일 전`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}개월 전`;
  return `${Math.floor(diffInSeconds / 31536000)}년 전`;
}

/**
 * 문자열을 슬러그로 변환 (URL 친화적)
 * @param str - 변환할 문자열
 * @returns 슬러그 문자열
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * 이메일 유효성 검사
 * @param email - 검사할 이메일 주소
 * @returns 유효 여부
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 비밀번호 유효성 검사
 * 최소 8자, 대문자 1개, 소문자 1개, 숫자 1개 포함
 * @param password - 검사할 비밀번호
 * @returns 유효 여부
 */
export function isValidPassword(password: string): boolean {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

/**
 * 파일 크기를 읽기 쉬운 형식으로 변환
 * @param bytes - 바이트 단위 크기
 * @returns 포맷팅된 크기 문자열 (예: 1.5 MB)
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * 배열을 청크(덩어리)로 나누기
 * @param array - 원본 배열
 * @param size - 청크 크기
 * @returns 청크로 나뉜 2차원 배열
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * 배열에서 중복 제거
 * @param array - 원본 배열
 * @returns 중복이 제거된 배열
 */
export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

/**
 * 객체에서 빈 값 제거
 * @param obj - 원본 객체
 * @returns 빈 값이 제거된 객체
 */
export function removeEmpty<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
}

/**
 * 깊은 복사 (Deep Clone)
 * @param obj - 복사할 객체
 * @returns 깊은 복사된 객체
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 디바운스 함수
 * @param func - 실행할 함수
 * @param delay - 지연 시간 (ms)
 * @returns 디바운스된 함수
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * 쓰로틀 함수
 * @param func - 실행할 함수
 * @param limit - 제한 시간 (ms)
 * @returns 쓰로틀된 함수
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * 랜덤 문자열 생성
 * @param length - 문자열 길이
 * @returns 랜덤 문자열
 */
export function randomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 텍스트 자르기 (말줄임표 추가)
 * @param text - 원본 텍스트
 * @param maxLength - 최대 길이
 * @returns 자른 텍스트
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * 쿼리 파라미터 객체를 URL 문자열로 변환
 * @param params - 쿼리 파라미터 객체
 * @returns URL 쿼리 문자열
 */
export function objectToQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
}

/**
 * 비동기 함수에 재시도 로직 추가
 * @param fn - 실행할 비동기 함수
 * @param retries - 재시도 횟수
 * @param delay - 재시도 간 지연 시간 (ms)
 * @returns Promise
 */
export async function retry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return retry(fn, retries - 1, delay);
    }
    throw error;
  }
}
