/**
 * 레이아웃명: Dashboard Layout
 * 용도: 대시보드 전용 중첩 레이아웃
 *
 * [Next.js 특징]
 * - 중첩 레이아웃: dashboard 하위 모든 페이지에 공통 UI 적용
 * - 사이드바와 메인 콘텐츠 영역으로 구성
 * - 레이아웃은 페이지 전환 시에도 유지됨 (상태 보존)
 *
 * [신입 개발자를 위한 설명]
 * 중첩 레이아웃은 특정 라우트 그룹에만 적용되는 레이아웃입니다.
 * /dashboard, /dashboard/profile 등 모든 dashboard 하위 페이지에
 * 이 레이아웃이 적용되어 일관된 UI를 제공합니다.
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { href: '/dashboard', label: '대시보드', icon: '📊' },
    { href: '/dashboard/profile', label: '프로필', icon: '👤' },
    { href: '/dashboard/settings', label: '설정', icon: '⚙️' },
    { href: '/dashboard/analytics', label: '분석', icon: '📈' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* 사이드바 */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">대시보드</h2>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                    ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* 사이드바 하단 */}
          <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                U
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">사용자</p>
                <p className="text-xs text-gray-500">user@example.com</p>
              </div>
            </div>
          </div>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
