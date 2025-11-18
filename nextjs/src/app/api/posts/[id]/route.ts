/**
 * API 라우트: /api/posts/[id]
 * 용도: 특정 게시글 조회, 수정, 삭제
 *
 * [Next.js 특징]
 * - 동적 API 라우트: [id] 파라미터 사용
 * - GET, PUT, DELETE 메서드 지원
 * - 인증 및 권한 체크
 *
 * [신입 개발자를 위한 설명]
 * 동적 API 라우트는 URL의 일부가 변수인 엔드포인트입니다.
 * /api/posts/1, /api/posts/2 등 모든 요청을 처리하며,
 * params를 통해 id 값을 받아와 사용합니다.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { HTTP_STATUS } from '@/lib/constants';

// 임시 데이터베이스 (실제로는 외부 DB 사용)
// 실제로는 import로 공유하거나 DB에서 조회
let posts = [
  {
    id: 1,
    title: 'Next.js 16 출시',
    body: 'Next.js 16의 새로운 기능들을 소개합니다.',
    userId: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'React 19 업데이트',
    body: 'React 19에서 추가된 기능들을 알아봅니다.',
    userId: 1,
    createdAt: new Date().toISOString(),
  },
];

/**
 * GET /api/posts/[id]
 * 특정 게시글 조회
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id);

    // 게시글 찾기
    const post = posts.find((p) => p.id === postId);

    if (!post) {
      return NextResponse.json(
        { error: '게시글을 찾을 수 없습니다.' },
        { status: HTTP_STATUS.NOT_FOUND }
      );
    }

    return NextResponse.json({ data: post }, { status: HTTP_STATUS.OK });
  } catch (error) {
    console.error('GET /api/posts/[id] error:', error);
    return NextResponse.json(
      { error: '게시글을 불러오는데 실패했습니다.' },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}

/**
 * PUT /api/posts/[id]
 * 게시글 수정 (인증 필요)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 인증 확인
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: HTTP_STATUS.UNAUTHORIZED }
      );
    }

    const { id } = await params;
    const postId = parseInt(id);

    // 게시글 찾기
    const postIndex = posts.findIndex((p) => p.id === postId);

    if (postIndex === -1) {
      return NextResponse.json(
        { error: '게시글을 찾을 수 없습니다.' },
        { status: HTTP_STATUS.NOT_FOUND }
      );
    }

    // 권한 확인 (작성자만 수정 가능)
    if (posts[postIndex].userId !== parseInt(user.userId)) {
      return NextResponse.json(
        { error: '수정 권한이 없습니다.' },
        { status: HTTP_STATUS.FORBIDDEN }
      );
    }

    // 요청 본문 파싱
    const body = await request.json();
    const { title, body: content } = body;

    // 유효성 검사
    if (!title || !content) {
      return NextResponse.json(
        { error: '제목과 내용을 모두 입력해주세요.' },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    // 게시글 업데이트
    posts[postIndex] = {
      ...posts[postIndex],
      title,
      body: content,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { data: posts[postIndex], message: '게시글이 수정되었습니다.' },
      { status: HTTP_STATUS.OK }
    );
  } catch (error) {
    console.error('PUT /api/posts/[id] error:', error);
    return NextResponse.json(
      { error: '게시글 수정에 실패했습니다.' },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}

/**
 * DELETE /api/posts/[id]
 * 게시글 삭제 (인증 필요)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 인증 확인
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: HTTP_STATUS.UNAUTHORIZED }
      );
    }

    const { id } = await params;
    const postId = parseInt(id);

    // 게시글 찾기
    const postIndex = posts.findIndex((p) => p.id === postId);

    if (postIndex === -1) {
      return NextResponse.json(
        { error: '게시글을 찾을 수 없습니다.' },
        { status: HTTP_STATUS.NOT_FOUND }
      );
    }

    // 권한 확인 (작성자만 삭제 가능)
    if (posts[postIndex].userId !== parseInt(user.userId)) {
      return NextResponse.json(
        { error: '삭제 권한이 없습니다.' },
        { status: HTTP_STATUS.FORBIDDEN }
      );
    }

    // 게시글 삭제
    posts.splice(postIndex, 1);

    return NextResponse.json(
      { message: '게시글이 삭제되었습니다.' },
      { status: HTTP_STATUS.OK }
    );
  } catch (error) {
    console.error('DELETE /api/posts/[id] error:', error);
    return NextResponse.json(
      { error: '게시글 삭제에 실패했습니다.' },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
