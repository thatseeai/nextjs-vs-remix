/**
 * 파일명: auth.ts
 * 용도: JWT 인증 관련 유틸리티 함수
 *
 * [Next.js 특징]
 * - jose 라이브러리를 사용한 JWT 생성/검증
 * - Edge Runtime 호환 (Next.js middleware에서 사용 가능)
 * - bcryptjs를 사용한 안전한 비밀번호 해싱
 *
 * [신입 개발자를 위한 설명]
 * JWT(JSON Web Token)는 사용자 인증을 위한 토큰 방식입니다.
 * 서버에서 토큰을 생성하여 클라이언트에 전달하면,
 * 클라이언트는 이후 요청 시 이 토큰을 함께 보내 인증합니다.
 * 비밀번호는 bcrypt로 해싱하여 저장하므로 원본을 알 수 없습니다.
 */

import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { JWT } from './constants';

/**
 * JWT 시크릿 키
 * 환경 변수에서 가져오며, 없으면 기본값 사용 (개발 환경용)
 */
const getJwtSecret = (): Uint8Array => {
  const secret = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
  return new TextEncoder().encode(secret);
};

/**
 * JWT 페이로드 타입
 */
export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  role?: string;
}

/**
 * JWT 토큰 생성
 * @param payload - 토큰에 담을 사용자 정보
 * @returns JWT 토큰 문자열
 */
export async function createToken(payload: JWTPayload): Promise<string> {
  const secret = getJwtSecret();

  const token = await new SignJWT({
    ...payload,
  })
    .setProtectedHeader({ alg: 'HS256' }) // 해싱 알고리즘
    .setIssuedAt() // 발급 시간
    .setExpirationTime(JWT.EXPIRES_IN) // 만료 시간
    .sign(secret);

  return token;
}

/**
 * JWT 토큰 검증 및 디코딩
 * @param token - 검증할 JWT 토큰
 * @returns 디코딩된 페이로드 또는 null
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret);

    return payload as JWTPayload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * 비밀번호 해싱
 * @param password - 평문 비밀번호
 * @returns 해싱된 비밀번호
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // 해싱 강도 (높을수록 안전하지만 느림)
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

/**
 * 비밀번호 검증
 * @param password - 입력된 평문 비밀번호
 * @param hashedPassword - 저장된 해싱된 비밀번호
 * @returns 일치 여부
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}

/**
 * 쿠키에서 토큰 추출
 * @param cookieHeader - Cookie 헤더 문자열
 * @returns 토큰 문자열 또는 null
 */
export function getTokenFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  return cookies[JWT.COOKIE_NAME] || null;
}

/**
 * Authorization 헤더에서 토큰 추출
 * @param authHeader - Authorization 헤더 문자열
 * @returns 토큰 문자열 또는 null
 */
export function getTokenFromAuthHeader(authHeader: string | null): string | null {
  if (!authHeader) return null;

  // "Bearer <token>" 형식
  const parts = authHeader.split(' ');
  if (parts.length === 2 && parts[0] === 'Bearer') {
    return parts[1];
  }

  return null;
}

/**
 * 요청에서 토큰 추출 (쿠키 또는 헤더)
 * @param request - Request 객체
 * @returns 토큰 문자열 또는 null
 */
export function getTokenFromRequest(request: Request): string | null {
  // Authorization 헤더 우선 확인
  const authHeader = request.headers.get('Authorization');
  const tokenFromHeader = getTokenFromAuthHeader(authHeader);
  if (tokenFromHeader) return tokenFromHeader;

  // 쿠키 확인
  const cookieHeader = request.headers.get('Cookie');
  const tokenFromCookie = getTokenFromCookie(cookieHeader);
  if (tokenFromCookie) return tokenFromCookie;

  return null;
}

/**
 * 인증된 사용자 정보 가져오기
 * @param request - Request 객체
 * @returns 사용자 정보 또는 null
 */
export async function getAuthUser(request: Request): Promise<JWTPayload | null> {
  const token = getTokenFromRequest(request);
  if (!token) return null;

  const payload = await verifyToken(token);
  return payload;
}

/**
 * 관리자 권한 확인
 * @param request - Request 객체
 * @returns 관리자 여부
 */
export async function isAdmin(request: Request): Promise<boolean> {
  const user = await getAuthUser(request);
  return user?.role === 'admin';
}
