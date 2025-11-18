/**
 * 테스트 파일: utils.test.ts
 * 용도: 유틸리티 함수 유닛 테스트
 *
 * [테스트 커버리지]
 * - 문자열 처리 함수
 * - 날짜/시간 포맷팅 함수
 * - 유효성 검사 함수
 * - 배열/객체 처리 함수
 * - 비동기 함수
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  cn,
  formatNumber,
  formatDate,
  formatRelativeTime,
  slugify,
  isValidEmail,
  isValidPassword,
  formatFileSize,
  chunk,
  unique,
  removeEmpty,
  deepClone,
  debounce,
  throttle,
  randomString,
  truncate,
  objectToQueryString,
  retry,
} from '@/lib/utils';

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
  it('Date 객체를 한국식 날짜로 포맷팅해야 한다', () => {
    const date = new Date('2025-01-15');
    const formatted = formatDate(date);
    expect(formatted).toContain('2025');
    expect(formatted).toContain('01');
    expect(formatted).toContain('15');
  });

  it('문자열 날짜를 포맷팅해야 한다', () => {
    const formatted = formatDate('2025-01-15');
    expect(formatted).toContain('2025');
  });

  it('includeTime이 true일 때 시간을 포함해야 한다', () => {
    const date = new Date('2025-01-15T14:30:00');
    const formatted = formatDate(date, true);
    expect(formatted).toContain('14');
    expect(formatted).toContain('30');
  });
});

describe('formatRelativeTime (상대 시간)', () => {
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
    expect(formatRelativeTime(recentDate)).toBe('방금 전');
  });

  it('분 단위 시간을 반환해야 한다', () => {
    const now = new Date('2025-01-15T12:00:00');
    vi.setSystemTime(now);

    const fiveMinutesAgo = new Date('2025-01-15T11:55:00');
    expect(formatRelativeTime(fiveMinutesAgo)).toBe('5분 전');
  });

  it('시간 단위 시간을 반환해야 한다', () => {
    const now = new Date('2025-01-15T12:00:00');
    vi.setSystemTime(now);

    const twoHoursAgo = new Date('2025-01-15T10:00:00');
    expect(formatRelativeTime(twoHoursAgo)).toBe('2시간 전');
  });

  it('일 단위 시간을 반환해야 한다', () => {
    const now = new Date('2025-01-15T12:00:00');
    vi.setSystemTime(now);

    const threeDaysAgo = new Date('2025-01-12T12:00:00');
    expect(formatRelativeTime(threeDaysAgo)).toBe('3일 전');
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
    expect(isValidEmail('test @example.com')).toBe(false);
  });
});

describe('isValidPassword (비밀번호 검증)', () => {
  it('유효한 비밀번호를 true로 판단해야 한다', () => {
    expect(isValidPassword('Password123')).toBe(true);
    expect(isValidPassword('Abcdefg1')).toBe(true);
  });

  it('8자 미만은 false를 반환해야 한다', () => {
    expect(isValidPassword('Pass1')).toBe(false);
  });

  it('대문자가 없으면 false를 반환해야 한다', () => {
    expect(isValidPassword('password123')).toBe(false);
  });

  it('소문자가 없으면 false를 반환해야 한다', () => {
    expect(isValidPassword('PASSWORD123')).toBe(false);
  });

  it('숫자가 없으면 false를 반환해야 한다', () => {
    expect(isValidPassword('PasswordOnly')).toBe(false);
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
    expect(formatFileSize(1024 * 1024)).toBe('1 MB');
    expect(formatFileSize(1536 * 1024)).toBe('1.5 MB');
  });

  it('GB 단위를 표시해야 한다', () => {
    expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB');
  });
});

describe('chunk (배열 청크)', () => {
  it('배열을 지정된 크기로 나눠야 한다', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const result = chunk(array, 2);
    expect(result).toEqual([[1, 2], [3, 4], [5, 6]]);
  });

  it('나눠떨어지지 않는 경우 마지막 청크는 작아야 한다', () => {
    const array = [1, 2, 3, 4, 5];
    const result = chunk(array, 2);
    expect(result).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('빈 배열은 빈 배열을 반환해야 한다', () => {
    expect(chunk([], 2)).toEqual([]);
  });
});

describe('unique (중복 제거)', () => {
  it('배열에서 중복을 제거해야 한다', () => {
    expect(unique([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
  });

  it('문자열 배열에서 중복을 제거해야 한다', () => {
    expect(unique(['a', 'b', 'b', 'c'])).toEqual(['a', 'b', 'c']);
  });

  it('중복이 없는 배열은 그대로 반환해야 한다', () => {
    expect(unique([1, 2, 3])).toEqual([1, 2, 3]);
  });
});

describe('removeEmpty (빈 값 제거)', () => {
  it('null, undefined, 빈 문자열을 제거해야 한다', () => {
    const obj = {
      a: 'value',
      b: null,
      c: undefined,
      d: '',
      e: 0,
    };
    const result = removeEmpty(obj);
    expect(result).toEqual({ a: 'value', e: 0 });
  });

  it('0과 false는 유지되어야 한다', () => {
    const obj = {
      a: 0,
      b: false,
      c: null,
    };
    const result = removeEmpty(obj);
    expect(result).toEqual({ a: 0, b: false });
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

describe('objectToQueryString (쿼리 문자열 변환)', () => {
  it('객체를 쿼리 문자열로 변환해야 한다', () => {
    const params = { name: 'John', age: 30 };
    const query = objectToQueryString(params);
    expect(query).toContain('name=John');
    expect(query).toContain('age=30');
  });

  it('null과 undefined 값은 제외해야 한다', () => {
    const params = { name: 'John', age: null, city: undefined };
    const query = objectToQueryString(params);
    expect(query).toBe('name=John');
  });

  it('빈 객체는 빈 문자열을 반환해야 한다', () => {
    expect(objectToQueryString({})).toBe('');
  });
});

describe('retry (재시도)', () => {
  it('성공하면 결과를 반환해야 한다', async () => {
    const fn = vi.fn().mockResolvedValue('success');
    const result = await retry(fn, 3, 100);

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('실패하면 지정된 횟수만큼 재시도해야 한다', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('fail'));

    await expect(retry(fn, 3, 100)).rejects.toThrow('fail');
    expect(fn).toHaveBeenCalledTimes(4); // 초기 1회 + 재시도 3회
  });

  it('재시도 중 성공하면 결과를 반환해야 한다', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('success');

    const result = await retry(fn, 3, 100);

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(3);
  });
});
