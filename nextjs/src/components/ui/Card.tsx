/**
 * 컴포넌트명: Card
 * 용도: 재사용 가능한 카드 컴포넌트
 *
 * [Next.js 특징]
 * - Server Component로 동작 가능 (기본)
 * - 컴포지션 패턴을 사용하여 유연한 구조 제공
 * - Tailwind CSS를 사용한 일관된 디자인
 *
 * [신입 개발자를 위한 설명]
 * Card 컴포넌트는 콘텐츠를 시각적으로 그룹화하는 데 사용됩니다.
 * children prop을 통해 어떤 콘텐츠든 내부에 배치할 수 있으며,
 * padding과 hover 효과를 통해 사용자 경험을 개선합니다.
 *
 * @param {Object} props - 카드 속성
 * @param {React.ReactNode} props.children - 카드 내부 콘텐츠
 * @param {string} props.className - 추가 CSS 클래스
 * @param {boolean} props.hoverable - 호버 효과 활성화 여부
 * @returns {JSX.Element} 카드 UI
 */

import { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
}

export function Card({ children, hoverable = false, className = '', ...props }: CardProps) {
  const baseStyles = 'bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden';
  const hoverStyles = hoverable ? 'transition-shadow duration-200 hover:shadow-lg cursor-pointer' : '';

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`} {...props}>
      {children}
    </div>
  );
}

// Card 하위 컴포넌트들
interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`px-6 py-4 border-t border-gray-200 bg-gray-50 ${className}`}>
      {children}
    </div>
  );
}
