/**
 * 페이지명: Global Error
 * 용도: 전역 에러 바운더리 (루트 레이아웃 에러 포함)
 *
 * [Next.js 특징]
 * - global-error.tsx는 루트 레이아웃의 에러까지 처리
 * - 가장 상위 레벨의 에러 바운더리
 * - html, body 태그를 직접 정의해야 함
 *
 * [신입 개발자를 위한 설명]
 * global-error.tsx는 앱 전체의 에러를 잡는 최상위 에러 바운더리입니다.
 * 일반 error.tsx로 잡히지 않는 루트 레이아웃의 에러도 처리하며,
 * 매우 심각한 오류가 발생했을 때 사용됩니다.
 */

'use client';

import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // 전역 에러 로깅
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="ko">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg border border-red-200 p-8">
            {/* 에러 아이콘 */}
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-4xl font-bold text-red-600 mb-2">
                심각한 오류가 발생했습니다
              </h1>
              <p className="text-gray-600">
                애플리케이션에 예상치 못한 문제가 발생했습니다.
              </p>
            </div>

            {/* 에러 메시지 */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-red-900 mb-2">에러 상세:</h3>
              <pre className="text-sm text-red-700 whitespace-pre-wrap break-words">
                {error.message}
              </pre>
              {error.digest && (
                <p className="text-xs text-red-600 mt-2">
                  오류 추적 ID: {error.digest}
                </p>
              )}
            </div>

            {/* 조치 안내 */}
            <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">문제 해결 단계:</h3>
              <ol className="list-decimal list-inside space-y-1 text-yellow-800 text-sm">
                <li>페이지를 새로고침해주세요</li>
                <li>브라우저를 종료했다가 다시 열어주세요</li>
                <li>브라우저 캐시와 쿠키를 삭제해보세요</li>
                <li>다른 브라우저로 접속해보세요</li>
                <li>문제가 계속되면 관리자에게 문의해주세요</li>
              </ol>
            </div>

            {/* 액션 버튼 */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={reset}
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                다시 시도
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                홈으로 이동
              </button>
            </div>

            {/* 고객 지원 정보 */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600 mb-2">
                문제가 해결되지 않나요?
              </p>
              <p className="text-sm">
                <a
                  href="mailto:support@example.com"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  support@example.com
                </a>
                {' '}으로 문의해주세요
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
