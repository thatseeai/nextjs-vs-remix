/**
 * 페이지명: Home
 * 용도: 메인 홈 페이지
 *
 * [Next.js 특징]
 * - Server Component로 SEO 최적화
 * - 동일한 UI 구조로 프레임워크 비교 가능
 *
 * [3-way 비교 프로젝트]
 * Next.js, Remix, React Router 7의 성능과 기능을 정량적으로 비교합니다.
 * 이 홈페이지는 세 프로젝트 모두 동일한 HTML/CSS 구조를 사용합니다.
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js 15 - 프레임워크 비교 프로젝트',
  description: 'Next.js, Remix, React Router 7의 성능과 기능을 정량적으로 비교하는 프로젝트입니다.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 헤더 영역 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <svg
                className="w-8 h-8 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <h1 className="text-2xl font-bold text-gray-900">
                Next.js 15
              </h1>
            </div>
            <nav className="flex space-x-4">
              <a
                href="/about"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                소개
              </a>
              <a
                href="/docs"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                문서
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 히어로 섹션 */}
        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Next.js vs Remix vs React Router 7
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            세 프레임워크의 성능, 기능, 개발자 경험을 정량적으로 비교하는
            프로젝트입니다.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/about"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              프로젝트 시작하기
            </a>
            <a
              href="/docs"
              className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              비교 문서 보기
            </a>
          </div>
        </section>

        {/* 기능 카드 섹션 - 6개 */}
        <section className="grid md:grid-cols-3 gap-8 mb-16">
          {/* 1. 라우팅 시스템 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              라우팅 시스템
            </h3>
            <p className="text-gray-600">
              파일 기반 라우팅으로 직관적인 페이지 구조를 제공합니다.
            </p>
            <div className="mt-4">
              <a
                href="/posts"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                게시글 보기 →
              </a>
            </div>
          </div>

          {/* 2. 데이터 페칭 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              데이터 페칭
            </h3>
            <p className="text-gray-600">
              SSR, SSG, CSR 등 다양한 데이터 페칭 전략을 지원합니다.
            </p>
            <div className="mt-4">
              <a
                href="/client-demo"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                데모 보기 →
              </a>
            </div>
          </div>

          {/* 3. 인증 시스템 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              인증 시스템
            </h3>
            <p className="text-gray-600">
              안전한 세션 기반 인증 및 권한 관리 기능을 제공합니다.
            </p>
            <div className="mt-4">
              <a
                href="/login"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                로그인 →
              </a>
            </div>
          </div>

          {/* 4. UI 컴포넌트 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              UI 컴포넌트
            </h3>
            <p className="text-gray-600">
              재사용 가능한 컴포넌트로 일관된 디자인 시스템을 구축합니다.
            </p>
            <div className="mt-4">
              <span className="text-gray-400">컴포넌트 라이브러리</span>
            </div>
          </div>

          {/* 5. API 라우트 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
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
                  d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              API 라우트
            </h3>
            <p className="text-gray-600">
              서버리스 API 엔드포인트를 쉽게 생성하고 관리합니다.
            </p>
            <div className="mt-4">
              <span className="text-gray-400">REST API</span>
            </div>
          </div>

          {/* 6. 상태 관리 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              상태 관리
            </h3>
            <p className="text-gray-600">
              전역 상태 관리로 복잡한 애플리케이션도 효율적으로 관리합니다.
            </p>
            <div className="mt-4">
              <a
                href="/dashboard"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                대시보드 →
              </a>
            </div>
          </div>
        </section>

        {/* 성능 지표 섹션 */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            실제 측정 성능 지표
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                2.7초
              </div>
              <div className="text-sm text-gray-600">개발 서버 시작</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                9.5 MB
              </div>
              <div className="text-sm text-gray-600">빌드 결과 크기</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                18.6초
              </div>
              <div className="text-sm text-gray-600">프로덕션 빌드</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                ~200ms
              </div>
              <div className="text-sm text-gray-600">HMR 업데이트</div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a
              href="/docs"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              자세한 성능 비교 보기 →
            </a>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">
            © 2025 Next.js vs Remix vs React Router 7 비교 프로젝트. Next.js 16.0.3
          </p>
        </div>
      </footer>
    </div>
  );
}
