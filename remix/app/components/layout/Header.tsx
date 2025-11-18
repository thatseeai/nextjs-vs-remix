import { Link, useLocation } from "@remix-run/react";
import { useState } from "react";

/**
 * 컴포넌트명: Header
 * 용도: 애플리케이션의 전역 헤더 및 네비게이션
 *
 * [Remix v2 특징]
 * - Link 컴포넌트: 클라이언트 사이드 라우팅, 프리페칭 지원
 * - useLocation: 현재 경로 정보 접근
 * - Progressive Enhancement: JavaScript 없이도 링크 동작
 *
 * [신입 개발자를 위한 설명]
 * Header는 모든 페이지 상단에 표시되는 네비게이션 바입니다.
 * - 로고 및 메인 메뉴
 * - 현재 활성화된 페이지 하이라이트
 * - 모바일 반응형 메뉴 (햄버거 메뉴)
 * - 사용자 인증 상태에 따른 메뉴 변경
 *
 * [성능 최적화]
 * Remix의 Link 컴포넌트는 자동으로:
 * - 링크에 마우스를 올리면 해당 페이지의 데이터를 프리페치
 * - 페이지 전환 시 필요한 리소스만 로드
 * - 브라우저 히스토리 API 활용으로 빠른 네비게이션
 *
 * @returns {JSX.Element} 헤더 UI
 */

interface NavItem {
  name: string;
  path: string;
}

/**
 * [네비게이션 메뉴 구성]
 * 애플리케이션의 주요 페이지들을 배열로 관리합니다.
 * 새로운 페이지를 추가할 때 이 배열에 항목을 추가하면 됩니다.
 */
const navItems: NavItem[] = [
  { name: "홈", path: "/" },
  { name: "소개", path: "/about" },
  { name: "게시글", path: "/posts" },
  { name: "블로그", path: "/blog" },
  { name: "대시보드", path: "/dashboard" },
  { name: "클라이언트 데모", path: "/client-demo" },
];

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /**
   * [활성 링크 확인]
   * 현재 경로와 링크 경로를 비교하여 활성 상태를 결정합니다.
   * 정확히 일치하거나 (홈 제외) 경로가 시작하는 경우 활성으로 표시합니다.
   */
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  /**
   * [스타일 함수]
   * 링크가 활성 상태인지에 따라 다른 스타일을 적용합니다.
   */
  const getLinkClassName = (path: string) => {
    const baseClasses =
      "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";
    const activeClasses = "bg-blue-600 text-white";
    const inactiveClasses = "text-gray-700 hover:bg-gray-100 hover:text-gray-900";

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  const getMobileLinkClassName = (path: string) => {
    const baseClasses =
      "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200";
    const activeClasses = "bg-blue-600 text-white";
    const inactiveClasses = "text-gray-700 hover:bg-gray-100 hover:text-gray-900";

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* 로고 */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Remix App
              </span>
            </Link>
          </div>

          {/* 데스크톱 네비게이션 */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={getLinkClassName(item.path)}
                prefetch="intent"
              >
                {item.name}
              </Link>
            ))}

            {/* 인증 관련 메뉴 */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
              <Link
                to="/login"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
                prefetch="intent"
              >
                로그인
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                prefetch="intent"
              >
                회원가입
              </Link>
            </div>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={mobileMenuOpen}
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? (
                // X 아이콘
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // 햄버거 아이콘
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 (햄버거 메뉴 클릭 시 표시) */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={getMobileLinkClassName(item.path)}
                  onClick={() => setMobileMenuOpen(false)}
                  prefetch="intent"
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 mt-2 pt-2">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                  prefetch="intent"
                >
                  로그인
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 mt-1"
                  onClick={() => setMobileMenuOpen(false)}
                  prefetch="intent"
                >
                  회원가입
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
