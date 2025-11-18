/**
 * 페이지명: Not Found (404)
 * 용도: 404 에러 페이지
 *
 * [Next.js 특징]
 * - not-found.tsx 파일로 자동 404 페이지 처리
 * - notFound() 함수 호출 시에도 표시됨
 * - 커스텀 디자인으로 사용자 경험 향상
 *
 * [신입 개발자를 위한 설명]
 * 404 에러는 요청한 페이지를 찾을 수 없을 때 발생합니다.
 * Next.js는 not-found.tsx 파일을 자동으로 인식하여
 * 존재하지 않는 경로 접근 시 이 페이지를 표시합니다.
 * 사용자가 길을 잃지 않도록 홈으로 돌아가는 링크를 제공합니다.
 */

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { PAGE_ROUTES } from '@/lib/constants';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        {/* 404 아이콘 */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-gray-300 mb-4">404</div>
          <div className="text-6xl mb-4">🔍</div>
        </div>

        {/* 메시지 */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          요청하신 페이지가 존재하지 않거나 이동했을 수 있습니다.
          URL을 다시 확인해주세요.
        </p>

        {/* 액션 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={PAGE_ROUTES.HOME}>
            <Button size="lg">홈으로 돌아가기</Button>
          </Link>
          <Link href={PAGE_ROUTES.POSTS}>
            <Button variant="outline" size="lg">
              게시글 보기
            </Button>
          </Link>
        </div>

        {/* 도움말 링크 */}
        <div className="mt-12 text-sm text-gray-500">
          <p className="mb-2">자주 찾는 페이지:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={PAGE_ROUTES.ABOUT} className="text-blue-600 hover:text-blue-700">
              소개
            </Link>
            <span>•</span>
            <Link href={PAGE_ROUTES.BLOG} className="text-blue-600 hover:text-blue-700">
              블로그
            </Link>
            <span>•</span>
            <Link href={PAGE_ROUTES.LOGIN} className="text-blue-600 hover:text-blue-700">
              로그인
            </Link>
            <span>•</span>
            <Link href="/contact" className="text-blue-600 hover:text-blue-700">
              문의하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
