import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLocation } from "@remix-run/react";
import { Card } from "~/components/ui/Card";

/**
 * 컴포넌트명: Dashboard Layout
 * 용도: 대시보드 중첩 라우트의 레이아웃
 *
 * [Remix v2 특징]
 * - 중첩 라우트: 부모 레이아웃을 정의하고 자식 라우트가 Outlet에 렌더링
 * - 공통 레이아웃: 사이드바 등 공통 UI를 한 번만 정의
 * - Outlet: 자식 라우트의 컴포넌트가 렌더링되는 위치
 *
 * [신입 개발자를 위한 설명]
 * 중첩 라우트는 공통 레이아웃을 공유하는 페이지들을 구성할 때 사용합니다.
 * dashboard.tsx는 레이아웃을 정의하고,
 * dashboard._index.tsx, dashboard.profile.tsx 등은 실제 콘텐츠를 정의합니다.
 *
 * [라우트 구조]
 * - dashboard.tsx (이 파일) → /dashboard (레이아웃)
 *   - dashboard._index.tsx → /dashboard (인덱스)
 *   - dashboard.profile.tsx → /dashboard/profile
 *   - dashboard.settings.tsx → /dashboard/settings
 */

/**
 * [Loader]
 * 인증 체크 등 공통 로직을 수행할 수 있습니다.
 */
export async function loader({ request }: LoaderFunctionArgs) {
  /**
   * [실제 프로젝트에서는]
   * 세션을 확인하여 로그인 여부를 체크합니다.
   * 예: const user = await requireUser(request);
   */
  return json({});
}

export default function DashboardLayout() {
  const location = useLocation();

  /**
   * [네비게이션 메뉴]
   */
  const navItems = [
    { name: "개요", path: "/dashboard", icon: "home" },
    { name: "프로필", path: "/dashboard/profile", icon: "user" },
  ];

  /**
   * [활성 메뉴 확인]
   */
  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">대시보드</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 사이드바 */}
          <aside className="lg:col-span-1">
            <Card padding="sm">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                      ${
                        isActive(item.path)
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                    prefetch="intent"
                  >
                    {item.icon === "home" && (
                      <svg
                        className="mr-3 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    )}
                    {item.icon === "user" && (
                      <svg
                        className="mr-3 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    )}
                    {item.name}
                  </Link>
                ))}
              </nav>
            </Card>
          </aside>

          {/* 메인 콘텐츠 */}
          <main className="lg:col-span-3">
            {/* 자식 라우트가 여기에 렌더링됩니다 */}
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
