import type { MetaFunction } from "@remix-run/node";
import { Card } from "~/components/ui/Card";

/**
 * 컴포넌트명: About
 * 용도: 소개 페이지 (정적 라우트 예제)
 *
 * [Remix v2 특징]
 * - 파일명이 라우트 경로가 됨 (about.tsx → /about)
 * - meta 함수로 SEO 메타데이터 설정
 * - 정적 콘텐츠이므로 loader 불필요
 *
 * [신입 개발자를 위한 설명]
 * 이 페이지는 정적 콘텐츠를 표시하는 기본 예제입니다.
 * 서버에서 데이터를 가져올 필요 없이 HTML만 렌더링합니다.
 *
 * [라우팅]
 * - 파일 위치: app/routes/about.tsx
 * - URL 경로: /about
 * - 라우트 타입: 정적 (Static Route)
 */

/**
 * [메타 함수]
 * 페이지의 <title>, <meta> 태그를 설정합니다.
 * SEO 최적화에 중요한 역할을 합니다.
 */
export const meta: MetaFunction = () => {
  return [
    { title: "소개 - Remix App" },
    {
      name: "description",
      content: "Remix v2와 Vite를 활용한 현대적인 웹 애플리케이션 소개",
    },
    { property: "og:title", content: "소개 - Remix App" },
    { property: "og:type", content: "website" },
  ];
};

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* 페이지 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Remix App 소개
          </h1>
          <p className="text-lg text-gray-600">
            Remix v2와 Vite를 활용한 현대적인 웹 애플리케이션
          </p>
        </div>

        {/* 주요 특징 */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <Card>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  <svg
                    className="h-6 w-6"
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
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  빠른 성능
                </h3>
                <p className="mt-2 text-base text-gray-600">
                  Vite의 빠른 HMR과 Remix의 서버 사이드 렌더링으로
                  최고의 성능을 제공합니다.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                  <svg
                    className="h-6 w-6"
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
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  타입 안정성
                </h3>
                <p className="mt-2 text-base text-gray-600">
                  TypeScript를 사용하여 개발 시 오류를 미리 발견하고
                  안전한 코드를 작성할 수 있습니다.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-600 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Progressive Enhancement
                </h3>
                <p className="mt-2 text-base text-gray-600">
                  JavaScript 없이도 동작하며, 점진적으로 향상되는
                  사용자 경험을 제공합니다.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-600 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  개발자 경험
                </h3>
                <p className="mt-2 text-base text-gray-600">
                  우수한 문서, 활발한 커뮤니티, 그리고 강력한 개발 도구로
                  생산성을 극대화합니다.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* 기술 스택 */}
        <Card>
          <Card.Header>
            <h2 className="text-2xl font-bold text-gray-900">기술 스택</h2>
          </Card.Header>
          <Card.Body>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Remix", version: "v2.17" },
                { name: "React", version: "v18.3" },
                { name: "Vite", version: "v6.0" },
                { name: "TypeScript", version: "v5.8" },
                { name: "Tailwind CSS", version: "v3.4" },
                { name: "Vitest", version: "v4.0" },
                { name: "Playwright", version: "v1.56" },
                { name: "Zustand", version: "v5.0" },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg"
                >
                  <span className="font-semibold text-gray-900">
                    {tech.name}
                  </span>
                  <span className="text-sm text-gray-600">{tech.version}</span>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        {/* 프로젝트 목표 */}
        <Card className="mt-6">
          <Card.Header>
            <h2 className="text-2xl font-bold text-gray-900">프로젝트 목표</h2>
          </Card.Header>
          <Card.Body>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700">
                  Next.js와 Remix의 정량적 비교를 통한 프레임워크 선택 가이드 제공
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700">
                  신입 개발자를 위한 실무 수준의 학습 자료 제공
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700">
                  프로덕션 환경에서 사용 가능한 코드 품질 유지
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700">
                  성능, 빌드 시간, 번들 크기 등 측정 가능한 데이터 수집
                </span>
              </li>
            </ul>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
