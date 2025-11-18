/**
 * 컴포넌트명: Button
 * 용도: 재사용 가능한 버튼 컴포넌트
 *
 * [Next.js 특징]
 * - Client Component로 구현하여 인터랙션 지원
 * - Tailwind CSS를 사용한 스타일링
 * - TypeScript로 타입 안정성 확보
 *
 * [신입 개발자를 위한 설명]
 * 이 컴포넌트는 애플리케이션 전체에서 일관된 버튼 스타일을 제공합니다.
 * variant prop을 통해 다양한 스타일(primary, secondary, danger)을 지원하며,
 * 모든 HTML button 속성을 그대로 전달받을 수 있습니다.
 *
 * @param {Object} props - 버튼 속성
 * @param {React.ReactNode} props.children - 버튼 내부 콘텐츠
 * @param {string} props.variant - 버튼 스타일 변형 (primary, secondary, danger)
 * @param {string} props.className - 추가 CSS 클래스
 * @returns {JSX.Element} 버튼 UI
 */

'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  // 기본 스타일
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center';

  // 변형별 스타일
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100',
  };

  // 크기별 스타일
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
