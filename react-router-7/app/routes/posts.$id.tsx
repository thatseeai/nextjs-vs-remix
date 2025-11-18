import type {
  MetaFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "react-router";
import { json, redirect } from "react-router";
import { useLoaderData, Link, useFetcher } from "react-router";
import { useState } from "react";
import { Card } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";
import { formatDate } from "~/lib/utils";
import type { Post } from "./posts._index";
import { HTTP_STATUS } from "~/lib/constants";

/**
 * 컴포넌트명: PostDetail
 * 용도: 게시글 상세 페이지 (동적 라우트 예제)
 *
 * [React Router 7 특징]
 * - 동적 라우트: $id 파라미터로 게시글 ID 받기
 * - loader: URL 파라미터를 사용하여 데이터 로드
 * - action: 좋아요 등의 서버 액션 처리
 * - useFetcher: 페이지 리로드 없이 서버 액션 실행
 *
 * [신입 개발자를 위한 설명]
 * 동적 라우트는 URL의 일부를 변수로 사용합니다.
 * $id는 실제 게시글 ID로 대체됩니다.
 * 예: /posts/1, /posts/2, /posts/abc123
 *
 * [라우팅]
 * - 파일 위치: app/routes/posts.$id.tsx
 * - URL 경로: /posts/:id (예: /posts/1)
 * - 동적 파라미터: $id
 */

/**
 * [메타 함수]
 * loader 데이터를 사용하여 동적으로 메타 태그 생성
 */
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [{ title: "게시글을 찾을 수 없습니다 - React Router 7 App" }];
  }

  return [
    { title: `${data.post.title} - React Router 7 App` },
    { name: "description", content: data.post.excerpt },
    { property: "og:title", content: data.post.title },
    { property: "og:description", content: data.post.excerpt },
    { property: "og:type", content: "article" },
  ];
};

/**
 * [Loader 함수]
 * URL 파라미터를 사용하여 특정 게시글 데이터 로드
 *
 * @param params - URL 파라미터 ({ id })
 * @returns 게시글 데이터
 */
export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  /**
   * [파라미터 검증]
   * id가 없으면 에러 처리
   */
  if (!id) {
    throw new Response("게시글 ID가 필요합니다.", {
      status: HTTP_STATUS.BAD_REQUEST,
    });
  }

  /**
   * [더미 데이터]
   * 실제 프로젝트에서는 데이터베이스에서 조회합니다.
   * 예: const post = await db.posts.findUnique({ where: { id } });
   */
  const posts: Record<string, Post> = {
    "1": {
      id: "1",
      title: "React Router 7와 Vite로 시작하기",
      excerpt:
        "React Router 7에서 Vite를 빌드 도구로 사용하는 방법을 알아봅니다.",
      content: `
# React Router 7와 Vite 소개

React Router 7는 Vite를 공식 빌드 도구로 채택하여 개발 경험을 크게 향상시켰습니다.

## 주요 특징

### 1. 빠른 개발 서버
Vite의 esbuild 기반 프리번들링으로 매우 빠른 콜드 스타트를 제공합니다.
서버 시작 시간이 기존 대비 10배 이상 빨라졌습니다.

### 2. HMR (Hot Module Replacement)
코드 변경 시 브라우저를 새로고침하지 않고도 즉시 반영됩니다.
개발 생산성이 크게 향상됩니다.

### 3. 최적화된 프로덕션 빌드
Rollup 기반의 프로덕션 빌드로 최적화된 번들을 생성합니다.

## 시작하기

\`\`\`bash
# 프로젝트 생성
npx create-remix@latest

# Vite 템플릿 선택
? What type of app do you want to create?
  ❯ Vite

# 개발 서버 실행
npm run dev
\`\`\`

## 설정 파일

vite.config.ts 파일에서 Vite 설정을 관리합니다:

\`\`\`typescript
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [remix()],
});
\`\`\`

## 결론

React Router 7와 Vite의 조합은 최고의 개발 경험과 성능을 제공합니다.
기존 React Router 7 사용자도 마이그레이션을 고려해볼 만한 가치가 있습니다.
      `,
      author: "홍길동",
      createdAt: new Date("2024-01-15").toISOString(),
      views: 1234,
      likes: 89,
    },
    "2": {
      id: "2",
      title: "Progressive Enhancement 이해하기",
      excerpt: "JavaScript 없이도 동작하는 웹 애플리케이션을 만드는 방법",
      content:
        "Progressive Enhancement는 기본 HTML 기능부터 시작하여 점진적으로 향상시키는 전략입니다...",
      author: "김철수",
      createdAt: new Date("2024-01-14").toISOString(),
      views: 987,
      likes: 67,
    },
    "3": {
      id: "3",
      title: "Loader와 Action 마스터하기",
      excerpt: "React Router 7의 핵심 개념인 loader와 action을 완벽하게 이해합니다",
      content:
        "Loader는 데이터를 읽고, Action은 데이터를 쓰는 역할을 합니다...",
      author: "이영희",
      createdAt: new Date("2024-01-13").toISOString(),
      views: 756,
      likes: 54,
    },
    "4": {
      id: "4",
      title: "Vitest로 테스트 작성하기",
      excerpt: "Vite와 완벽하게 통합되는 Vitest로 테스트 작성",
      content: "Vitest는 Vite 기반의 빠른 테스트 프레임워크입니다...",
      author: "박민수",
      createdAt: new Date("2024-01-12").toISOString(),
      views: 645,
      likes: 42,
    },
    "5": {
      id: "5",
      title: "Tailwind CSS로 스타일링하기",
      excerpt: "유틸리티 우선 CSS 프레임워크로 빠른 스타일링",
      content: "Tailwind CSS는 유틸리티 클래스를 사용한 스타일링을 제공합니다...",
      author: "정수진",
      createdAt: new Date("2024-01-11").toISOString(),
      views: 534,
      likes: 38,
    },
  };

  const post = posts[id];

  /**
   * [404 처리]
   * 게시글을 찾을 수 없으면 404 에러 발생
   */
  if (!post) {
    throw new Response("게시글을 찾을 수 없습니다.", {
      status: HTTP_STATUS.NOT_FOUND,
    });
  }

  return json({ post });
}

/**
 * [Action 함수]
 * 폼 제출이나 좋아요 등의 서버 액션을 처리합니다.
 *
 * [Progressive Enhancement]
 * JavaScript가 없어도 폼이 동작하며,
 * JavaScript가 있으면 useFetcher로 페이지 리로드 없이 처리됩니다.
 */
export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  /**
   * [의도 기반 라우팅]
   * intent 필드로 어떤 액션을 수행할지 결정합니다.
   */
  if (intent === "like") {
    /**
     * [실제 프로젝트에서는]
     * 데이터베이스 업데이트를 수행합니다.
     * 예: await db.posts.update({ where: { id: params.id }, data: { likes: { increment: 1 } } });
     */
    console.log(`게시글 ${params.id}에 좋아요 추가`);

    // 성공 응답 반환
    return json({ success: true, message: "좋아요를 추가했습니다." });
  }

  return json({ success: false, message: "알 수 없는 액션입니다." });
}

export default function PostDetail() {
  const { post } = useLoaderData<typeof loader>();

  /**
   * [useFetcher]
   * 페이지 리로드 없이 서버 액션을 실행하는 훅입니다.
   * Form 컴포넌트 대신 fetcher.Form을 사용합니다.
   */
  const likeFetcher = useFetcher();
  const [isLiked, setIsLiked] = useState(false);

  /**
   * [낙관적 UI 업데이트]
   * 서버 응답을 기다리지 않고 UI를 먼저 업데이트합니다.
   */
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* 뒤로 가기 */}
        <div className="mb-6">
          <Link
            to="/posts"
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
            prefetch="intent"
          >
            <svg
              className="h-5 w-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            목록으로 돌아가기
          </Link>
        </div>

        {/* 게시글 내용 */}
        <Card>
          {/* 헤더 */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            {/* 메타 정보 */}
            <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4">
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
            </div>
          </div>

          {/* 구분선 */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* 본문 */}
          <div className="prose prose-lg max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: post.content.replace(/\n/g, "<br />"),
              }}
              className="text-gray-700 leading-relaxed whitespace-pre-wrap"
            />
          </div>

          {/* 구분선 */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* 액션 버튼 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* 좋아요 버튼 */}
              <likeFetcher.Form method="post" onSubmit={handleLike}>
                <input type="hidden" name="intent" value="like" />
                <Button
                  type="submit"
                  variant={isLiked ? "primary" : "secondary"}
                  size="sm"
                >
                  <svg
                    className={`h-5 w-5 mr-1 ${isLiked ? "fill-current" : ""}`}
                    fill={isLiked ? "currentColor" : "none"}
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
                  {post.likes + (isLiked ? 1 : 0)}
                </Button>
              </likeFetcher.Form>

              {/* 공유 버튼 */}
              <Button variant="secondary" size="sm">
                <svg
                  className="h-5 w-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                공유
              </Button>
            </div>

            {/* 수정/삭제 버튼 (권한 있을 때만) */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                수정
              </Button>
              <Button variant="danger" size="sm">
                삭제
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

/**
 * [에러 바운더리]
 * 404나 다른 에러 발생 시 표시되는 UI
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
              게시글을 찾을 수 없습니다
            </h2>
            <p className="text-gray-600 mb-4">
              요청하신 게시글이 존재하지 않거나 삭제되었습니다.
            </p>
            <Link to="/posts">
              <Button variant="primary">목록으로 돌아가기</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
