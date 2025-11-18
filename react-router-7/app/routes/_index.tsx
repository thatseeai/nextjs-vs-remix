import type { MetaFunction } from "react-router";

/**
 * 컴포넌트명: Index (홈페이지)
 * 용도: React Router 7 애플리케이션의 메인 페이지
 *
 * [React Router 7 라우팅]
 * - 파일명 _index.tsx: / 경로에 매핑
 * - 언더스코어(_)는 경로에 포함되지 않음
 *
 * [React Router 7의 meta 함수]
 * - SEO를 위한 메타 태그 정의
 * - 서버에서 렌더링되어 검색 엔진 최적화
 * - 각 라우트마다 다른 메타 태그 설정 가능
 *
 * [신입 개발자를 위한 설명]
 * React Router 7에서는 각 라우트 파일에서 meta 함수를 export하여
 * 해당 페이지의 SEO 정보를 정의합니다.
 *
 * 장점:
 * - 타입 안정성 (TypeScript)
 * - 서버 사이드 렌더링
 * - 라우트별 독립적인 메타 태그
 */
export const meta: MetaFunction = () => {
  return [
    { title: "React Router 7 + Vite - Next.js 비교 프로젝트" },
    {
      name: "description",
      content:
        "React Router 7와 Next.js 15의 성능, 기능, 개발자 경험을 정량적으로 비교하는 프로젝트입니다.",
    },
    {
      name: "keywords",
      content:
        "React Router 7, Next.js, React, Vite, 비교, 성능, SSR, 웹 프레임워크",
    },
  ];
};

/**
 * Index 컴포넌트
 *
 * [React Router 7의 기본 라우트 컴포넌트]
 * - default export: 렌더링할 React 컴포넌트
 * - 서버와 클라이언트 모두에서 실행됨
 *
 * [Vite의 장점]
 * - 빠른 HMR: 코드 수정 시 즉시 브라우저 반영
 * - ESBuild: JavaScript/TypeScript 빠른 트랜스파일
 * - 효율적인 번들링: 사용하지 않는 코드 자동 제거
 *
 * [성능 측정 포인트]
 * 1. 페이지 로딩 시간 (FCP, LCP)
 * 2. 인터랙티브 지연 시간 (TTI)
 * 3. 번들 크기
 * 4. 서버 응답 시간 (TTFB)
 *
 * @returns {JSX.Element} 홈페이지 UI
 */
export default function Index() {
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
                React Router 7 + Vite
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
            Next.js vs React Router 7
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            두 프레임워크의 성능, 기능, 개발자 경험을 정량적으로 비교하는
            프로젝트입니다.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="btn-primary">
              프로젝트 시작하기
            </button>
            <button className="btn-secondary">
              비교 문서 보기
            </button>
          </div>
        </section>

        {/* 기능 카드 섹션 */}
        <section className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Vite 기반 개발 환경 */}
          <div className="card">
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
              Vite 기반 개발 환경
            </h3>
            <p className="text-gray-600">
              초고속 HMR과 빠른 빌드 시간으로 개발자 경험을 극대화합니다.
            </p>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <span className="font-medium text-green-600">⚡ 100ms 이내</span>
              <span className="ml-2">HMR 업데이트</span>
            </div>
          </div>

          {/* Progressive Enhancement */}
          <div className="card">
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              점진적 향상
            </h3>
            <p className="text-gray-600">
              JavaScript 없이도 동작하는 폼으로 접근성과 성능을 동시에
              확보합니다.
            </p>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <span className="font-medium text-green-600">✓ 100% 접근 가능</span>
              <span className="ml-2">모든 환경</span>
            </div>
          </div>

          {/* Vitest 테스트 */}
          <div className="card">
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Vitest 통합 테스트
            </h3>
            <p className="text-gray-600">
              Jest 대비 5-10배 빠른 테스트 실행으로 생산성을 향상시킵니다.
            </p>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <span className="font-medium text-green-600">🚀 5-10배 빠름</span>
              <span className="ml-2">vs Jest</span>
            </div>
          </div>
        </section>

        {/* 성능 지표 섹션 */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            성능 지표 (측정 예정)
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                ?ms
              </div>
              <div className="text-sm text-gray-600">개발 서버 시작</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                ?KB
              </div>
              <div className="text-sm text-gray-600">초기 번들 크기</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                ?s
              </div>
              <div className="text-sm text-gray-600">프로덕션 빌드</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                ?ms
              </div>
              <div className="text-sm text-gray-600">TTFB</div>
            </div>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">
            © 2025 Next.js vs React Router 7 비교 프로젝트. React Router 7.17.2 + Vite 6.x
          </p>
        </div>
      </footer>
    </div>
  );
}
