/**
 * 컴포넌트명: Input
 * 용도: 재사용 가능한 입력 필드 컴포넌트
 *
 * [Next.js 특징]
 * - Client Component로 구현하여 실시간 검증 지원
 * - forwardRef를 사용하여 외부에서 ref 접근 가능
 * - 폼 라이브러리(react-hook-form 등)와 호환
 *
 * [신입 개발자를 위한 설명]
 * Input 컴포넌트는 사용자로부터 텍스트 입력을 받습니다.
 * label, error, helperText를 통해 접근성을 향상시키며,
 * forwardRef를 사용하여 폼 라이브러리와 원활하게 통합됩니다.
 *
 * @param {Object} props - 입력 필드 속성
 * @param {string} props.label - 레이블 텍스트
 * @param {string} props.error - 에러 메시지
 * @param {string} props.helperText - 도움말 텍스트
 * @returns {JSX.Element} 입력 필드 UI
 */

'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, fullWidth = false, className = '', ...props }, ref) => {
    // 에러 상태에 따른 스타일
    const inputStyles = error
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500';

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <div className={`${widthStyle} ${className}`}>
        {/* 레이블 */}
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* 입력 필드 */}
        <input
          ref={ref}
          className={`
            ${widthStyle}
            px-4 py-2
            text-gray-900
            rounded-lg
            border
            ${inputStyles}
            focus:ring-2
            focus:outline-none
            transition-colors
            duration-200
            disabled:bg-gray-100
            disabled:cursor-not-allowed
          `}
          {...props}
        />

        {/* 에러 메시지 */}
        {error && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {/* 도움말 텍스트 */}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
