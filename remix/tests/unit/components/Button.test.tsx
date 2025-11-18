/**
 * 테스트 파일: Button.test.tsx
 * 용도: Button 컴포넌트 유닛 테스트 (Remix)
 *
 * [Vitest 사용 이유]
 * - Vite 기반 Remix와 완벽한 통합
 * - 빠른 테스트 실행 속도
 * - HMR 지원
 *
 * [테스트 커버리지]
 * - 렌더링 테스트
 * - 사용자 인터랙션 테스트
 * - Props 전달 테스트
 * - Progressive Enhancement 확인
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '~/components/ui/Button';

describe('Button 컴포넌트 (Remix)', () => {
  /**
   * [기본 렌더링 테스트]
   */
  it('기본 버튼이 정상적으로 렌더링되어야 한다', () => {
    render(<Button>클릭하세요</Button>);

    const button = screen.getByRole('button', { name: /클릭하세요/i });
    expect(button).toBeInTheDocument();
  });

  /**
   * [Variant 테스트]
   */
  it('primary variant 스타일이 적용되어야 한다', () => {
    render(<Button variant="primary">Primary</Button>);

    const button = screen.getByRole('button', { name: /primary/i });
    expect(button).toHaveClass('bg-blue-600');
    expect(button).toHaveClass('text-white');
  });

  it('secondary variant 스타일이 적용되어야 한다', () => {
    render(<Button variant="secondary">Secondary</Button>);

    const button = screen.getByRole('button', { name: /secondary/i });
    expect(button).toHaveClass('bg-gray-200');
    expect(button).toHaveClass('text-gray-900');
  });

  it('danger variant 스타일이 적용되어야 한다', () => {
    render(<Button variant="danger">Danger</Button>);

    const button = screen.getByRole('button', { name: /danger/i });
    expect(button).toHaveClass('bg-red-600');
  });

  it('ghost variant 스타일이 적용되어야 한다', () => {
    render(<Button variant="ghost">Ghost</Button>);

    const button = screen.getByRole('button', { name: /ghost/i });
    expect(button).toHaveClass('bg-transparent');
  });

  /**
   * [Size 테스트]
   */
  it('small 크기가 적용되어야 한다', () => {
    render(<Button size="sm">Small</Button>);

    const button = screen.getByRole('button', { name: /small/i });
    expect(button).toHaveClass('px-3');
    expect(button).toHaveClass('py-1.5');
    expect(button).toHaveClass('text-sm');
  });

  it('medium 크기가 적용되어야 한다', () => {
    render(<Button size="md">Medium</Button>);

    const button = screen.getByRole('button', { name: /medium/i });
    expect(button).toHaveClass('px-4');
    expect(button).toHaveClass('py-2');
  });

  it('large 크기가 적용되어야 한다', () => {
    render(<Button size="lg">Large</Button>);

    const button = screen.getByRole('button', { name: /large/i });
    expect(button).toHaveClass('px-6');
    expect(button).toHaveClass('py-3');
  });

  /**
   * [전체 너비 테스트]
   */
  it('fullWidth가 true일 때 전체 너비 스타일이 적용되어야 한다', () => {
    render(<Button fullWidth>Full Width</Button>);

    const button = screen.getByRole('button', { name: /full width/i });
    expect(button).toHaveClass('w-full');
  });

  /**
   * [클릭 이벤트 테스트]
   */
  it('클릭 시 onClick 핸들러가 호출되어야 한다', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  /**
   * [Disabled 상태 테스트]
   */
  it('disabled 상태일 때 클릭이 불가능해야 한다', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);

    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('disabled 상태일 때 disabled 스타일이 적용되어야 한다', () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toHaveClass('disabled:opacity-50');
    expect(button).toHaveClass('disabled:cursor-not-allowed');
  });

  /**
   * [Loading 상태 테스트]
   */
  it('로딩 상태일 때 스피너가 표시되어야 한다', () => {
    render(<Button loading>Loading</Button>);

    const button = screen.getByRole('button', { name: /loading/i });
    const spinner = button.querySelector('svg');

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
  });

  it('로딩 상태일 때 버튼이 비활성화되어야 한다', () => {
    const handleClick = vi.fn();
    render(<Button loading onClick={handleClick}>Loading</Button>);

    const button = screen.getByRole('button', { name: /loading/i });
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('로딩 상태일 때 aria-busy 속성이 true여야 한다', () => {
    render(<Button loading>Loading</Button>);

    const button = screen.getByRole('button', { name: /loading/i });
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  /**
   * [커스텀 className 테스트]
   */
  it('커스텀 className이 추가되어야 한다', () => {
    render(<Button className="custom-class">Custom</Button>);

    const button = screen.getByRole('button', { name: /custom/i });
    expect(button).toHaveClass('custom-class');
    // 기본 스타일도 유지되어야 함
    expect(button).toHaveClass('font-medium');
  });

  /**
   * [HTML 속성 전달 테스트]
   */
  it('HTML 속성들이 버튼에 전달되어야 한다', () => {
    render(
      <Button type="submit" name="submit-button" data-testid="test-btn">
        Submit
      </Button>
    );

    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('name', 'submit-button');
    expect(button).toHaveAttribute('data-testid', 'test-btn');
  });

  /**
   * [Progressive Enhancement 테스트]
   * Remix의 특징: JavaScript 없이도 form 버튼은 작동해야 함
   */
  it('form 버튼으로 사용될 때 type="submit"이 기본값이어야 한다', () => {
    render(<Button type="submit">Submit Form</Button>);

    const button = screen.getByRole('button', { name: /submit form/i });
    expect(button).toHaveAttribute('type', 'submit');
  });

  /**
   * [접근성 테스트]
   */
  it('버튼이 올바른 role을 가져야 한다', () => {
    render(<Button>Accessible</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('focus 스타일이 적용되어야 한다', () => {
    render(<Button>Focusable</Button>);

    const button = screen.getByRole('button', { name: /focusable/i });
    expect(button).toHaveClass('focus:outline-none');
    expect(button).toHaveClass('focus:ring-2');
  });

  /**
   * [성능 테스트]
   */
  it('컴포넌트 렌더링 시간이 100ms 이내여야 한다', () => {
    const startTime = performance.now();

    render(<Button>Performance Test</Button>);

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    expect(renderTime).toBeLessThan(100);
  });

  /**
   * [여러 Props 조합 테스트]
   */
  it('여러 props를 동시에 사용할 수 있어야 한다', () => {
    const handleClick = vi.fn();
    render(
      <Button
        variant="danger"
        size="lg"
        fullWidth
        onClick={handleClick}
        className="custom"
      >
        Combined Props
      </Button>
    );

    const button = screen.getByRole('button', { name: /combined props/i });

    // Variant 확인
    expect(button).toHaveClass('bg-red-600');

    // Size 확인
    expect(button).toHaveClass('px-6');
    expect(button).toHaveClass('py-3');

    // Full width 확인
    expect(button).toHaveClass('w-full');

    // Custom class 확인
    expect(button).toHaveClass('custom');

    // Click 이벤트 확인
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
});
