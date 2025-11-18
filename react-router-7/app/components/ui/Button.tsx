import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * 컴포넌트명: Button
 * 용도: 재사용 가능한 버튼 컴포넌트
 *
 * [React Router 7 특징]
 * - Progressive Enhancement: JavaScript 없이도 동작 (form 버튼)
 * - TypeScript를 활용한 타입 안정성
 * - Tailwind CSS를 사용한 스타일링
 *
 * [신입 개발자를 위한 설명]
 * 이 컴포넌트는 애플리케이션 전체에서 일관된 버튼 스타일을 제공합니다.
 * variant prop으로 다양한 스타일을 지원하며, size prop으로 크기를 조절할 수 있습니다.
 *
 * 사용 예시:
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   클릭하세요
 * </Button>
 *
 * @param {ButtonProps} props - 버튼 속성
 * @returns {JSX.Element} 버튼 UI
 */

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼의 시각적 스타일 */
  variant?: "primary" | "secondary" | "danger" | "ghost";
  /** 버튼의 크기 */
  size?: "sm" | "md" | "lg";
  /** 버튼 내용 */
  children: ReactNode;
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
  /** 로딩 상태 */
  loading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  fullWidth = false,
  loading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  /**
   * [스타일 설정]
   * - baseStyles: 모든 버튼에 공통으로 적용되는 기본 스타일
   * - variantStyles: variant prop에 따라 달라지는 스타일
   * - sizeStyles: size prop에 따라 달라지는 스타일
   */
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 active:bg-gray-400",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 active:bg-gray-200",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  /**
   * [접근성 고려사항]
   * - disabled 상태일 때 aria-disabled 속성 추가
   * - 로딩 중일 때 aria-busy 속성 추가
   * - 키보드 네비게이션 지원 (focus 스타일)
   */
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && (
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
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
}
