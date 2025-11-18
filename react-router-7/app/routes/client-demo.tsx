/**
 * 페이지명: Client Demo (CSR)
 * 용도: 클라이언트 사이드 렌더링 데모 페이지
 *
 * [React Router 7 특징]
 * - CSR: useEffect에서 데이터 페칭
 * - useState: 클라이언트 상태 관리
 * - 로딩 상태 및 에러 처리 구현
 *
 * [신입 개발자를 위한 설명]
 * CSR(Client Side Rendering)은 브라우저에서 데이터를 가져와 렌더링합니다.
 * 페이지가 먼저 로드되고, 이후 JavaScript가 실행되어 데이터를 가져옵니다.
 * 초기 로딩은 SSR보다 느리지만, 이후 인터랙션이 빠르고 실시간 데이터에 적합합니다.
 */

import type { MetaFunction } from "react-router";
import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";

export const meta: MetaFunction = () => {
  return [
    { title: "클라이언트 데모 - Next.js vs Remix" },
    { name: "description", content: "클라이언트 사이드 렌더링 예제" },
  ];
};

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

export default function ClientDemoPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // 데이터 페칭
  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");

      if (!response.ok) {
        throw new Error("데이터를 가져오는데 실패했습니다.");
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          클라이언트 사이드 렌더링 (CSR) 데모
        </h1>
        <p className="text-gray-600 mb-4">
          이 페이지는 브라우저에서 데이터를 가져와 렌더링합니다.
          네트워크 탭을 열어 데이터 요청을 확인해보세요.
        </p>
        <div className="flex space-x-4">
          <Button onClick={fetchUsers} disabled={isLoading}>
            {isLoading ? "로딩 중..." : "새로고침"}
          </Button>
          <Button variant="outline" onClick={() => setUsers([])}>
            초기화
          </Button>
        </div>
      </div>

      {/* 로딩 상태 */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">데이터를 불러오는 중...</p>
          </div>
        </div>
      )}

      {/* 에러 상태 */}
      {error && !isLoading && (
        <Card className="border-red-200 bg-red-50">
          <CardBody>
            <div className="flex items-center space-x-3">
              <span className="text-3xl">⚠️</span>
              <div>
                <h3 className="text-red-900 font-semibold mb-1">오류 발생</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* 사용자 목록 */}
      {!isLoading && !error && users.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 목록 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              사용자 목록 ({users.length})
            </h2>
            <div className="space-y-3">
              {users.map((user) => (
                <Card
                  key={user.id}
                  hoverable
                  onClick={() => setSelectedUser(user)}
                  className={`cursor-pointer transition-all ${
                    selectedUser?.id === user.id ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <CardBody>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{user.name}</h3>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <span className="text-gray-400">→</span>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>

          {/* 상세 정보 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">상세 정보</h2>
            {selectedUser ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                      {selectedUser.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {selectedUser.name}
                      </h3>
                      <p className="text-gray-500">ID: {selectedUser.id}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-1">이메일</h4>
                      <p className="text-gray-900">{selectedUser.email}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-1">전화번호</h4>
                      <p className="text-gray-900">{selectedUser.phone}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-1">웹사이트</h4>
                      <a
                        href={`https://${selectedUser.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {selectedUser.website}
                      </a>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ) : (
              <Card>
                <CardBody>
                  <p className="text-center text-gray-500 py-12">
                    왼쪽에서 사용자를 선택하세요
                  </p>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* 데이터 없음 */}
      {!isLoading && !error && users.length === 0 && (
        <Card>
          <CardBody>
            <p className="text-center text-gray-500 py-12">데이터가 없습니다.</p>
          </CardBody>
        </Card>
      )}

      {/* CSR 설명 */}
      <Card className="mt-8">
        <CardHeader>
          <h3 className="text-xl font-semibold text-gray-900">CSR의 특징</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-green-700 mb-2">장점</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• 빠른 페이지 전환</li>
                <li>• 실시간 데이터 업데이트 가능</li>
                <li>• 풍부한 사용자 인터랙션</li>
                <li>• 서버 부하 감소</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-700 mb-2">단점</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• SEO에 불리할 수 있음</li>
                <li>• 초기 로딩 시간 증가</li>
                <li>• JavaScript 의존성</li>
                <li>• 번들 크기 증가 가능</li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
