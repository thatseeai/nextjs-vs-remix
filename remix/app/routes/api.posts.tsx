import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { HTTP_STATUS } from "~/lib/constants";

/**
 * 파일명: api.posts.tsx
 * 용도: 게시글 API Resource Route
 *
 * [Remix v2 특징]
 * - Resource Route: UI를 렌더링하지 않고 데이터만 반환
 * - RESTful API 엔드포인트
 * - loader: GET 요청 처리
 * - action: POST 요청 처리
 *
 * [신입 개발자를 위한 설명]
 * Resource Route는 API 엔드포인트를 만들 때 사용합니다.
 * 일반 라우트와 달리 JSX를 반환하지 않고 JSON을 반환합니다.
 *
 * [URL]
 * - GET /api/posts - 게시글 목록 조회
 * - POST /api/posts - 게시글 생성
 */

/**
 * [GET 요청 처리]
 * 게시글 목록 조회
 */
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");

  /**
   * [실제 프로젝트에서는]
   * 데이터베이스에서 페이지네이션된 데이터를 가져옵니다.
   * 예: const posts = await db.posts.findMany({ skip: (page - 1) * limit, take: limit });
   */
  const mockPosts = [
    {
      id: "1",
      title: "Remix v2 시작하기",
      content: "Remix v2의 주요 기능을 알아봅니다.",
      author: "홍길동",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Vite 활용법",
      content: "Vite로 개발 경험을 향상시키세요.",
      author: "김철수",
      createdAt: new Date().toISOString(),
    },
  ];

  return json({
    posts: mockPosts,
    pagination: {
      page,
      limit,
      total: mockPosts.length,
      totalPages: Math.ceil(mockPosts.length / limit),
    },
  });
}

/**
 * [POST 요청 처리]
 * 새 게시글 생성
 */
export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  }

  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");

  /**
   * [유효성 검사]
   */
  if (!title || typeof title !== "string") {
    return json(
      { error: "제목은 필수입니다." },
      { status: HTTP_STATUS.BAD_REQUEST }
    );
  }

  if (!content || typeof content !== "string") {
    return json(
      { error: "내용은 필수입니다." },
      { status: HTTP_STATUS.BAD_REQUEST }
    );
  }

  /**
   * [데이터 생성]
   * 실제 프로젝트: await db.posts.create({ data: { title, content } })
   */
  const newPost = {
    id: Math.random().toString(36).substring(2, 9),
    title,
    content,
    author: "현재 사용자", // 실제로는 세션에서 가져옴
    createdAt: new Date().toISOString(),
  };

  return json(
    { post: newPost, message: "게시글이 생성되었습니다." },
    { status: HTTP_STATUS.CREATED }
  );
}

