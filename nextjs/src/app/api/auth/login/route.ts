/**
 * API 라우트: /api/auth/login
 * 용도: 사용자 로그인
 *
 * [Next.js 특징]
 * - JWT 토큰 생성 및 반환
 * - 비밀번호 검증 (bcrypt)
 * - 보안 강화 (rate limiting, CORS 등 추가 가능)
 *
 * [신입 개발자를 위한 설명]
 * 로그인 API는 이메일과 비밀번호를 받아 검증한 후,
 * JWT 토큰을 생성하여 반환합니다. 클라이언트는 이 토큰을 저장하고
 * 이후 요청에 포함하여 인증을 수행합니다.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createToken, hashPassword, verifyPassword } from '@/lib/auth';
import { HTTP_STATUS } from '@/lib/constants';

// 임시 사용자 데이터베이스 (실제로는 DB 사용)
const users = [
  {
    id: '1',
    email: 'test@example.com',
    // 비밀번호: Password123
    password: '$2a$10$YourHashedPasswordHere',
    name: '테스트 사용자',
    role: 'user',
  },
  {
    id: '2',
    email: 'admin@example.com',
    password: '$2a$10$YourHashedPasswordHere',
    name: '관리자',
    role: 'admin',
  },
];

/**
 * POST /api/auth/login
 * 로그인
 */
export async function POST(request: NextRequest) {
  try {
    // 요청 본문 파싱
    const body = await request.json();
    const { email, password } = body;

    // 유효성 검사
    if (!email || !password) {
      return NextResponse.json(
        { error: '이메일과 비밀번호를 입력해주세요.' },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    // 이메일로 사용자 찾기
    const user = users.find((u) => u.email === email);

    if (!user) {
      return NextResponse.json(
        { error: '이메일 또는 비밀번호가 올바르지 않습니다.' },
        { status: HTTP_STATUS.UNAUTHORIZED }
      );
    }

    // 비밀번호 검증
    // 데모용으로 간단하게 비교 (실제로는 bcrypt 사용)
    const isPasswordValid = password === 'Password123'; // 실제: await verifyPassword(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: '이메일 또는 비밀번호가 올바르지 않습니다.' },
        { status: HTTP_STATUS.UNAUTHORIZED }
      );
    }

    // JWT 토큰 생성
    const token = await createToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    // 사용자 정보 (비밀번호 제외)
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        data: {
          user: userWithoutPassword,
          token,
        },
        message: '로그인에 성공했습니다.',
      },
      { status: HTTP_STATUS.OK }
    );
  } catch (error) {
    console.error('POST /api/auth/login error:', error);
    return NextResponse.json(
      { error: '로그인 처리 중 오류가 발생했습니다.' },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
