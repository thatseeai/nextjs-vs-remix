/**
 * API 라우트: /api/upload
 * 용도: 파일 업로드
 *
 * [Next.js 특징]
 * - FormData를 사용한 파일 업로드 처리
 * - 파일 크기 및 타입 검증
 * - 보안 강화 (파일 확장자, MIME 타입 체크)
 *
 * [신입 개발자를 위한 설명]
 * 파일 업로드 API는 클라이언트로부터 파일을 받아 서버에 저장합니다.
 * 보안을 위해 파일 크기, 타입, 확장자를 검증하며,
 * 실제 프로젝트에서는 AWS S3, Cloudinary 등의 클라우드 스토리지를 사용합니다.
 */

import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { getAuthUser } from '@/lib/auth';
import { HTTP_STATUS, FILE_UPLOAD } from '@/lib/constants';

/**
 * POST /api/upload
 * 파일 업로드 (인증 필요)
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

    // FormData 파싱
    const formData = await request.formData();
    const file = formData.get('file') as File;

    // 파일 존재 확인
    if (!file) {
      return NextResponse.json(
        { error: '파일을 선택해주세요.' },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    // 파일 크기 검증 (5MB)
    if (file.size > FILE_UPLOAD.MAX_SIZE) {
      return NextResponse.json(
        { error: '파일 크기는 5MB를 초과할 수 없습니다.' },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    // 파일 타입 검증
    if (!FILE_UPLOAD.ALLOWED_TYPES.includes(file.type as any)) {
      return NextResponse.json(
        { error: '지원하지 않는 파일 형식입니다. (JPG, PNG, GIF, WEBP만 가능)' },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    // 파일 확장자 추출
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !FILE_UPLOAD.ALLOWED_EXTENSIONS.includes(`.${fileExtension}` as any)) {
      return NextResponse.json(
        { error: '유효하지 않은 파일 확장자입니다.' },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    // 파일 저장 경로 생성
    const uploadDir = join(process.cwd(), 'public', 'uploads');

    // 업로드 디렉토리가 없으면 생성
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // 디렉토리가 이미 존재하는 경우 무시
    }

    // 고유한 파일명 생성 (타임스탬프 + 랜덤 문자열)
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const newFileName = `${timestamp}-${randomString}.${fileExtension}`;
    const filePath = join(uploadDir, newFileName);

    // 파일을 Buffer로 변환하여 저장
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // 파일 URL 생성
    const fileUrl = `/uploads/${newFileName}`;

    return NextResponse.json(
      {
        data: {
          url: fileUrl,
          fileName: file.name,
          size: file.size,
          type: file.type,
        },
        message: '파일이 업로드되었습니다.',
      },
      { status: HTTP_STATUS.CREATED }
    );
  } catch (error) {
    console.error('POST /api/upload error:', error);
    return NextResponse.json(
      { error: '파일 업로드 중 오류가 발생했습니다.' },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}

/**
 * 설정: 파일 업로드 크기 제한
 * Next.js 16에서는 App Router에서 config export가 지원되지 않음
 */
// export const config = {
//   api: {
//     bodyParser: false, // FormData 사용 시 필요
//   },
// };
