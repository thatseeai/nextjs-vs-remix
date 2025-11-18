import type { ReactNode, HTMLAttributes } from "react";

/**
 * 컴포넌트명: Card
 * 용도: 콘텐츠를 담는 카드 컨테이너 컴포넌트
 *
 * [Remix v2 특징]
 * - 재사용 가능한 레이아웃 컴포넌트
 * - Tailwind CSS를 활용한 반응형 디자인
 * - TypeScript를 통한 타입 안정성
 *
 * [신입 개발자를 위한 설명]
 * Card 컴포넌트는 콘텐츠를 시각적으로 그룹화하는 컨테이너입니다.
 * 그림자와 둥근 모서리로 콘텐츠를 돋보이게 하며,
 * 일관된 간격과 패딩을 제공합니다.
 *
 * 사용 예시:
 * <Card>
 *   <Card.Header>제목</Card.Header>
 *   <Card.Body>내용</Card.Body>
 *   <Card.Footer>푸터</Card.Footer>
 * </Card>
 *
 * [디자인 패턴]
 * Compound Component Pattern을 사용하여
 * Card.Header, Card.Body, Card.Footer를 제공합니다.
 *
 * @param {CardProps} props - 카드 속성
 * @returns {JSX.Element} 카드 UI
 */

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** 카드 내용 */
  children: ReactNode;
  /** 호버 효과 적용 여부 */
  hoverable?: boolean;
  /** 패딩 크기 */
  padding?: "none" | "sm" | "md" | "lg";
}

/**
 * [성능 최적화]
 * - 컴포넌트 분리로 재사용성 증대
 * - CSS 클래스 조합으로 다양한 스타일 지원
 * - memo 사용 고려 (필요시)
 */
export function Card({
  children,
  hoverable = false,
  padding = "md",
  className = "",
  ...props
}: CardProps) {
  const baseStyles =
    "bg-white rounded-lg shadow-md border border-gray-200 transition-shadow duration-200";
  const hoverStyles = hoverable ? "hover:shadow-lg cursor-pointer" : "";

  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * CardHeader 컴포넌트
 *
 * [용도]
 * 카드의 제목이나 헤더 영역을 표시합니다.
 */
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

Card.Header = function CardHeader({
  children,
  className = "",
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={`border-b border-gray-200 pb-4 mb-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * CardBody 컴포넌트
 *
 * [용도]
 * 카드의 주요 콘텐츠 영역을 표시합니다.
 */
interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

Card.Body = function CardBody({
  children,
  className = "",
  ...props
}: CardBodyProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

/**
 * CardFooter 컴포넌트
 *
 * [용도]
 * 카드의 푸터 영역(버튼, 링크 등)을 표시합니다.
 */
interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

Card.Footer = function CardFooter({
  children,
  className = "",
  ...props
}: CardFooterProps) {
  return (
    <div
      className={`border-t border-gray-200 pt-4 mt-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
