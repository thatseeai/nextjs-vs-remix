import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";
import { HTTP_STATUS } from "~/lib/constants";

/**
 * 파일명: api.posts.$id.tsx
 * 용도: 특정 게시글 API Resource Route
 *
 * [URL]
 * - GET /api/posts/:id - 게시글 조회
 * - PUT /api/posts/:id - 게시글 수정
 * - DELETE /api/posts/:id - 게시글 삭제
 */

/**
 * [GET 요청 처리]
 * 특정 게시글 조회
 */
export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id) {
    return Response.json(
      { error: "게시글 ID가 필요합니다." },
      { status: HTTP_STATUS.BAD_REQUEST }
    );
  }

  /**
   * [데이터 조회]
   * 실제: const post = await db.posts.findUnique({ where: { id } });
   */
  const mockPost = {
    id,
    title: `게시글 ${id}`,
    content: "게시글 내용입니다.",
    author: "홍길동",
    createdAt: new Date().toISOString(),
  };

  return { post: mockPost };
}

/**
 * [PUT/DELETE 요청 처리]
 */
export async function action({ request, params }: ActionFunctionArgs) {
  const { id } = params;

  if (!id) {
    return Response.json(
      { error: "게시글 ID가 필요합니다." },
      { status: HTTP_STATUS.BAD_REQUEST }
    );
  }

  /**
   * [PUT: 게시글 수정]
   */
  if (request.method === "PUT") {
    const formData = await request.formData();
    const title = formData.get("title");
    const content = formData.get("content");

    /**
     * [실제 프로젝트]
     * await db.posts.update({ where: { id }, data: { title, content } })
     */
    const updatedPost = {
      id,
      title: title || "수정된 제목",
      content: content || "수정된 내용",
      updatedAt: new Date().toISOString(),
    };

    return {
      post: updatedPost,
      message: "게시글이 수정되었습니다.",
    };
  }

  /**
   * [DELETE: 게시글 삭제]
   */
  if (request.method === "DELETE") {
    /**
     * [실제 프로젝트]
     * await db.posts.delete({ where: { id } })
     */
    return {
      message: "게시글이 삭제되었습니다.",
    };
  }

  return Response.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
