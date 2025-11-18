import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import { Card } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";

/**
 * 컴포넌트명: ClientDemo
 * 용도: 클라이언트 사이드 렌더링(CSR) 예제
 *
 * [Remix v2 특징]
 * - CSR: useEffect에서 데이터 페칭
 * - SSR과 CSR 비교를 위한 예제
 * - useState: 클라이언트 상태 관리
 *
 * [신입 개발자를 위한 설명]
 * 이 페이지는 클라이언트에서 데이터를 가져오는 예제입니다.
 * SSR(loader 사용)과 달리, 컴포넌트가 마운트된 후에 데이터를 가져옵니다.
 *
 * [SSR vs CSR]
 * SSR (loader):
 * - 장점: SEO 최적화, 빠른 초기 로딩
 * - 단점: 서버 부하
 *
 * CSR (useEffect):
 * - 장점: 서버 부하 감소, 동적 업데이트
 * - 단점: SEO 어려움, 초기 로딩 느림
 */

export const meta: MetaFunction = () => {
  return [
    { title: "클라이언트 데모 - Remix App" },
    { name: "description", content: "클라이언트 사이드 렌더링 예제" },
  ];
};

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export default function ClientDemo() {
  /**
   * [상태 관리]
   */
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [count, setCount] = useState(0);

  /**
   * [데이터 페칭]
   * useEffect를 사용하여 클라이언트에서 데이터를 가져옵니다.
   */
  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("데이터를 가져오는데 실패했습니다.");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  /**
   * [필터링]
   * 검색어에 따라 사용자 목록을 필터링합니다.
   */
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            클라이언트 사이드 렌더링 데모
          </h1>
          <p className="text-lg text-gray-600">
            이 페이지는 클라이언트에서 데이터를 가져오는 예제입니다.
          </p>
        </div>

        {/* 카운터 예제 */}
        <Card className="mb-6">
          <Card.Header>
            <h2 className="text-2xl font-bold text-gray-900">
              인터랙티브 카운터
            </h2>
          </Card.Header>
          <Card.Body>
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="secondary"
                onClick={() => setCount(count - 1)}
                size="lg"
              >
                -
              </Button>
              <span className="text-4xl font-bold text-blue-600">{count}</span>
              <Button
                variant="primary"
                onClick={() => setCount(count + 1)}
                size="lg"
              >
                +
              </Button>
            </div>
            <div className="mt-4 text-center">
              <Button variant="ghost" onClick={() => setCount(0)}>
                리셋
              </Button>
            </div>
          </Card.Body>
        </Card>

        {/* 사용자 목록 */}
        <Card>
          <Card.Header>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              사용자 목록 (API 호출)
            </h2>
            <Input
              placeholder="이름 또는 이메일로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              }
            />
          </Card.Header>
          <Card.Body>
            {/* 로딩 상태 */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">로딩 중...</span>
              </div>
            )}

            {/* 에러 상태 */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {/* 사용자 목록 */}
            {!loading && !error && (
              <div className="space-y-3">
                {filteredUsers.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    검색 결과가 없습니다.
                  </p>
                ) : (
                  filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {user.name}
                          </h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-sm text-gray-500">
                            @{user.username}
                          </p>
                        </div>
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                          <span className="text-blue-600 font-semibold">
                            {user.id}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {!loading && !error && (
              <div className="mt-4 text-sm text-gray-500 text-center">
                총 {filteredUsers.length}명의 사용자
              </div>
            )}
          </Card.Body>
        </Card>

        {/* 설명 */}
        <Card className="mt-6">
          <Card.Header>
            <h2 className="text-xl font-bold text-gray-900">CSR vs SSR</h2>
          </Card.Header>
          <Card.Body>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  클라이언트 사이드 렌더링 (CSR)
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>컴포넌트가 마운트된 후 데이터 페칭</li>
                  <li>로딩 상태 직접 관리</li>
                  <li>SEO에 불리 (초기 HTML에 데이터 없음)</li>
                  <li>동적 인터랙션에 적합</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  서버 사이드 렌더링 (SSR)
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>페이지 렌더링 전 서버에서 데이터 준비</li>
                  <li>초기 HTML에 데이터 포함</li>
                  <li>SEO에 유리</li>
                  <li>빠른 초기 로딩</li>
                </ul>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
