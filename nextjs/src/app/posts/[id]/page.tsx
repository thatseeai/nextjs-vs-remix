/**
 * 페이지명: Post Detail
 * 용도: 게시글 상세 페이지 (동적 라우트 + SSR)
 *
 * [Next.js 특징]
 * - 동적 라우트: /posts/[id] 형식으로 URL 파라미터 처리
 * - generateMetadata로 동적 메타데이터 생성 (SEO 최적화)
 * - Server Component로 서버 사이드 렌더링
 *
 * [신입 개발자를 위한 설명]
 * 동적 라우트는 URL의 일부가 변수인 경로입니다.
 * [id] 폴더는 /posts/1, /posts/2 등 모든 경로에 매칭됩니다.
 * params를 통해 URL에서 id 값을 받아와 해당 게시글을 조회합니다.
 * 매 요청마다 서버에서 데이터를 가져오므로 항상 최신 데이터를 표시합니다.
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';

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
 * 사용자 타입
 */
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

/**
 * 게시글 데이터 가져오기
 */
async function getPost(id: string): Promise<Post | null> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      // 캐시 비활성화 (항상 최신 데이터)
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

/**
 * 사용자 정보 가져오기
 */
async function getUser(userId: number): Promise<User | null> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

/**
 * 동적 메타데이터 생성
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return {
      title: '게시글을 찾을 수 없습니다',
    };
  }

  return {
    title: `${post.title} - Next.js vs Remix`,
    description: post.body.substring(0, 160),
  };
}

/**
 * 게시글 상세 페이지
 */
export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 병렬로 데이터 가져오기
  const post = await getPost(id);

  // 게시글이 없으면 404 페이지 표시
  if (!post) {
    notFound();
  }

  // 작성자 정보 가져오기
  const author = await getUser(post.userId);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* 뒤로 가기 버튼 */}
      <Link href="/posts" className="inline-block mb-6">
        <Button variant="outline">← 목록으로</Button>
      </Link>

      {/* 게시글 내용 */}
      <Card>
        <CardHeader>
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              {author && (
                <>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-2">
                      {author.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{author.name}</p>
                      <p className="text-gray-500">@{author.username}</p>
                    </div>
                  </div>
                  <span>•</span>
                  <span>{author.email}</span>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{post.body}</p>
          </div>

          {/* 추가 정보 */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                <p>게시글 ID: {post.id}</p>
                <p>작성자 ID: {post.userId}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  수정
                </Button>
                <Button variant="danger" size="sm">
                  삭제
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* 댓글 섹션 (추후 구현) */}
      <Card className="mt-6">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">댓글</h2>
        </CardHeader>
        <CardBody>
          <p className="text-gray-500 text-center py-8">아직 댓글이 없습니다.</p>
        </CardBody>
      </Card>
    </div>
  );
}
