/**
 * 페이지명: Posts List
 * 용도: 게시글 목록 페이지
 *
 * [Remix v2 특징]
 * - loader: 서버에서 데이터를 가져옴 (SSR)
 * - useLoaderData: loader에서 반환한 데이터 사용
 * - Link: 클라이언트 사이드 라우팅 및 프리페칭
 *
 * [신입 개발자를 위한 설명]
 * 이 페이지는 게시글 목록을 서버에서 가져와 표시합니다.
 * loader 함수가 서버에서 실행되어 데이터를 가져오고,
 * 컴포넌트는 이미 데이터가 로드된 상태로 렌더링됩니다.
 */

import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Card, CardBody, CardHeader } from "~/components/ui/Card";

export const meta: MetaFunction = () => {
  return [
    { title: "게시글 목록 - Next.js vs Remix" },
    {
      name: "description",
      content: "게시글 목록 페이지",
    },
  ];
};

/**
 * 게시글 타입
 */
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

/**
 * 게시글 데이터 가져오기 (서버 사이드)
 * 실제 프로젝트에서는 데이터베이스에서 가져옵니다.
 */
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // JSONPlaceholder API 사용 (데모용)
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=12');

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const posts: Post[] = await response.json();
    return json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return json({ posts: [] });
  }
}

/**
 * 게시글 목록 페이지
 */
export default function PostsPage() {
  // loader에서 반환한 데이터 가져오기
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">게시글 목록</h1>
        <p className="text-gray-600">
          총 <strong>{posts.length}</strong>개의 게시글이 있습니다.
        </p>
      </div>

      {/* 게시글이 없는 경우 */}
      {posts.length === 0 ? (
        <Card>
          <CardBody>
            <p className="text-center text-gray-500 py-8">게시글이 없습니다.</p>
          </CardBody>
        </Card>
      ) : (
        /* 게시글 목록 */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} to={`/posts/${post.id}`} prefetch="intent">
              <Card hoverable className="h-full">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">
                    {post.title}
                  </h2>
                </CardHeader>
                <CardBody>
                  <p className="text-gray-600 line-clamp-3 mb-4">{post.body}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>작성자: User {post.userId}</span>
                    <span className="text-blue-600 font-medium">자세히 보기 →</span>
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* 페이지네이션 (간단한 버전) */}
      <div className="mt-12 flex justify-center">
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            이전
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md">1</button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            2
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            3
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
