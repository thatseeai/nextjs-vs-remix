/**
 * 페이지명: Register
 * 용도: 회원가입 페이지
 *
 * [Next.js 특징]
 * - Client Component로 폼 검증 및 제출 처리
 * - 실시간 유효성 검사
 * - 회원가입 성공 시 자동 로그인
 *
 * [신입 개발자를 위한 설명]
 * 회원가입 페이지는 새로운 사용자 계정을 생성합니다.
 * 입력값의 유효성을 실시간으로 검사하여 사용자에게 즉각적인 피드백을 제공하고,
 * 비밀번호 강도 체크, 이메일 중복 확인 등을 수행합니다.
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardBody } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { api } from '@/lib/api';
import { isValidEmail, isValidPassword } from '@/lib/utils';
import { PAGE_ROUTES, API_ROUTES } from '@/lib/constants';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const { addToast } = useUIStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // 실시간 검증
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // 이름 검증
    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    } else if (formData.name.length < 2) {
      newErrors.name = '이름은 최소 2자 이상이어야 합니다.';
    }

    // 이메일 검증
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    // 비밀번호 검증
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = '비밀번호는 최소 8자, 대문자, 소문자, 숫자를 포함해야 합니다.';
    }

    // 비밀번호 확인
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    // 약관 동의
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = '이용약관에 동의해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // 회원가입 API 호출
      const response = await api.post<{ user: any; token: string }>(
        API_ROUTES.AUTH_REGISTER,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      // 자동 로그인
      login(response.user, response.token);

      addToast({
        type: 'success',
        message: '회원가입이 완료되었습니다!',
      });

      // 대시보드로 이동
      router.push(PAGE_ROUTES.DASHBOARD);
    } catch (error: any) {
      addToast({
        type: 'error',
        message: error.message || '회원가입에 실패했습니다.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 비밀번호 강도 계산
  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, text: '', color: '' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const levels = [
      { text: '매우 약함', color: 'bg-red-500' },
      { text: '약함', color: 'bg-orange-500' },
      { text: '보통', color: 'bg-yellow-500' },
      { text: '강함', color: 'bg-green-500' },
      { text: '매우 강함', color: 'bg-blue-500' },
    ];

    return { strength, ...levels[strength] };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">회원가입</h1>
          <p className="text-gray-600">새로운 계정을 만들어보세요</p>
        </div>

        <Card>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 이름 */}
              <Input
                label="이름"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="홍길동"
                required
                fullWidth
                autoFocus
              />

              {/* 이메일 */}
              <Input
                label="이메일"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="example@email.com"
                required
                fullWidth
              />

              {/* 비밀번호 */}
              <div>
                <Input
                  label="비밀번호"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  placeholder="••••••••"
                  helperText="최소 8자, 대문자, 소문자, 숫자 포함"
                  required
                  fullWidth
                />
                {/* 비밀번호 강도 표시 */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{passwordStrength.text}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 비밀번호 확인 */}
              <Input
                label="비밀번호 확인"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="••••••••"
                required
                fullWidth
              />

              {/* 약관 동의 */}
              <div>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="mt-1 mr-2 rounded"
                  />
                  <span className="text-sm text-gray-700">
                    <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                      이용약관
                    </Link>{' '}
                    및{' '}
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                      개인정보 처리방침
                    </Link>
                    에 동의합니다.
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
                )}
              </div>

              {/* 회원가입 버튼 */}
              <Button type="submit" fullWidth isLoading={isLoading}>
                회원가입
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* 로그인 링크 */}
        <p className="text-center text-gray-600 mt-6">
          이미 계정이 있으신가요?{' '}
          <Link href={PAGE_ROUTES.LOGIN} className="text-blue-600 hover:text-blue-700 font-medium">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
