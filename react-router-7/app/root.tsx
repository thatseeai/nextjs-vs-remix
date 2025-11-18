import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { LinksFunction } from "react-router";

import stylesheet from "~/styles/tailwind.css?url";
import { Header } from "~/components/layout/Header";
import { Footer } from "~/components/layout/Footer";

/**
 * 컴포넌트명: Root
 * 용도: React Router 7 애플리케이션의 루트 레이아웃 컴포넌트
 *
 * [React Router 7 특징]
 * - app/root.tsx: 모든 라우트의 부모 컴포넌트
 * - Links: 헤드의 <link> 태그 렌더링
 * - Meta: 메타 태그 렌더링
 * - Outlet: 자식 라우트 렌더링 위치
 * - Scripts: 클라이언트 JavaScript 번들 로드
 * - ScrollRestoration: 스크롤 위치 복원
 *
 * [Remix와의 차이점]
 * - import 경로: @remix-run/react → react-router
 * - LiveReload 제거 (Vite HMR 내장)
 * - 나머지 API는 동일 (Remix v3 = React Router 7)
 *
 * [신입 개발자를 위한 설명]
 * root.tsx는 HTML 문서의 기본 구조를 정의합니다.
 * 모든 페이지가 이 레이아웃을 상속받습니다.
 *
 * 구조:
 * <html>
 *   <head>
 *     - 메타 태그 (SEO)
 *     - 스타일시트 링크
 *     - 파비콘
 *   </head>
 *   <body>
 *     - 실제 페이지 콘텐츠 (Outlet)
 *     - 클라이언트 스크립트
 *   </body>
 * </html>
 *
 * @returns {JSX.Element} HTML 문서 구조
 */

/**
 * links 함수
 *
 * [React Router 7의 리소스 로딩]
 * 각 라우트에서 필요한 CSS, 폰트 등을 선언적으로 정의합니다.
 * 이렇게 하면 해당 라우트에 진입할 때만 리소스를 로드할 수 있습니다.
 *
 * [성능 최적화]
 * - 라우트별 코드 스플리팅
 * - 사용하지 않는 CSS 제거
 * - 프리페칭으로 빠른 페이지 전환
 */
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  },
];

/**
 * Layout 컴포넌트
 *
 * [용도]
 * HTML 문서의 기본 구조를 정의합니다.
 * ErrorBoundary에서도 재사용됩니다.
 */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * App 컴포넌트
 *
 * [React Router 7의 기본 구조]
 * - Layout: HTML 문서 구조
 * - Outlet: 현재 라우트의 컴포넌트가 렌더링되는 위치
 *
 * [라우트 시스템]
 * React Router 7은 파일 시스템 기반 라우팅을 사용합니다.
 * app/routes/ 폴더의 파일명이 URL 경로가 됩니다.
 *
 * 예시:
 * - app/routes/_index.tsx → /
 * - app/routes/about.tsx → /about
 * - app/routes/posts.$postId.tsx → /posts/:postId
 */
export default function App() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

/**
 * ErrorBoundary 컴포넌트
 *
 * [에러 처리]
 * 애플리케이션에서 발생하는 모든 에러를 캐치합니다.
 * 사용자에게 친화적인 에러 메시지를 표시합니다.
 *
 * [신입 개발자를 위한 설명]
 * 에러 바운더리는 React 컴포넌트 트리에서 발생한 에러를
 * 캐치하고 대체 UI를 표시하는 메커니즘입니다.
 *
 * 장점:
 * - 전체 앱이 크래시되는 것을 방지
 * - 사용자에게 명확한 에러 메시지 제공
 * - 개발 환경에서 디버깅 정보 표시
 */
export function ErrorBoundary() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
          <svg
            className="w-6 h-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-center text-gray-900">
          오류가 발생했습니다
        </h1>
        <p className="mt-2 text-center text-gray-600">
          요청을 처리하는 중에 문제가 발생했습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="w-full inline-flex justify-center items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  );
}
