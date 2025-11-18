/**
 * 페이지명: Dashboard
 * 용도: 메인 대시보드 페이지
 *
 * [Next.js 특징]
 * - 보호된 경로: middleware에서 인증 체크
 * - 중첩 레이아웃 내부에 렌더링
 * - Client Component로 실시간 데이터 표시
 *
 * [신입 개발자를 위한 설명]
 * 대시보드는 사용자가 로그인한 후 볼 수 있는 개인 공간입니다.
 * middleware.ts에서 인증을 체크하여 로그인하지 않은 사용자는
 * 자동으로 로그인 페이지로 리다이렉트됩니다.
 */

'use client';

import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { useAuthStore } from '@/store/authStore';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    posts: 0,
    views: 0,
    likes: 0,
    comments: 0,
  });

  useEffect(() => {
    // 통계 데이터 가져오기 (시뮬레이션)
    const fetchStats = async () => {
      // 실제로는 API 호출
      await new Promise((resolve) => setTimeout(resolve, 500));
      setStats({
        posts: 24,
        views: 1234,
        likes: 567,
        comments: 89,
      });
    };

    fetchStats();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          안녕하세요, {user?.name || '사용자'}님! 👋
        </h1>
        <p className="text-gray-600">대시보드에 오신 것을 환영합니다.</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody className="text-center">
            <div className="text-4xl mb-2">📝</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.posts}</div>
            <div className="text-sm text-gray-500">작성한 게시글</div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-4xl mb-2">👁️</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.views}</div>
            <div className="text-sm text-gray-500">총 조회수</div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-4xl mb-2">❤️</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.likes}</div>
            <div className="text-sm text-gray-500">받은 좋아요</div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="text-4xl mb-2">💬</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.comments}</div>
            <div className="text-sm text-gray-500">댓글 수</div>
          </CardBody>
        </Card>
      </div>

      {/* 최근 활동 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">최근 게시글</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold">
                    {i}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">게시글 제목 {i}</h3>
                    <p className="text-sm text-gray-500">2시간 전 • 조회수 45</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">활동 그래프</h2>
          </CardHeader>
          <CardBody>
            <div className="h-48 flex items-end justify-between space-x-2">
              {[40, 70, 45, 80, 60, 90, 75].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-blue-500 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-2">
                    {['월', '화', '수', '목', '금', '토', '일'][i]}
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
