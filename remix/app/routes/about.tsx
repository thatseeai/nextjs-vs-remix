/**
 * 페이지명: About
 * 용도: 프로젝트 소개 페이지 (정적 라우트)
 *
 * [Remix v2 특징]
 * - 정적 라우트: /about 경로로 접근
 * - Server Component로 구현하여 SEO 최적화
 * - meta 함수를 통한 페이지 정보 설정
 *
 * [신입 개발자를 위한 설명]
 * 정적 라우트는 고정된 경로를 가진 페이지입니다.
 * Remix에서는 기본적으로 서버에서 렌더링되어 클라이언트로 전송되므로
 * 검색 엔진 최적화(SEO)에 유리하고 초기 로딩이 빠릅니다.
 */

import type { MetaFunction } from "@remix-run/react";
import { Card, CardBody, CardHeader } from "~/components/ui/Card";

export const meta: MetaFunction = () => {
  return [
    { title: "소개 - Next.js vs Remix" },
    { name: "description", content: "Next.js와 Remix 프레임워크 비교 프로젝트 소개" },
  ];
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">프로젝트 소개</h1>

      <div className="space-y-6">
        {/* 프로젝트 개요 */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold text-gray-900">프로젝트 개요</h2>
          </CardHeader>
          <CardBody>
            <p className="text-gray-700 leading-relaxed">
              이 프로젝트는 <strong>Next.js</strong>와 <strong>Remix</strong> 프레임워크를
              정량적으로 비교하기 위해 제작되었습니다. 동일한 기능을 두 프레임워크로 구현하여
              성능, 개발자 경험, 빌드 시간 등을 측정하고 비교합니다.
            </p>
          </CardBody>
        </Card>

        {/* 기술 스택 */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold text-gray-900">기술 스택</h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-2">Remix 버전</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Remix 2.17.2</li>
                  <li>• React 18.3.x</li>
                  <li>• TypeScript 5.x</li>
                  <li>• Tailwind CSS 4.x</li>
                  <li>• Zustand (상태 관리)</li>
                  <li>• Vitest (테스트)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-2">공통 기능</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 라우팅 시스템 (정적, 동적, 중첩)</li>
                  <li>• 데이터 페칭 (SSR, SSG, CSR)</li>
                  <li>• 인증 시스템 (JWT)</li>
                  <li>• API 라우트</li>
                  <li>• 상태 관리</li>
                  <li>• 국제화 (i18n)</li>
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* 구현 기능 */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold text-gray-900">구현된 핵심 기능</h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">1. 라우팅</h4>
                <p className="text-sm text-blue-700">
                  정적 라우팅, 동적 라우팅, 중첩 레이아웃 구현
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">2. 데이터 페칭</h4>
                <p className="text-sm text-green-700">
                  SSR, SSG, CSR 방식 비교 및 성능 측정
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">3. 인증</h4>
                <p className="text-sm text-purple-700">
                  JWT 기반 세션 관리 및 보안 구현
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">4. API</h4>
                <p className="text-sm text-yellow-700">
                  REST API, 파일 업로드, 에러 처리
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">5. 스타일링</h4>
                <p className="text-sm text-red-700">
                  Tailwind CSS를 활용한 반응형 디자인
                </p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-900 mb-2">6. 테스트</h4>
                <p className="text-sm text-indigo-700">
                  Vitest, Playwright를 활용한 테스트
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* 성능 지표 */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold text-gray-900">측정 지표</h2>
          </CardHeader>
          <CardBody>
            <ul className="space-y-2 text-gray-700">
              <li>
                ✅ <strong>빌드 시간:</strong> 프로덕션 빌드 소요 시간
              </li>
              <li>
                ✅ <strong>번들 크기:</strong> JavaScript 번들 크기
              </li>
              <li>
                ✅ <strong>초기 로딩 시간:</strong> FCP, LCP 등 Core Web Vitals
              </li>
              <li>
                ✅ <strong>HMR 속도:</strong> 개발 중 Hot Module Replacement 시간
              </li>
              <li>
                ✅ <strong>테스트 실행 시간:</strong> Vitest 테스트 스위트 실행 시간
              </li>
              <li>
                ✅ <strong>개발자 경험:</strong> 학습 곡선, 문서 품질, 타입 안정성
              </li>
            </ul>
          </CardBody>
        </Card>

        {/* 프로젝트 목표 */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold text-gray-900">프로젝트 목표</h2>
          </CardHeader>
          <CardBody>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Next.js와 Remix의 실제 성능을 정량적으로 비교</li>
              <li>각 프레임워크의 장단점을 명확히 파악</li>
              <li>프로젝트 특성에 따른 프레임워크 선택 가이드 제공</li>
              <li>신입 개발자를 위한 학습 자료로 활용</li>
              <li>실무에 바로 적용 가능한 코드 패턴 제시</li>
            </ol>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
