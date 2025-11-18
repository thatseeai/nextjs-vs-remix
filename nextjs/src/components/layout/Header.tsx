/**
 * 컴포넌트명: Header
 * 용도: 전역 헤더 및 네비게이션 컴포넌트
 *
 * [Next.js 특징]
 * - Next.js Link 컴포넌트를 사용한 클라이언트 사이드 네비게이션
 * - 프리페칭 기능으로 빠른 페이지 전환
 * - Zustand를 사용한 전역 상태 관리 (인증, 테마 등)
 *
 * [신입 개발자를 위한 설명]
 * Header 컴포넌트는 모든 페이지 상단에 표시되는 네비게이션 바입니다.
 * Next.js의 Link 컴포넌트를 사용하면 페이지를 새로고침하지 않고
 * 빠르게 전환할 수 있으며, 사용자 경험이 향상됩니다.
 *
 * @returns {JSX.Element} 헤더 UI
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { Button } from '@/components/ui/Button';

export function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { language, setLanguage, theme, toggleTheme } = useUIStore();

  // 현재 경로와 일치하는지 확인하는 헬퍼 함수
  const isActive = (path: string) => pathname === path;

  // 네비게이션 링크 스타일
  const getLinkStyle = (path: string) => {
    const baseStyle = 'px-3 py-2 rounded-md text-sm font-medium transition-colors';
    const activeStyle = 'bg-blue-600 text-white';
    const inactiveStyle = 'text-gray-700 hover:bg-gray-100';
    return `${baseStyle} ${isActive(path) ? activeStyle : inactiveStyle}`;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 및 메인 네비게이션 */}
          <div className="flex items-center space-x-8">
            {/* 로고 */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Next.js</span>
            </Link>

            {/* 메인 네비게이션 링크 */}
            <div className="hidden md:flex space-x-4">
              <Link href="/" className={getLinkStyle('/')}>
                홈
              </Link>
              <Link href="/about" className={getLinkStyle('/about')}>
                소개
              </Link>
              <Link href="/posts" className={getLinkStyle('/posts')}>
                게시글
              </Link>
              <Link href="/blog" className={getLinkStyle('/blog')}>
                블로그
              </Link>
              {user && (
                <Link href="/dashboard" className={getLinkStyle('/dashboard')}>
                  대시보드
                </Link>
              )}
              <Link href="/client-demo" className={getLinkStyle('/client-demo')}>
                클라이언트 데모
              </Link>
            </div>
          </div>

          {/* 우측 액션 버튼들 */}
          <div className="flex items-center space-x-4">
            {/* 다국어 전환 */}
            <button
              onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
              className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="언어 전환"
            >
              {language === 'ko' ? '🇰🇷 한국어' : '🇺🇸 English'}
            </button>

            {/* 테마 전환 */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="테마 전환"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* 인증 버튼 */}
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">
                  안녕하세요, <span className="font-semibold">{user.name}</span>님
                </span>
                <Button variant="outline" size="sm" onClick={logout}>
                  로그아웃
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    로그인
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">
                    회원가입
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
