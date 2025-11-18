/**
 * 페이지명: Login
 * 용도: 로그인 페이지
 *
 * [Next.js 특징]
 * - Suspense를 사용하여 useSearchParams 에러 방지
 * - Client Component로 폼 인터랙션 처리
 * - API Route를 통한 인증 처리
 *
 * [신입 개발자를 위한 설명]
 * 로그인 페이지는 사용자 인증을 처리합니다.
 * useSearchParams를 사용하는 컴포넌트는 Suspense로 감싸야 합니다.
 */

import { Suspense } from 'react';
import { LoginForm } from './LoginForm';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">로딩 중...</div>}>
      <LoginForm />
    </Suspense>
  );
}
