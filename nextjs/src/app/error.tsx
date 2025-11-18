/**
 * 페이지명: Error
 * 용도: 에러 바운더리 (런타임 에러 처리)
 *
 * [Next.js 특징]
 * - error.tsx 파일로 자동 에러 바운더리 생성
 * - Client Component로만 동작 ('use client' 필수)
 * - reset() 함수로 에러 복구 시도 가능
 *
 * [신입 개발자를 위한 설명]
 * 에러 바운더리는 컴포넌트에서 발생한 JavaScript 에러를 잡아냅니다.
 * 에러가 발생해도 전체 앱이 멈추지 않고, 사용자에게 친절한 메시지를 보여주며
 * reset 버튼으로 다시 시도할 수 있게 합니다.
 */

'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러 로깅 (실제로는 Sentry, LogRocket 등 사용)
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="max-w-2xl w-full border-red-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <span className="text-4xl">⚠️</span>
            <div>
              <h1 className="text-3xl font-bold text-red-600">오류가 발생했습니다</h1>
              <p className="text-gray-600 mt-1">
                예상치 못한 오류가 발생했습니다. 불편을 드려 죄송합니다.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          {/* 에러 메시지 */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-red-900 mb-2">에러 메시지:</h3>
            <pre className="text-sm text-red-700 whitespace-pre-wrap break-words">
              {error.message}
            </pre>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">에러 ID: {error.digest}</p>
            )}
          </div>

          {/* 조치 방법 */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">문제 해결 방법:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>아래 &quot;다시 시도&quot; 버튼을 클릭해보세요</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>페이지를 새로고침해보세요 (F5 또는 Ctrl+R)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>브라우저 캐시를 삭제해보세요</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>문제가 지속되면 고객센터에 문의해주세요</span>
              </li>
            </ul>
          </div>

          {/* 액션 버튼 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={reset} size="lg">
              다시 시도
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => (window.location.href = '/')}
            >
              홈으로 이동
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.location.reload()}
            >
              페이지 새로고침
            </Button>
          </div>

          {/* 개발 모드에서만 스택 트레이스 표시 */}
          {process.env.NODE_ENV === 'development' && error.stack && (
            <details className="mt-6">
              <summary className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-gray-900">
                개발자 정보 (스택 트레이스)
              </summary>
              <pre className="mt-3 p-4 bg-gray-100 rounded-lg text-xs overflow-auto max-h-64">
                {error.stack}
              </pre>
            </details>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
