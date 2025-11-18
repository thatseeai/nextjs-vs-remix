/**
 * 페이지명: Home
 * 용도: 메인 홈 페이지
 *
 * [Next.js 특징]
 * - Server Component로 SEO 최적화
 * - 히어로 섹션 + 주요 기능 소개
 * - CTA(Call-to-Action) 버튼으로 사용자 유도
 *
 * [신입 개발자를 위한 설명]
 * 홈 페이지는 사이트의 첫인상을 결정하는 중요한 페이지입니다.
 * 프로젝트의 목적을 명확히 전달하고, 사용자가 다음 행동을 취할 수 있도록
 * CTA 버튼을 배치합니다. 서버 컴포넌트로 구현하여 SEO에 유리합니다.
 */

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { PAGE_ROUTES } from '@/lib/constants';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* 히어로 섹션 */}
      <section className="max-w-7xl mx-auto px-4 py-20 sm:py-32">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Next.js vs Remix
            <br />
            <span className="text-blue-600">프레임워크 비교 프로젝트</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            동일한 기능을 Next.js와 Remix로 구현하여
            <br />
            성능, 개발자 경험, 빌드 시간 등을 정량적으로 비교합니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={PAGE_ROUTES.ABOUT}>
              <Button size="lg">프로젝트 소개</Button>
            </Link>
            <Link href={PAGE_ROUTES.POSTS}>
              <Button variant="outline" size="lg">
                게시글 보기
              </Button>
            </Link>
          </div>

          {/* 통계 배지 */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">Next.js 16</div>
              <div className="text-sm text-gray-600">최신 버전</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">Remix v2</div>
              <div className="text-sm text-gray-600">Vite 통합</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">React 19</div>
              <div className="text-sm text-gray-600">최신 React</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">15+</div>
              <div className="text-sm text-gray-600">핵심 기능</div>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 기능 섹션 */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">구현된 핵심 기능</h2>
          <p className="text-gray-600">
            두 프레임워크에서 동일하게 구현된 주요 기능들을 확인해보세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 기능 1 */}
          <Card hoverable>
            <CardHeader>
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-xl font-semibold text-gray-900">라우팅 시스템</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600">
                정적 라우팅, 동적 라우팅, 중첩 레이아웃을 구현하여 라우팅 성능을 비교합니다.
              </p>
              <Link href={PAGE_ROUTES.POSTS} className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 inline-block">
                자세히 보기 →
              </Link>
            </CardBody>
          </Card>

          {/* 기능 2 */}
          <Card hoverable>
            <CardHeader>
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900">데이터 페칭</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600">
                SSR, SSG, CSR 세 가지 방식의 데이터 페칭을 구현하고 성능을 측정합니다.
              </p>
              <Link href={PAGE_ROUTES.CLIENT_DEMO} className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 inline-block">
                자세히 보기 →
              </Link>
            </CardBody>
          </Card>

          {/* 기능 3 */}
          <Card hoverable>
            <CardHeader>
              <div className="text-4xl mb-3">🔐</div>
              <h3 className="text-xl font-semibold text-gray-900">인증 시스템</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600">
                JWT 기반 세션 관리와 보안 기능을 구현하여 인증 방식을 비교합니다.
              </p>
              <Link href={PAGE_ROUTES.LOGIN} className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 inline-block">
                자세히 보기 →
              </Link>
            </CardBody>
          </Card>

          {/* 기능 4 */}
          <Card hoverable>
            <CardHeader>
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900">UI 컴포넌트</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600">
                재사용 가능한 컴포넌트를 Tailwind CSS로 스타일링하여 일관된 디자인을 제공합니다.
              </p>
            </CardBody>
          </Card>

          {/* 기능 5 */}
          <Card hoverable>
            <CardHeader>
              <div className="text-4xl mb-3">🌐</div>
              <h3 className="text-xl font-semibold text-gray-900">API 라우트</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600">
                REST API, 파일 업로드, 에러 처리 등 백엔드 기능을 구현합니다.
              </p>
            </CardBody>
          </Card>

          {/* 기능 6 */}
          <Card hoverable>
            <CardHeader>
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-xl font-semibold text-gray-900">상태 관리</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600">
                Zustand를 활용한 전역 상태 관리로 사용자 경험을 향상시킵니다.
              </p>
              <Link href={PAGE_ROUTES.DASHBOARD} className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 inline-block">
                자세히 보기 →
              </Link>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* 비교 지표 섹션 */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">비교 지표</h2>
            <p className="text-gray-600">
              정량적 데이터로 두 프레임워크를 객관적으로 비교합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-blue-600 text-4xl font-bold mb-2">⏱️</div>
              <h3 className="font-semibold text-gray-900 mb-2">빌드 시간</h3>
              <p className="text-sm text-gray-600">프로덕션 빌드 소요 시간 측정</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-green-600 text-4xl font-bold mb-2">📦</div>
              <h3 className="font-semibold text-gray-900 mb-2">번들 크기</h3>
              <p className="text-sm text-gray-600">JavaScript 번들 크기 비교</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-purple-600 text-4xl font-bold mb-2">🚀</div>
              <h3 className="font-semibold text-gray-900 mb-2">로딩 속도</h3>
              <p className="text-sm text-gray-600">FCP, LCP 등 Core Web Vitals</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-orange-600 text-4xl font-bold mb-2">🔥</div>
              <h3 className="font-semibold text-gray-900 mb-2">HMR 성능</h3>
              <p className="text-sm text-gray-600">개발 중 Hot Module Replacement</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardBody className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">지금 바로 시작하세요</h2>
            <p className="text-xl mb-8 text-blue-100">
              실제 코드를 확인하고, 두 프레임워크의 차이를 직접 경험해보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={PAGE_ROUTES.POSTS}>
                <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  데모 보기
                </Button>
              </Link>
              <Link href={PAGE_ROUTES.ABOUT}>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  자세히 알아보기
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}
