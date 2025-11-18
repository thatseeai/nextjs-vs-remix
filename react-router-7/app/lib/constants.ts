/**
 * 파일명: constants.ts
 * 용도: 애플리케이션 전역 상수 정의
 *
 * [React Router 7 특징]
 * - 서버와 클라이언트에서 모두 사용 가능한 상수
 * - 타입 안정성을 위한 TypeScript 활용
 * - Vite 환경 변수 사용 (PUBLIC_ 접두사)
 *
 * [Remix와의 차이점]
 * - 환경 변수: PUBLIC_ 접두사 사용 (Vite 규칙)
 * - 패키지명은 다르지만 상수 정의 방식은 동일
 *
 * [신입 개발자를 위한 설명]
 * 상수는 애플리케이션 전체에서 변하지 않는 값들을 정의합니다.
 * 하드코딩을 피하고, 유지보수를 쉽게 하기 위해 한 곳에서 관리합니다.
 *
 * 장점:
 * 1. 코드 중복 방지
 * 2. 값 변경 시 한 곳만 수정
 * 3. 오타 방지 (자동완성 지원)
 * 4. 타입 안정성 확보
 */

/**
 * [애플리케이션 메타데이터]
 * SEO 및 소셜 미디어 공유에 사용되는 기본 정보
 *
 * [Vite 환경 변수 주의사항]
 * - Vite에서는 import.meta.env를 사용합니다
 * - process.env는 Node.js 서버 환경에서만 사용 가능
 * - 클라이언트 코드에서는 반드시 import.meta.env를 사용해야 합니다
 */
export const APP_NAME = "React Router 7 App";
export const APP_DESCRIPTION =
  "React Router 7과 Vite를 활용한 현대적인 웹 애플리케이션";
export const APP_URL = import.meta.env.PUBLIC_APP_URL || "http://localhost:3002";
export const APP_VERSION = import.meta.env.PUBLIC_APP_VERSION || "0.1.0";

/**
 * [API 설정]
 * API 호출 관련 상수
 */
export const API_BASE_URL =
  import.meta.env.PUBLIC_API_URL || "http://localhost:3002/api";
export const API_TIMEOUT = 30000; // 30초

/**
 * [페이지네이션]
 * 목록 페이지의 기본 페이지 크기
 */
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

/**
 * [인증]
 * 세션 및 토큰 관련 상수
 */
export const SESSION_COOKIE_NAME = "rr7_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7일 (초 단위)
export const JWT_EXPIRATION = "7d";
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 100;

/**
 * [파일 업로드]
 * 파일 업로드 제한 설정
 */
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB (바이트 단위)
export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
];

/**
 * [캐싱]
 * 캐시 관련 설정 (초 단위)
 */
export const CACHE_TIMES = {
  SHORT: 60, // 1분
  MEDIUM: 300, // 5분
  LONG: 3600, // 1시간
  DAY: 86400, // 1일
} as const;

/**
 * [라우트 경로]
 * 애플리케이션의 주요 경로를 상수로 정의
 * 경로 변경 시 한 곳만 수정하면 됩니다.
 */
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  POSTS: "/posts",
  POST_DETAIL: (id: string) => `/posts/${id}`,
  BLOG: "/blog",
  DASHBOARD: "/dashboard",
  DASHBOARD_PROFILE: "/dashboard/profile",
  CLIENT_DEMO: "/client-demo",
  LOGIN: "/login",
  REGISTER: "/register",
  LOGOUT: "/logout",
  API: {
    POSTS: "/api/posts",
    POST_DETAIL: (id: string) => `/api/posts/${id}`,
    AUTH_LOGIN: "/api/auth/login",
    AUTH_REGISTER: "/api/auth/register",
    UPLOAD: "/api/upload",
  },
} as const;

/**
 * [에러 메시지]
 * 사용자에게 보여줄 에러 메시지
 */
export const ERROR_MESSAGES = {
  GENERIC: "오류가 발생했습니다. 다시 시도해주세요.",
  NETWORK: "네트워크 연결을 확인해주세요.",
  UNAUTHORIZED: "로그인이 필요합니다.",
  FORBIDDEN: "접근 권한이 없습니다.",
  NOT_FOUND: "요청한 리소스를 찾을 수 없습니다.",
  VALIDATION: "입력값을 확인해주세요.",
  SERVER_ERROR: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  FILE_TOO_LARGE: `파일 크기는 ${MAX_FILE_SIZE / 1024 / 1024}MB를 초과할 수 없습니다.`,
  INVALID_FILE_TYPE: "허용되지 않는 파일 형식입니다.",
  PASSWORD_TOO_SHORT: `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`,
} as const;

/**
 * [성공 메시지]
 * 사용자에게 보여줄 성공 메시지
 */
export const SUCCESS_MESSAGES = {
  CREATED: "성공적으로 생성되었습니다.",
  UPDATED: "성공적으로 수정되었습니다.",
  DELETED: "성공적으로 삭제되었습니다.",
  LOGIN: "로그인되었습니다.",
  LOGOUT: "로그아웃되었습니다.",
  REGISTER: "회원가입이 완료되었습니다.",
  FILE_UPLOADED: "파일이 업로드되었습니다.",
} as const;

/**
 * [로컬 스토리지 키]
 * 브라우저 로컬 스토리지에 저장할 데이터의 키
 */
export const STORAGE_KEYS = {
  THEME: "rr7_theme",
  LANGUAGE: "rr7_language",
  USER_PREFERENCES: "rr7_user_preferences",
} as const;

/**
 * [날짜 포맷]
 * 날짜 표시 형식
 */
export const DATE_FORMATS = {
  FULL: "YYYY-MM-DD HH:mm:ss",
  DATE: "YYYY-MM-DD",
  TIME: "HH:mm:ss",
  DATETIME: "YYYY-MM-DD HH:mm",
  KOREAN_DATE: "YYYY년 MM월 DD일",
  KOREAN_DATETIME: "YYYY년 MM월 DD일 HH:mm",
} as const;

/**
 * [정규식 패턴]
 * 유효성 검사에 사용되는 정규식
 */
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
} as const;

/**
 * [HTTP 상태 코드]
 * API 응답에 사용되는 HTTP 상태 코드
 */
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
