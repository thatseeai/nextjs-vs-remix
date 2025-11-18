/**
 * API 라우트: /api/posts
 * 용도: 게시글 목록 조회 및 생성
 *
 * [Next.js 특징]
 * - App Router의 Route Handlers
 * - GET, POST 등 HTTP 메서드별 export 함수
 * - Request, Response 표준 Web API 사용
 *
 * [신입 개발자를 위한 설명]
 * API 라우트는 서버리스 함수로 동작하는 백엔드 엔드포인트입니다.
 * route.ts 파일에서 GET, POST 등의 함수를 export하면
 * 해당 HTTP 메서드로 요청 시 자동으로 실행됩니다.
 * 실제 프로젝트에서는 데이터베이스와 연동하여 사용합니다.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { HTTP_STATUS } from '@/lib/constants';

// 임시 데이터베이스 (실제로는 Prisma, MongoDB 등 사용)
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
 * GET /api/posts
 * 게시글 목록 조회
 */
export async function GET(request: NextRequest) {
  try {
    // 쿼리 파라미터 추출
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // 페이지네이션
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    return NextResponse.json(
      {
        data: paginatedPosts,
        pagination: {
          page,
          limit,
          total: posts.length,
          totalPages: Math.ceil(posts.length / limit),
        },
      },
      { status: HTTP_STATUS.OK }
    );
  } catch (error) {
    console.error('GET /api/posts error:', error);
    return NextResponse.json(
      { error: '게시글을 불러오는데 실패했습니다.' },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}

/**
 * POST /api/posts
 * 새 게시글 생성 (인증 필요)
 */
export async function POST(request: NextRequest) {
  try {
    // 인증 확인
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: HTTP_STATUS.UNAUTHORIZED }
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

    // 새 게시글 생성
    const newPost = {
      id: posts.length + 1,
      title,
      body: content,
      userId: parseInt(user.userId),
      createdAt: new Date().toISOString(),
    };

    posts.push(newPost);

    return NextResponse.json(
      { data: newPost, message: '게시글이 생성되었습니다.' },
      { status: HTTP_STATUS.CREATED }
    );
  } catch (error) {
    console.error('POST /api/posts error:', error);
    return NextResponse.json(
      { error: '게시글 생성에 실패했습니다.' },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
