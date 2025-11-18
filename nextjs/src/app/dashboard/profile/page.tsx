/**
 * 페이지명: Profile
 * 용도: 사용자 프로필 페이지
 *
 * [Next.js 특징]
 * - 중첩 라우트: /dashboard/profile
 * - 폼 처리 및 상태 업데이트
 * - Zustand를 사용한 전역 상태 관리
 *
 * [신입 개발자를 위한 설명]
 * 프로필 페이지에서 사용자 정보를 수정할 수 있습니다.
 * 폼 제출 시 API를 호출하여 서버에 데이터를 저장하고,
 * Zustand 스토어도 업데이트하여 UI에 즉시 반영합니다.
 */

'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const { addToast } = useUIStore();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 스토어 업데이트
      updateUser({
        name: formData.name,
        email: formData.email,
      });

      addToast({
        type: 'success',
        message: '프로필이 성공적으로 업데이트되었습니다.',
      });
    } catch (error) {
      addToast({
        type: 'error',
        message: '프로필 업데이트에 실패했습니다.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">프로필 설정</h1>
        <p className="text-gray-600">개인 정보를 관리하고 업데이트하세요.</p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">기본 정보</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 프로필 이미지 */}
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-semibold">
                {formData.name.charAt(0) || 'U'}
              </div>
              <div>
                <Button type="button" variant="outline" size="sm">
                  이미지 변경
                </Button>
                <p className="text-sm text-gray-500 mt-2">
                  JPG, PNG 또는 GIF (최대 5MB)
                </p>
              </div>
            </div>

            {/* 이름 */}
            <Input
              label="이름"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />

            {/* 이메일 */}
            <Input
              label="이메일"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />

            {/* 자기소개 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                자기소개
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="간단한 자기소개를 작성해주세요..."
              />
            </div>

            {/* 버튼 */}
            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline">
                취소
              </Button>
              <Button type="submit" isLoading={isLoading}>
                저장
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {/* 비밀번호 변경 */}
      <Card className="mt-6">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">비밀번호 변경</h2>
        </CardHeader>
        <CardBody>
          <form className="space-y-6">
            <Input
              label="현재 비밀번호"
              name="currentPassword"
              type="password"
              fullWidth
            />
            <Input
              label="새 비밀번호"
              name="newPassword"
              type="password"
              helperText="최소 8자, 대문자, 소문자, 숫자 포함"
              fullWidth
            />
            <Input
              label="새 비밀번호 확인"
              name="confirmPassword"
              type="password"
              fullWidth
            />

            <div className="flex justify-end">
              <Button type="submit">비밀번호 변경</Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {/* 계정 삭제 */}
      <Card className="mt-6 border-red-200">
        <CardHeader>
          <h2 className="text-xl font-semibold text-red-600">위험 구역</h2>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600 mb-4">
            계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다.
          </p>
          <Button variant="danger">계정 삭제</Button>
        </CardBody>
      </Card>
    </div>
  );
}
