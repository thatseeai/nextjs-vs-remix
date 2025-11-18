import type { MetaFunction, LoaderFunctionArgs } from "react-router";
import { Link, useLoaderData } from "react-router";
import { Card } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";
import { formatDate } from "~/lib/utils";

/**
 * 컴포넌트명: PostsIndex
 * 용도: 게시글 목록 페이지 (SSR 예제)
 *
 * [React Router 7 특징]
 * - loader: 서버에서 데이터를 가져옴 (SSR)
 * - useLoaderData: loader에서 반환한 데이터 사용
 * - Link: 클라이언트 사이드 라우팅 및 프리페칭
 *
 * [신입 개발자를 위한 설명]
 * 이 페이지는 서버 사이드 렌더링(SSR)을 보여주는 예제입니다.
 * loader 함수가 서버에서 실행되어 데이터를 가져오고,
 * 컴포넌트는 이미 데이터가 로드된 상태로 렌더링됩니다.
 *
 * [라우팅]
 * - 파일 위치: app/routes/posts._index.tsx
 * - URL 경로: /posts
 * - 부모 라우트: posts (존재하지 않으면 기본 레이아웃 사용)
 * - _index: 부모 라우트의 인덱스 페이지
 */

/**
 * [게시글 타입 정의]
 */
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  createdAt: string;
  views: number;
  likes: number;
}

/**
 * [메타 함수]
 * 페이지의 SEO 메타데이터 설정
 */
export const meta: MetaFunction = () => {
  return [
    { title: "게시글 목록 - React Router 7 App" },
    {
      name: "description",
      content: "React Router 7 App의 게시글 목록 페이지입니다.",
    },
  ];
};

/**
 * [Loader 함수]
 * 서버에서 실행되어 페이지 렌더링 전에 데이터를 가져옵니다.
 *
 * [동작 방식]
 * 1. 사용자가 /posts 접속
 * 2. 서버에서 loader 실행
 * 3. 데이터를 가져와서 JSON으로 반환
 * 4. 컴포넌트가 데이터와 함께 렌더링
 * 5. HTML이 클라이언트로 전송
 *
 * [장점]
 * - SEO 최적화 (검색 엔진이 콘텐츠 확인 가능)
 * - 빠른 초기 로딩 (데이터가 이미 포함됨)
 * - 서버에서만 실행되므로 민감한 정보 접근 가능
 */
export async function loader({ request }: LoaderFunctionArgs) {
  /**
   * [실제 프로젝트에서는]
   * 데이터베이스나 API에서 데이터를 가져옵니다.
   * 예: const posts = await db.posts.findMany();
   *
   * [현재는]
   * 데모를 위해 더미 데이터를 사용합니다.
   */
  const posts: Post[] = [
    {
      id: "1",
      title: "React Router 7와 Vite로 시작하기",
      excerpt:
        "React Router 7에서 Vite를 빌드 도구로 사용하는 방법을 알아봅니다. Vite의 빠른 HMR과 React Router 7의 강력한 서버 사이드 기능을 결합하여 최고의 개발 경험을 제공합니다.",
      content: "React Router 7와 Vite에 대한 상세한 내용...",
      author: "홍길동",
      createdAt: new Date("2024-01-15").toISOString(),
      views: 1234,
      likes: 89,
    },
    {
      id: "2",
      title: "Progressive Enhancement 이해하기",
      excerpt:
        "JavaScript 없이도 동작하는 웹 애플리케이션을 만드는 방법을 배웁니다. 기본 HTML 폼부터 시작하여 점진적으로 기능을 향상시키는 전략을 살펴봅니다.",
      content: "Progressive Enhancement에 대한 상세한 내용...",
      author: "김철수",
      createdAt: new Date("2024-01-14").toISOString(),
      views: 987,
      likes: 67,
    },
    {
      id: "3",
      title: "Loader와 Action 마스터하기",
      excerpt:
        "React Router 7의 핵심 개념인 loader와 action을 완벽하게 이해합니다. 서버 사이드에서 데이터를 읽고 쓰는 방법, 에러 처리, 그리고 최적화 기법을 다룹니다.",
      content: "Loader와 Action에 대한 상세한 내용...",
      author: "이영희",
      createdAt: new Date("2024-01-13").toISOString(),
      views: 756,
      likes: 54,
    },
    {
      id: "4",
      title: "Vitest로 테스트 작성하기",
      excerpt:
        "Vite와 완벽하게 통합되는 Vitest로 단위 테스트와 통합 테스트를 작성합니다. Jest보다 5-10배 빠른 테스트 실행 속도를 경험해보세요.",
      content: "Vitest에 대한 상세한 내용...",
      author: "박민수",
      createdAt: new Date("2024-01-12").toISOString(),
      views: 645,
      likes: 42,
    },
    {
      id: "5",
      title: "Tailwind CSS로 스타일링하기",
      excerpt:
        "유틸리티 우선 CSS 프레임워크인 Tailwind CSS를 사용하여 빠르고 일관된 스타일링을 구현합니다. 커스터마이징과 최적화 방법도 함께 알아봅니다.",
      content: "Tailwind CSS에 대한 상세한 내용...",
      author: "정수진",
      createdAt: new Date("2024-01-11").toISOString(),
      views: 534,
      likes: 38,
    },
  ];

  /**
   * [데이터 반환]
   * React Router 7에서는 객체를 직접 반환할 수 있습니다.
   * 타입 안정성을 위해 타입을 명시합니다.
   */
  return { posts };
}

export default function PostsIndex() {
  /**
   * [useLoaderData 훅]
   * loader에서 반환한 데이터를 가져옵니다.
   * TypeScript를 사용하여 타입 안정성을 확보합니다.
   */
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">게시글</h1>
          <p className="text-lg text-gray-600">
            React Router 7와 관련된 다양한 주제의 게시글을 확인하세요.
          </p>
        </div>

        {/* 게시글 목록 */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} hoverable>
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <Link to={`/posts/${post.id}`} prefetch="intent">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                </div>

                {/* 메타 정보 */}
                <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 border-t border-gray-200 pt-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <svg
                        className="h-4 w-4 mr-1"
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
                      {post.author}
                    </span>
                    <span className="flex items-center">
                      <svg
                        className="h-4 w-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                    <span className="flex items-center">
                      <svg
                        className="h-4 w-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      {post.views.toLocaleString()}
                    </span>
                    <span className="flex items-center">
                      <svg
                        className="h-4 w-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      {post.likes}
                    </span>
                  </div>
                </div>

                {/* 버튼 */}
                <div className="mt-4">
                  <Link to={`/posts/${post.id}`} prefetch="intent">
                    <Button variant="primary" size="sm">
                      자세히 보기
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* 빈 상태 */}
        {posts.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                게시글이 없습니다
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                아직 작성된 게시글이 없습니다.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

/**
 * [에러 바운더리]
 * 이 라우트에서 발생하는 에러를 처리합니다.
 */
export function ErrorBoundary() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card>
          <div className="text-center py-8">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              게시글을 불러올 수 없습니다
            </h2>
            <p className="text-gray-600 mb-4">
              일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
            </p>
            <Link to="/posts">
              <Button variant="primary">다시 시도</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
