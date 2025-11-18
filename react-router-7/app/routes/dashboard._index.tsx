import type { MetaFunction } from "react-router";
import { Card } from "~/components/ui/Card";

/**
 * 컴포넌트명: Dashboard Index
 * 용도: 대시보드 메인 페이지
 *
 * [React Router 7 특징]
 * - _index: 부모 라우트의 인덱스 페이지
 * - dashboard.tsx의 Outlet에 렌더링됨
 */

export const meta: MetaFunction = () => {
  return [
    { title: "대시보드 - React Router 7 App" },
    { name: "description", content: "사용자 대시보드" },
  ];
};

export default function DashboardIndex() {
  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">환영합니다!</h2>
        <p className="text-gray-600">
          React Router 7 대시보드에 오신 것을 환영합니다. 이 페이지는 중첩 라우트의
          예시입니다.
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">24</div>
            <div className="text-sm text-gray-600 mt-1">총 게시글</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">156</div>
            <div className="text-sm text-gray-600 mt-1">총 조회수</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">42</div>
            <div className="text-sm text-gray-600 mt-1">총 좋아요</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
