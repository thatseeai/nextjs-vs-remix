import type { MetaFunction } from "react-router";
import { Card } from "~/components/ui/Card";

/**
 * 컴포넌트명: Docs
 * 용도: 문서 페이지 (정적 라우트 예제)
 *
 * [React Router 7 특징]
 * - 파일명이 라우트 경로가 됨 (docs.tsx → /docs)
 * - meta 함수로 SEO 메타데이터 설정
 * - 정적 콘텐츠이므로 loader 불필요
 *
 * [신입 개발자를 위한 설명]
 * 이 페이지는 프로젝트 문서를 표시하는 정적 페이지입니다.
 *
 * [라우팅]
 * - 파일 위치: app/routes/docs.tsx
 * - URL 경로: /docs
 * - 라우트 타입: 정적 (Static Route)
 */

/**
 * [메타 함수]
 * 페이지의 <title>, <meta> 태그를 설정합니다.
 */
export const meta: MetaFunction = () => {
  return [
    { title: "문서 - React Router 7 App" },
    {
      name: "description",
      content: "React Router 7 프로젝트 문서 및 가이드",
    },
    { property: "og:title", content: "문서 - React Router 7 App" },
    { property: "og:type", content: "website" },
  ];
};

export default function Docs() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* 페이지 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            프로젝트 문서
          </h1>
          <p className="text-lg text-gray-600">
            React Router 7 프로젝트 구조 및 사용 가이드
          </p>
        </div>

        {/* 시작하기 */}
        <Card className="mb-6">
          <Card.Header>
            <h2 className="text-2xl font-bold text-gray-900">시작하기</h2>
          </Card.Header>
          <Card.Body>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  개발 서버 실행
                </h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>npm install{"\n"}npm run dev</code>
                </pre>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  프로덕션 빌드
                </h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>npm run build{"\n"}npm start</code>
                </pre>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  테스트 실행
                </h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>npm test              # Vitest 실행{"\n"}npm run test:ui       # Vitest UI 모드{"\n"}npm run test:coverage # 커버리지 리포트</code>
                </pre>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* 프로젝트 구조 */}
        <Card className="mb-6">
          <Card.Header>
            <h2 className="text-2xl font-bold text-gray-900">프로젝트 구조</h2>
          </Card.Header>
          <Card.Body>
            <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
{`react-router-7/
├── app/
│   ├── routes/           # 라우트 파일
│   │   ├── _index.tsx   # 홈페이지 (/)
│   │   ├── about.tsx    # 소개 (/about)
│   │   ├── posts.tsx    # 게시글 목록 (/posts)
│   │   └── ...
│   ├── components/      # 재사용 컴포넌트
│   ├── lib/            # 유틸리티 함수
│   ├── styles/         # 스타일 파일
│   ├── root.tsx        # 루트 레이아웃
│   └── routes.ts       # 라우트 설정
├── public/             # 정적 파일
├── tests/              # 테스트 파일
├── vite.config.ts      # Vite 설정
└── package.json        # 의존성 관리`}
            </pre>
          </Card.Body>
        </Card>

        {/* 주요 기능 */}
        <Card className="mb-6">
          <Card.Header>
            <h2 className="text-2xl font-bold text-gray-900">주요 기능</h2>
          </Card.Header>
          <Card.Body>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
                  파일 기반 라우팅
                </h3>
                <p className="text-gray-600 ml-11">
                  app/routes/ 폴더의 파일 구조가 URL 경로가 됩니다.
                  routes.ts에서 명시적으로 라우트를 정의합니다.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</span>
                  서버 사이드 렌더링 (SSR)
                </h3>
                <p className="text-gray-600 ml-11">
                  loader 함수를 사용하여 서버에서 데이터를 미리 로드하고
                  SEO에 최적화된 HTML을 생성합니다.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">3</span>
                  Progressive Enhancement
                </h3>
                <p className="text-gray-600 ml-11">
                  JavaScript 없이도 폼이 동작하며, 점진적으로
                  사용자 경험을 향상시킵니다.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <span className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">4</span>
                  Vite 통합
                </h3>
                <p className="text-gray-600 ml-11">
                  초고속 HMR, 빠른 빌드 시간, 그리고 풍부한
                  플러그인 생태계를 활용합니다.
                </p>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* 참고 자료 */}
        <Card>
          <Card.Header>
            <h2 className="text-2xl font-bold text-gray-900">참고 자료</h2>
          </Card.Header>
          <Card.Body>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://reactrouter.com/en/main"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  React Router 공식 문서
                </a>
              </li>
              <li>
                <a
                  href="https://vitejs.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Vite 공식 문서
                </a>
              </li>
              <li>
                <a
                  href="https://vitest.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Vitest 공식 문서
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Tailwind CSS 공식 문서
                </a>
              </li>
            </ul>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
