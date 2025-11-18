import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { JWT_EXPIRATION, PASSWORD_MIN_LENGTH } from "./constants";

/**
 * 파일명: auth.server.ts
 * 용도: 인증 관련 유틸리티 함수 (서버 전용)
 *
 * [Remix v2 특징]
 * - .server.ts: 서버에서만 실행
 * - bcryptjs: 비밀번호 해싱
 * - jose: JWT 토큰 생성 및 검증
 *
 * [신입 개발자를 위한 설명]
 * 인증은 사용자가 누구인지 확인하는 과정입니다.
 * - 비밀번호는 해시화하여 저장 (평문 저장 금지!)
 * - JWT는 상태 없는 인증을 위한 토큰
 */

/**
 * [JWT 시크릿]
 * 환경 변수에서 가져오거나 개발용 시크릿 사용
 */
const JWT_SECRET = process.env.JWT_SECRET || "jwt-secret-change-in-production";

if (process.env.NODE_ENV === "production" && JWT_SECRET === "jwt-secret-change-in-production") {
  console.warn(
    "⚠️  경고: 프로덕션 환경에서 JWT_SECRET 환경 변수를 설정해주세요!"
  );
}

/**
 * [사용자 타입]
 * 실제 프로젝트에서는 데이터베이스 모델과 일치시킵니다.
 */
export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: Date;
}

/**
 * [더미 사용자 데이터베이스]
 * 실제 프로젝트에서는 데이터베이스를 사용합니다.
 */
const users: Map<string, User> = new Map();

/**
 * [비밀번호 해시화]
 * bcrypt를 사용하여 비밀번호를 해시화합니다.
 *
 * @param password - 평문 비밀번호
 * @returns 해시화된 비밀번호
 */
export async function hashPassword(password: string): Promise<string> {
  /**
   * [Salt Rounds]
   * 높을수록 안전하지만 느림 (10-12 권장)
   */
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

/**
 * [비밀번호 검증]
 * 평문 비밀번호와 해시를 비교합니다.
 *
 * @param password - 평문 비밀번호
 * @param hash - 해시화된 비밀번호
 * @returns 일치 여부
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * [비밀번호 유효성 검사]
 *
 * @param password - 검사할 비밀번호
 * @returns 에러 메시지 또는 null
 */
export function validatePassword(password: string): string | null {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`;
  }

  // 추가 검증 (대문자, 소문자, 숫자, 특수문자 포함 등)
  // const hasUpperCase = /[A-Z]/.test(password);
  // const hasLowerCase = /[a-z]/.test(password);
  // const hasNumber = /\d/.test(password);
  // const hasSpecialChar = /[!@#$%^&*]/.test(password);

  return null;
}

/**
 * [이메일 유효성 검사]
 *
 * @param email - 검사할 이메일
 * @returns 에러 메시지 또는 null
 */
export function validateEmail(email: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "유효한 이메일 주소를 입력해주세요.";
  }

  return null;
}

/**
 * [사용자 생성 (회원가입)]
 *
 * @param email - 이메일
 * @param password - 비밀번호
 * @param name - 이름
 * @returns 생성된 사용자 또는 에러
 */
export async function createUser(
  email: string,
  password: string,
  name: string
): Promise<{ user?: User; error?: string }> {
  /**
   * [중복 체크]
   * 실제 프로젝트: await db.users.findUnique({ where: { email } })
   */
  const existingUser = Array.from(users.values()).find(
    (u) => u.email === email
  );

  if (existingUser) {
    return { error: "이미 사용 중인 이메일입니다." };
  }

  /**
   * [비밀번호 해시화]
   */
  const passwordHash = await hashPassword(password);

  /**
   * [사용자 생성]
   */
  const user: User = {
    id: Math.random().toString(36).substring(2, 9),
    email,
    name,
    passwordHash,
    createdAt: new Date(),
  };

  users.set(user.id, user);

  return { user };
}

/**
 * [사용자 인증 (로그인)]
 *
 * @param email - 이메일
 * @param password - 비밀번호
 * @returns 인증된 사용자 또는 null
 */
export async function authenticateUser(
  email: string,
  password: string
): Promise<User | null> {
  /**
   * [사용자 조회]
   * 실제 프로젝트: await db.users.findUnique({ where: { email } })
   */
  const user = Array.from(users.values()).find((u) => u.email === email);

  if (!user) {
    return null;
  }

  /**
   * [비밀번호 검증]
   */
  const isValid = await verifyPassword(password, user.passwordHash);

  if (!isValid) {
    return null;
  }

  return user;
}

/**
 * [JWT 토큰 생성]
 *
 * @param userId - 사용자 ID
 * @returns JWT 토큰
 */
export async function generateToken(userId: string): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET);

  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(secret);

  return token;
}

/**
 * [JWT 토큰 검증]
 *
 * @param token - JWT 토큰
 * @returns 사용자 ID 또는 null
 */
export async function verifyToken(token: string): Promise<string | null> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    return payload.userId as string;
  } catch (error) {
    return null;
  }
}

/**
 * [사용자 조회]
 *
 * @param userId - 사용자 ID
 * @returns 사용자 또는 null
 */
export async function getUserById(userId: string): Promise<User | null> {
  /**
   * [실제 프로젝트]
   * await db.users.findUnique({ where: { id: userId } })
   */
  return users.get(userId) || null;
}
