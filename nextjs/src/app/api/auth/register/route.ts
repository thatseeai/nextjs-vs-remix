/**
 * API 라우트: /api/auth/register
 * 용도: 사용자 회원가입
 *
 * [Next.js 특징]
 * - 비밀번호 해싱 (bcrypt)
 * - 이메일 중복 확인
 * - 자동 로그인 (JWT 토큰 반환)
 *
 * [신입 개발자를 위한 설명]
 * 회원가입 API는 새로운 사용자를 등록합니다.
 * 비밀번호는 bcrypt로 해싱하여 저장하므로 원본을 알 수 없으며,
 * 이메일 중복을 체크하여 고유성을 보장합니다.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createToken, hashPassword } from '@/lib/auth';
import { isValidEmail, isValidPassword } from '@/lib/utils';
import { HTTP_STATUS } from '@/lib/constants';

// 임시 사용자 데이터베이스
const users: any[] = [];

/**
 * POST /api/auth/register
 * 회원가입
 */
export async function POST(request: NextRequest) {
  try {
    // 요청 본문 파싱
    const body = await request.json();
    const { name, email, password } = body;

    // 유효성 검사
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    // 이름 검증
    if (name.length < 2) {
      return NextResponse.json(
        { error: '이름은 최소 2자 이상이어야 합니다.' },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    // 이메일 검증
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식이 아닙니다.' },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    // 비밀번호 검증
    if (!isValidPassword(password)) {
      return NextResponse.json(
        {
          error: '비밀번호는 최소 8자, 대문자, 소문자, 숫자를 포함해야 합니다.',
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    // 이메일 중복 확인
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: '이미 사용 중인 이메일입니다.' },
        { status: HTTP_STATUS.CONFLICT }
      );
    }

    // 비밀번호 해싱
    const hashedPassword = await hashPassword(password);

    // 새 사용자 생성
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    // JWT 토큰 생성
    const token = await createToken({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });

    // 사용자 정보 (비밀번호 제외)
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      {
        data: {
          user: userWithoutPassword,
          token,
        },
        message: '회원가입이 완료되었습니다.',
      },
      { status: HTTP_STATUS.CREATED }
    );
  } catch (error) {
    console.error('POST /api/auth/register error:', error);
    return NextResponse.json(
      { error: '회원가입 처리 중 오류가 발생했습니다.' },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
