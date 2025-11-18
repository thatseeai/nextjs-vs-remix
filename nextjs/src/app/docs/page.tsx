import type { Metadata } from "next";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";

/**
 * 컴포넌트명: Docs
 * 용도: 문서 페이지 (정적 라우트 예제)
 *
 * [Next.js 15 특징]
 * - 폴더 기반 라우팅 (docs/page.tsx → /docs)
 * - Metadata export로 SEO 메타데이터 설정
 * - 정적 콘텐츠이므로 별도 데이터 페칭 불필요
 *
 * [신입 개발자를 위한 설명]
 * 이 페이지는 프로젝트 문서를 표시하는 정적 페이지입니다.
 * Next.js App Router의 폴더 기반 라우팅을 활용합니다.
 *
 * [라우팅]
 * - 파일 위치: src/app/docs/page.tsx
 * - URL 경로: /docs
 * - 라우트 타입: 정적 (Static Route)
 */

/**
 * [메타데이터]
 * 페이지의 <title>, <meta> 태그를 설정합니다.
 */
export const metadata: Metadata = {
  title: "문서 - Next.js App",
  description: "Next.js 15 프로젝트 문서 및 가이드",
  openGraph: {
    title: "문서 - Next.js App",
    type: "website",
  },
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
            Next.js 15 프로젝트 구조 및 사용 가이드
          </p>
        </div>

        {/* 시작하기 */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900">시작하기</h2>
          </CardHeader>
          <CardBody>
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
          </CardBody>
        </Card>

        {/* 프로젝트 구조 */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900">프로젝트 구조</h2>
          </CardHeader>
          <CardBody>
            <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
{`nextjs/
├── src/
│   ├── app/              # App Router (라우트)
│   │   ├── page.tsx     # 홈페이지 (/)
│   │   ├── about/       # 소개 (/about)
│   │   ├── posts/       # 게시글 (/posts)
│   │   ├── blog/        # 블로그 (/blog)
│   │   ├── dashboard/   # 대시보드 (/dashboard)
│   │   └── ...
│   ├── components/      # 재사용 컴포넌트
│   ├── lib/            # 유틸리티 함수
│   └── styles/         # 스타일 파일
├── public/             # 정적 파일
├── tests/              # 테스트 파일
├── next.config.js      # Next.js 설정
└── package.json        # 의존성 관리`}
            </pre>
          </CardBody>
        </Card>

        {/* 주요 기능 */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900">주요 기능</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
                  App Router (폴더 기반 라우팅)
                </h3>
                <p className="text-gray-600 ml-11">
                  src/app/ 폴더의 구조가 URL 경로가 됩니다.
                  page.tsx, layout.tsx 등 특수 파일로 라우트를 정의합니다.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</span>
                  Server Components
                </h3>
                <p className="text-gray-600 ml-11">
                  기본적으로 모든 컴포넌트가 서버에서 렌더링되어
                  SEO 최적화와 빠른 초기 로딩 속도를 제공합니다.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">3</span>
                  Turbopack
                </h3>
                <p className="text-gray-600 ml-11">
                  Webpack을 대체하는 초고속 번들러로 개발 서버
                  시작 시간과 HMR 속도를 크게 향상시킵니다.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <span className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">4</span>
                  자동 최적화
                </h3>
                <p className="text-gray-600 ml-11">
                  이미지, 폰트, 스크립트 등을 자동으로 최적화하여
                  최고의 성능을 제공합니다.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* 참고 자료 */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900">참고 자료</h2>
          </CardHeader>
          <CardBody>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://nextjs.org/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Next.js 공식 문서
                </a>
              </li>
              <li>
                <a
                  href="https://react.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  React 공식 문서
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
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
