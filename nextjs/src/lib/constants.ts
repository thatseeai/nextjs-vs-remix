/**
 * 파일명: constants.ts
 * 용도: 애플리케이션 전역 상수 정의
 *
 * [Next.js 특징]
 * - 환경 변수와 하드코딩된 값을 분리하여 관리
 * - TypeScript의 as const를 사용하여 타입 안정성 확보
 *
 * [신입 개발자를 위한 설명]
 * 상수 파일은 애플리케이션에서 반복적으로 사용되는 값들을 한 곳에서 관리합니다.
 * 이렇게 하면 값을 수정할 때 한 곳만 변경하면 되므로 유지보수가 쉬워집니다.
 * 또한 오타를 방지하고 IDE의 자동완성 기능을 활용할 수 있습니다.
 */

// API 관련 상수
export const API_ROUTES = {
  POSTS: '/api/posts',
  POST_BY_ID: (id: string) => `/api/posts/${id}`,
  AUTH_LOGIN: '/api/auth/login',
  AUTH_REGISTER: '/api/auth/register',
  AUTH_LOGOUT: '/api/auth/logout',
  UPLOAD: '/api/upload',
} as const;

// 페이지 라우트
export const PAGE_ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  POSTS: '/posts',
  POST_DETAIL: (id: string) => `/posts/${id}`,
  BLOG: '/blog',
  DASHBOARD: '/dashboard',
  DASHBOARD_PROFILE: '/dashboard/profile',
  LOGIN: '/login',
  REGISTER: '/register',
  CLIENT_DEMO: '/client-demo',
} as const;

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

// 에러 메시지
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 오류가 발생했습니다.',
  UNAUTHORIZED: '로그인이 필요합니다.',
  FORBIDDEN: '접근 권한이 없습니다.',
  NOT_FOUND: '요청한 리소스를 찾을 수 없습니다.',
  SERVER_ERROR: '서버 오류가 발생했습니다.',
  VALIDATION_ERROR: '입력값을 확인해주세요.',
  INVALID_CREDENTIALS: '이메일 또는 비밀번호가 올바르지 않습니다.',
} as const;

// 성공 메시지
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: '로그인에 성공했습니다.',
  LOGOUT_SUCCESS: '로그아웃되었습니다.',
  REGISTER_SUCCESS: '회원가입이 완료되었습니다.',
  POST_CREATED: '게시글이 작성되었습니다.',
  POST_UPDATED: '게시글이 수정되었습니다.',
  POST_DELETED: '게시글이 삭제되었습니다.',
  UPLOAD_SUCCESS: '파일이 업로드되었습니다.',
} as const;

// 페이지당 아이템 수
export const PAGINATION = {
  POSTS_PER_PAGE: 10,
  COMMENTS_PER_PAGE: 20,
} as const;

// JWT 관련
export const JWT = {
  EXPIRES_IN: '7d', // 7일
  COOKIE_NAME: 'token',
  COOKIE_MAX_AGE: 60 * 60 * 24 * 7, // 7일 (초 단위)
} as const;

// 파일 업로드 제한
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
} as const;

// 정규 표현식
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  // 최소 8자, 대문자 1개, 소문자 1개, 숫자 1개
  PHONE: /^01[016789]-?\d{3,4}-?\d{4}$/,
} as const;

// HTTP 상태 코드
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// 언어 옵션
export const LANGUAGES = {
  KO: 'ko',
  EN: 'en',
} as const;

// 테마 옵션
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

// 기본값
export const DEFAULTS = {
  LANGUAGE: LANGUAGES.KO,
  THEME: THEMES.LIGHT,
} as const;
