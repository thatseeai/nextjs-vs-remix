import { createCookieSessionStorage, redirect } from "react-router";
import { SESSION_COOKIE_NAME, SESSION_MAX_AGE } from "./constants";

/**
 * 파일명: session.server.ts
 * 용도: 세션 관리 (서버 전용)
 *
 * [React Router 7 특징]
 * - createCookieSessionStorage: 쿠키 기반 세션
 * - .server.ts: 서버에서만 실행 (클라이언트 번들에 포함되지 않음)
 * - 보안: 세션 시크릿으로 암호화
 *
 * [Remix와의 차이점]
 * - import 경로: @remix-run/node → react-router
 * - 나머지 API는 동일 (Remix 기반이므로)
 *
 * [신입 개발자를 위한 설명]
 * 세션은 사용자의 로그인 상태를 유지하는 메커니즘입니다.
 * 쿠키에 암호화된 세션 ID를 저장하고, 서버에서 이를 확인합니다.
 *
 * [보안]
 * - httpOnly: JavaScript로 쿠키 접근 불가
 * - secure: HTTPS에서만 전송
 * - sameSite: CSRF 공격 방지
 * - secrets: 쿠키 암호화
 */

/**
 * [환경 변수 확인]
 * SESSION_SECRET이 설정되지 않으면 개발용 시크릿 사용
 */
const sessionSecret = process.env.SESSION_SECRET || "default-secret-change-in-production";

if (process.env.NODE_ENV === "production" && sessionSecret === "default-secret-change-in-production") {
  console.warn(
    "⚠️  경고: 프로덕션 환경에서 SESSION_SECRET 환경 변수를 설정해주세요!"
  );
}

/**
 * [세션 스토리지 생성]
 * 쿠키 기반 세션을 생성합니다.
 */
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: SESSION_COOKIE_NAME,
    /**
     * [쿠키 보안 설정]
     */
    secure: process.env.NODE_ENV === "production", // HTTPS에서만 전송 (프로덕션)
    httpOnly: true, // JavaScript로 쿠키 접근 불가
    sameSite: "lax", // CSRF 공격 방지
    path: "/", // 모든 경로에서 사용
    maxAge: SESSION_MAX_AGE, // 쿠키 유효 기간 (초)
    secrets: [sessionSecret], // 쿠키 암호화 시크릿
  },
});

/**
 * [세션 타입]
 */
export interface SessionData {
  userId: string;
  email: string;
  name: string;
}

/**
 * [세션 가져오기]
 * 요청의 쿠키에서 세션을 파싱합니다.
 *
 * @param request - HTTP 요청
 * @returns 세션 객체
 */
export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

/**
 * [세션에서 사용자 ID 가져오기]
 *
 * @param request - HTTP 요청
 * @returns 사용자 ID 또는 null
 */
export async function getUserId(request: Request): Promise<string | null> {
  const session = await getSession(request);
  const userId = session.get("userId");
  return userId || null;
}

/**
 * [세션에서 사용자 정보 가져오기]
 *
 * @param request - HTTP 요청
 * @returns 세션 데이터 또는 null
 */
export async function getSessionData(
  request: Request
): Promise<SessionData | null> {
  const session = await getSession(request);
  const userId = session.get("userId");

  if (!userId) {
    return null;
  }

  return {
    userId: session.get("userId"),
    email: session.get("email"),
    name: session.get("name"),
  };
}

/**
 * [로그인 필수 체크]
 * 로그인하지 않은 사용자를 로그인 페이지로 리다이렉트합니다.
 *
 * @param request - HTTP 요청
 * @param redirectTo - 로그인 후 돌아갈 경로 (선택)
 * @returns 사용자 ID
 */
export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
): Promise<string> {
  const userId = await getUserId(request);

  if (!userId) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }

  return userId;
}

/**
 * [세션 생성]
 * 로그인 시 세션을 생성하고 쿠키로 응답합니다.
 *
 * @param sessionData - 세션에 저장할 데이터
 * @param redirectTo - 리다이렉트할 경로
 * @returns Response (Set-Cookie 헤더 포함)
 */
export async function createUserSession(
  sessionData: SessionData,
  redirectTo: string = "/"
) {
  const session = await sessionStorage.getSession();

  /**
   * [세션 데이터 저장]
   */
  session.set("userId", sessionData.userId);
  session.set("email", sessionData.email);
  session.set("name", sessionData.name);

  /**
   * [응답 생성]
   * Set-Cookie 헤더와 함께 리다이렉트 응답을 반환합니다.
   */
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: SESSION_MAX_AGE,
      }),
    },
  });
}

/**
 * [세션 삭제 (로그아웃)]
 * 세션을 파기하고 쿠키를 삭제합니다.
 *
 * @param request - HTTP 요청
 * @param redirectTo - 리다이렉트할 경로
 * @returns Response (쿠키 삭제 헤더 포함)
 */
export async function logout(request: Request, redirectTo: string = "/") {
  const session = await getSession(request);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
