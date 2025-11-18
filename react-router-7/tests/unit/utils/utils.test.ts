/**
 * 테스트 파일: utils.test.ts (React Router 7)
 * 용도: 유틸리티 함수 유닛 테스트
 *
 * [테스트 커버리지]
 * - 문자열 처리 함수
 * - 날짜/시간 포맷팅 함수
 * - 유효성 검사 함수
 * - 파일 크기 포맷팅
 * - 디바운스/쓰로틀
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  cn,
  formatNumber,
  formatDate,
  timeAgo,
  slugify,
  isValidEmail,
  formatFileSize,
  debounce,
  throttle,
  randomString,
  truncate,
  deepClone,
  removeEmptyValues,
  sleep,
} from '~/lib/utils';

describe('cn (className 결합)', () => {
  it('여러 클래스명을 공백으로 결합해야 한다', () => {
    expect(cn('class1', 'class2', 'class3')).toBe('class1 class2 class3');
  });

  it('false, null, undefined 값은 필터링되어야 한다', () => {
    expect(cn('class1', false, 'class2', null, 'class3', undefined)).toBe(
      'class1 class2 class3'
    );
  });

  it('빈 배열일 때 빈 문자열을 반환해야 한다', () => {
    expect(cn()).toBe('');
  });
});

describe('formatNumber (숫자 포맷팅)', () => {
  it('천 단위로 콤마를 추가해야 한다', () => {
    expect(formatNumber(1000)).toBe('1,000');
    expect(formatNumber(1000000)).toBe('1,000,000');
  });

  it('0을 올바르게 포맷팅해야 한다', () => {
    expect(formatNumber(0)).toBe('0');
  });

  it('음수를 올바르게 포맷팅해야 한다', () => {
    expect(formatNumber(-1000)).toBe('-1,000');
  });
});

describe('formatDate (날짜 포맷팅)', () => {
  it('Date 객체를 YYYY-MM-DD 형식으로 포맷팅해야 한다', () => {
    const date = new Date('2025-01-15T12:00:00');
    const formatted = formatDate(date);
    expect(formatted).toBe('2025-01-15');
  });

  it('문자열 날짜를 포맷팅해야 한다', () => {
    const formatted = formatDate('2025-01-15');
    expect(formatted).toBe('2025-01-15');
  });

  it('커스텀 포맷을 지원해야 한다', () => {
    const date = new Date('2025-01-15T14:30:45');
    const formatted = formatDate(date, 'YYYY-MM-DD HH:mm:ss');
    expect(formatted).toBe('2025-01-15 14:30:45');
  });

  it('유효하지 않은 날짜는 "Invalid Date"를 반환해야 한다', () => {
    expect(formatDate('invalid-date')).toBe('Invalid Date');
  });
});

describe('timeAgo (상대 시간)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('방금 전 메시지를 반환해야 한다', () => {
    const now = new Date('2025-01-15T12:00:00');
    vi.setSystemTime(now);

    const recentDate = new Date('2025-01-15T11:59:50');
    expect(timeAgo(recentDate)).toBe('방금 전');
  });

  it('분 단위 시간을 반환해야 한다', () => {
    const now = new Date('2025-01-15T12:00:00');
    vi.setSystemTime(now);

    const fiveMinutesAgo = new Date('2025-01-15T11:55:00');
    expect(timeAgo(fiveMinutesAgo)).toBe('5분 전');
  });

  it('시간 단위 시간을 반환해야 한다', () => {
    const now = new Date('2025-01-15T12:00:00');
    vi.setSystemTime(now);

    const twoHoursAgo = new Date('2025-01-15T10:00:00');
    expect(timeAgo(twoHoursAgo)).toBe('2시간 전');
  });

  it('일 단위 시간을 반환해야 한다', () => {
    const now = new Date('2025-01-15T12:00:00');
    vi.setSystemTime(now);

    const threeDaysAgo = new Date('2025-01-12T12:00:00');
    expect(timeAgo(threeDaysAgo)).toBe('3일 전');
  });

  it('주 단위 시간을 반환해야 한다', () => {
    const now = new Date('2025-01-15T12:00:00');
    vi.setSystemTime(now);

    const twoWeeksAgo = new Date('2025-01-01T12:00:00');
    expect(timeAgo(twoWeeksAgo)).toBe('2주 전');
  });
});

describe('slugify (슬러그 변환)', () => {
  it('공백을 하이픈으로 변환해야 한다', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('특수 문자를 제거해야 한다', () => {
    expect(slugify('Hello@World!')).toBe('helloworld');
  });

  it('연속된 하이픈을 하나로 합쳐야 한다', () => {
    expect(slugify('Hello   World')).toBe('hello-world');
  });

  it('앞뒤 하이픈을 제거해야 한다', () => {
    expect(slugify('  Hello World  ')).toBe('hello-world');
  });
});

describe('isValidEmail (이메일 검증)', () => {
  it('유효한 이메일을 true로 판단해야 한다', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name@company.co.kr')).toBe(true);
  });

  it('유효하지 않은 이메일을 false로 판단해야 한다', () => {
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('test@')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
  });
});

describe('formatFileSize (파일 크기 포맷팅)', () => {
  it('0 바이트를 올바르게 표시해야 한다', () => {
    expect(formatFileSize(0)).toBe('0 Bytes');
  });

  it('바이트 단위를 표시해야 한다', () => {
    expect(formatFileSize(500)).toBe('500 Bytes');
  });

  it('KB 단위를 표시해야 한다', () => {
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(2048)).toBe('2 KB');
  });

  it('MB 단위를 표시해야 한다', () => {
    const result = formatFileSize(1536 * 1024);
    expect(result).toContain('1.5');
    expect(result).toContain('MB');
  });
});

describe('debounce (디바운스)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('지정된 시간 후에 함수를 실행해야 한다', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 300);

    debouncedFn();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('연속 호출 시 마지막 호출만 실행되어야 한다', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 300);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('throttle (쓰로틀)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('지정된 시간 내에 한 번만 실행되어야 한다', () => {
    const fn = vi.fn();
    const throttledFn = throttle(fn, 300);

    throttledFn();
    expect(fn).toHaveBeenCalledTimes(1);

    throttledFn();
    throttledFn();
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(300);
    throttledFn();
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

describe('randomString (랜덤 문자열)', () => {
  it('지정된 길이의 문자열을 생성해야 한다', () => {
    const str = randomString(10);
    expect(str).toHaveLength(10);
  });

  it('영문자와 숫자만 포함해야 한다', () => {
    const str = randomString(50);
    expect(str).toMatch(/^[A-Za-z0-9]+$/);
  });

  it('매번 다른 문자열을 생성해야 한다', () => {
    const str1 = randomString(10);
    const str2 = randomString(10);
    expect(str1).not.toBe(str2);
  });
});

describe('truncate (텍스트 자르기)', () => {
  it('최대 길이보다 짧으면 그대로 반환해야 한다', () => {
    expect(truncate('Hello', 10)).toBe('Hello');
  });

  it('최대 길이를 초과하면 자르고 ... 을 추가해야 한다', () => {
    expect(truncate('Hello World', 5)).toBe('Hello...');
  });

  it('정확히 최대 길이일 때 그대로 반환해야 한다', () => {
    expect(truncate('Hello', 5)).toBe('Hello');
  });
});

describe('deepClone (깊은 복사)', () => {
  it('객체를 깊은 복사해야 한다', () => {
    const obj = { a: 1, b: { c: 2 } };
    const cloned = deepClone(obj);

    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.b).not.toBe(obj.b);
  });

  it('배열을 깊은 복사해야 한다', () => {
    const arr = [1, [2, 3], { a: 4 }];
    const cloned = deepClone(arr);

    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
  });

  it('Date 객체를 복사해야 한다', () => {
    const date = new Date('2025-01-15');
    const cloned = deepClone(date);

    expect(cloned).toEqual(date);
    expect(cloned).not.toBe(date);
  });

  it('null과 undefined를 올바르게 처리해야 한다', () => {
    expect(deepClone(null)).toBeNull();
    expect(deepClone(undefined)).toBeUndefined();
  });
});

describe('removeEmptyValues (빈 값 제거)', () => {
  it('null, undefined, 빈 문자열을 제거해야 한다', () => {
    const obj = {
      a: 'value',
      b: null,
      c: undefined,
      d: '',
      e: 0,
    };
    const result = removeEmptyValues(obj);
    expect(result).toEqual({ a: 'value', e: 0 });
  });

  it('0과 false는 유지되어야 한다', () => {
    const obj = {
      a: 0,
      b: false,
      c: null,
    };
    const result = removeEmptyValues(obj);
    expect(result).toEqual({ a: 0, b: false });
  });
});

describe('sleep (대기)', () => {
  it('지정된 시간 동안 대기해야 한다', async () => {
    const start = Date.now();
    await sleep(100);
    const end = Date.now();

    // 100ms 이상 걸려야 함 (약간의 오차 허용)
    expect(end - start).toBeGreaterThanOrEqual(90);
  });
});
