import type { InputHTMLAttributes, ReactNode } from "react";

/**
 * 컴포넌트명: Input
 * 용도: 재사용 가능한 입력 필드 컴포넌트
 *
 * [Remix v2 특징]
 * - Progressive Enhancement: form 제출 시 JavaScript 없이도 동작
 * - name 속성을 통해 FormData에 자동 포함
 * - 서버 액션과 자연스럽게 연동
 *
 * [신입 개발자를 위한 설명]
 * Input 컴포넌트는 사용자로부터 데이터를 입력받는 폼 필드입니다.
 * label, error, helper 텍스트를 포함하여 완전한 폼 필드를 구성합니다.
 *
 * 사용 예시:
 * <Input
 *   name="email"
 *   label="이메일"
 *   type="email"
 *   required
 *   error="유효한 이메일을 입력하세요"
 *   helper="example@domain.com 형식으로 입력"
 * />
 *
 * [접근성]
 * - label과 input이 htmlFor/id로 연결됨
 * - error 메시지는 aria-describedby로 연결
 * - required 필드는 aria-required 속성 포함
 *
 * @param {InputProps} props - 입력 필드 속성
 * @returns {JSX.Element} 입력 필드 UI
 */

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 입력 필드 레이블 */
  label?: string;
  /** 에러 메시지 */
  error?: string;
  /** 도움말 텍스트 */
  helper?: string;
  /** 왼쪽 아이콘/요소 */
  leftIcon?: ReactNode;
  /** 오른쪽 아이콘/요소 */
  rightIcon?: ReactNode;
}

export function Input({
  label,
  error,
  helper,
  leftIcon,
  rightIcon,
  className = "",
  id,
  name,
  required,
  disabled,
  ...props
}: InputProps) {
  /**
   * [ID 자동 생성]
   * id가 제공되지 않으면 name을 기반으로 자동 생성합니다.
   * 이는 label의 htmlFor와 input의 id를 연결하기 위함입니다.
   */
  const inputId = id || `input-${name}`;
  const errorId = error ? `${inputId}-error` : undefined;
  const helperId = helper ? `${inputId}-helper` : undefined;

  /**
   * [스타일 설정]
   * - baseStyles: 기본 입력 필드 스타일
   * - errorStyles: 에러 상태일 때 적용되는 스타일
   * - disabledStyles: 비활성화 상태 스타일
   */
  const baseStyles =
    "w-full px-4 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2";

  const normalStyles =
    "border-gray-300 focus:border-blue-500 focus:ring-blue-200";
  const errorStyles =
    "border-red-500 focus:border-red-500 focus:ring-red-200 bg-red-50";
  const disabledStyles = "bg-gray-100 cursor-not-allowed opacity-60";

  const inputStyles = error
    ? errorStyles
    : disabled
      ? disabledStyles
      : normalStyles;

  /**
   * [아이콘 처리]
   * 왼쪽/오른쪽 아이콘이 있을 경우 패딩을 조정합니다.
   */
  const paddingWithIcons = leftIcon
    ? "pl-10"
    : rightIcon
      ? "pr-10"
      : "";

  return (
    <div className="w-full">
      {/* 레이블 */}
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* 입력 필드 컨테이너 */}
      <div className="relative">
        {/* 왼쪽 아이콘 */}
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}

        {/* 입력 필드 */}
        <input
          id={inputId}
          name={name}
          className={`${baseStyles} ${inputStyles} ${paddingWithIcons} ${className}`}
          aria-invalid={!!error}
          aria-describedby={
            errorId || helperId ? `${errorId || ""} ${helperId || ""}` : undefined
          }
          aria-required={required}
          disabled={disabled}
          {...props}
        />

        {/* 오른쪽 아이콘 */}
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>

      {/* 에러 메시지 */}
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {/* 도움말 텍스트 */}
      {helper && !error && (
        <p id={helperId} className="mt-1 text-sm text-gray-500">
          {helper}
        </p>
      )}
    </div>
  );
}
