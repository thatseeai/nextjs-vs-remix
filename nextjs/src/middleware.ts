/**
 * 파일명: middleware.ts
 * 용도: Next.js 미들웨어 (인증, 권한 체크 등)
 *
 * [Next.js 특징]
 * - Edge Runtime에서 실행되어 빠른 응답 제공
 * - 페이지 렌더링 전에 요청을 가로채서 처리
 * - matcher를 사용하여 특정 경로에만 적용 가능
 *
 * [신입 개발자를 위한 설명]
 * 미들웨어는 사용자가 페이지에 접근하기 전에 실행되는 코드입니다.
 * 예를 들어 로그인이 필요한 페이지에 접근할 때,
 * 미들웨어에서 토큰을 확인하고 로그인하지 않았으면 로그인 페이지로 리다이렉트합니다.
 * Next.js의 미들웨어는 전 세계 Edge 서버에서 실행되어 매우 빠릅니다.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';
import { PAGE_ROUTES } from '@/lib/constants';

/**
 * 인증이 필요한 경로 목록
 */
const protectedPaths = ['/dashboard', '/dashboard/profile'];

/**
 * 인증된 사용자가 접근하면 안 되는 경로 (로그인 페이지 등)
 */
const authPaths = ['/login', '/register'];

/**
 * 미들웨어 함수
 * @param request - NextRequest 객체
 * @returns NextResponse
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 토큰 가져오기
  const token = getTokenFromRequest(request);
  let isAuthenticated = false;

  // 토큰이 있으면 검증
  if (token) {
    const payload = await verifyToken(token);
    isAuthenticated = payload !== null;
  }

  // 보호된 경로 체크
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  // 1. 보호된 경로인데 인증되지 않은 경우 → 로그인 페이지로 리다이렉트
  if (isProtectedPath && !isAuthenticated) {
    const loginUrl = new URL(PAGE_ROUTES.LOGIN, request.url);
    // 로그인 후 원래 페이지로 돌아갈 수 있도록 redirect 파라미터 추가
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. 인증 페이지인데 이미 인증된 경우 → 대시보드로 리다이렉트
  if (isAuthPath && isAuthenticated) {
    const dashboardUrl = new URL(PAGE_ROUTES.DASHBOARD, request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // 3. 그 외의 경우 정상 진행
  return NextResponse.next();
}

/**
 * 미들웨어가 실행될 경로 설정
 * matcher를 사용하여 특정 경로에만 미들웨어 적용
 */
export const config = {
  matcher: [
    /*
     * 다음 경로를 제외한 모든 경로에 매칭:
     * - api (API routes)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
