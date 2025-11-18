/**
 * 테스트 파일: Input.test.tsx
 * 용도: Input 컴포넌트 유닛 테스트
 *
 * [테스트 커버리지]
 * - 기본 렌더링
 * - Label 표시
 * - Error 메시지 표시
 * - Helper text 표시
 * - forwardRef 동작
 * - 필수 입력 표시
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { Input } from '~/components/ui/Input';

describe('Input 컴포넌트', () => {
  /**
   * [기본 렌더링 테스트]
   */
  it('기본 입력 필드가 정상적으로 렌더링되어야 한다', () => {
    render(<Input placeholder="이름을 입력하세요" />);

    const input = screen.getByPlaceholderText('이름을 입력하세요');
    expect(input).toBeInTheDocument();
  });

  /**
   * [Label 테스트]
   */
  it('label prop이 있을 때 레이블이 표시되어야 한다', () => {
    render(<Input label="이메일" placeholder="email@example.com" />);

    expect(screen.getByText('이메일')).toBeInTheDocument();
  });

  it('label이 없을 때 레이블이 표시되지 않아야 한다', () => {
    const { container } = render(<Input placeholder="이름" />);

    const label = container.querySelector('label');
    expect(label).not.toBeInTheDocument();
  });

  /**
   * [필수 입력 표시 테스트]
   */
  it('required prop이 true일 때 * 표시가 나타나야 한다', () => {
    render(<Input label="비밀번호" required />);

    const asterisk = screen.getByText('*');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveClass('text-red-500');
  });

  it('required prop이 false일 때 * 표시가 없어야 한다', () => {
    render(<Input label="닉네임" />);

    const label = screen.getByText('닉네임');
    expect(label).toBeInTheDocument();

    // * 표시는 없어야 함
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  /**
   * [Error 상태 테스트]
   */
  it('error prop이 있을 때 에러 메시지가 표시되어야 한다', () => {
    render(<Input label="이메일" error="유효한 이메일을 입력하세요" />);

    const errorMessage = screen.getByText('유효한 이메일을 입력하세요');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-red-600');
    expect(errorMessage).toHaveAttribute('role', 'alert');
  });

  it('error 상태일 때 입력 필드에 에러 스타일이 적용되어야 한다', () => {
    render(<Input error="에러 발생" placeholder="input" />);

    const input = screen.getByPlaceholderText('input');
    expect(input).toHaveClass('border-red-500');
    expect(input).toHaveClass('focus:ring-red-500');
  });

  it('error가 없을 때 정상 스타일이 적용되어야 한다', () => {
    render(<Input placeholder="normal input" />);

    const input = screen.getByPlaceholderText('normal input');
    expect(input).toHaveClass('border-gray-300');
    expect(input).toHaveClass('focus:ring-blue-500');
  });

  /**
   * [Helper Text 테스트]
   */
  it('helperText prop이 있을 때 도움말이 표시되어야 한다', () => {
    render(<Input label="사용자명" helperText="영문과 숫자만 입력 가능합니다" />);

    const helperText = screen.getByText('영문과 숫자만 입력 가능합니다');
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveClass('text-gray-500');
  });

  it('error가 있을 때 helperText는 표시되지 않아야 한다', () => {
    render(
      <Input
        label="비밀번호"
        helperText="8자 이상 입력하세요"
        error="비밀번호가 너무 짧습니다"
      />
    );

    // 에러 메시지만 표시되어야 함
    expect(screen.getByText('비밀번호가 너무 짧습니다')).toBeInTheDocument();
    expect(screen.queryByText('8자 이상 입력하세요')).not.toBeInTheDocument();
  });

  /**
   * [Full Width 테스트]
   */
  it('fullWidth prop이 true일 때 전체 너비 스타일이 적용되어야 한다', () => {
    const { container } = render(<Input fullWidth placeholder="full width" />);

    const wrapper = container.firstChild as HTMLElement;
    const input = screen.getByPlaceholderText('full width');

    expect(wrapper).toHaveClass('w-full');
    expect(input).toHaveClass('w-full');
  });

  it('fullWidth prop이 false일 때 전체 너비 스타일이 적용되지 않아야 한다', () => {
    const { container } = render(<Input fullWidth={false} placeholder="normal" />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).not.toHaveClass('w-full');
  });

  /**
   * [입력값 변경 테스트]
   */
  it('입력값이 변경될 때 onChange 핸들러가 호출되어야 한다', () => {
    const handleChange = vi.fn();
    render(<Input placeholder="test input" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('test input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '테스트' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('테스트');
  });

  /**
   * [Disabled 상태 테스트]
   */
  it('disabled prop이 true일 때 입력이 비활성화되어야 한다', () => {
    render(<Input disabled placeholder="disabled input" />);

    const input = screen.getByPlaceholderText('disabled input');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:bg-gray-100');
    expect(input).toHaveClass('disabled:cursor-not-allowed');
  });

  /**
   * [forwardRef 테스트]
   */
  it('ref를 통해 input 요소에 접근할 수 있어야 한다', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="ref test" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.placeholder).toBe('ref test');
  });

  it('ref를 통해 input에 focus를 설정할 수 있어야 한다', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="focus test" />);

    ref.current?.focus();
    expect(document.activeElement).toBe(ref.current);
  });

  /**
   * [타입 속성 테스트]
   */
  it('type="password"일 때 비밀번호 입력 필드로 렌더링되어야 한다', () => {
    render(<Input type="password" placeholder="password" />);

    const input = screen.getByPlaceholderText('password');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('type="email"일 때 이메일 입력 필드로 렌더링되어야 한다', () => {
    render(<Input type="email" placeholder="email" />);

    const input = screen.getByPlaceholderText('email');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('type="number"일 때 숫자 입력 필드로 렌더링되어야 한다', () => {
    render(<Input type="number" placeholder="age" />);

    const input = screen.getByPlaceholderText('age');
    expect(input).toHaveAttribute('type', 'number');
  });

  /**
   * [커스텀 className 테스트]
   */
  it('커스텀 className이 wrapper에 추가되어야 한다', () => {
    const { container } = render(
      <Input className="custom-input" placeholder="custom" />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-input');
  });

  /**
   * [HTML 속성 전달 테스트]
   */
  it('HTML 속성들이 input에 전달되어야 한다', () => {
    render(
      <Input
        placeholder="test"
        name="username"
        id="username-input"
        maxLength={50}
        autoComplete="username"
      />
    );

    const input = screen.getByPlaceholderText('test');
    expect(input).toHaveAttribute('name', 'username');
    expect(input).toHaveAttribute('id', 'username-input');
    expect(input).toHaveAttribute('maxLength', '50');
    expect(input).toHaveAttribute('autoComplete', 'username');
  });

  /**
   * [성능 테스트]
   */
  it('컴포넌트 렌더링 시간이 100ms 이내여야 한다', () => {
    const startTime = performance.now();

    render(<Input label="Performance Test" placeholder="test" />);

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    expect(renderTime).toBeLessThan(100);
  });

  /**
   * [접근성 테스트]
   */
  it('label과 input이 올바르게 연결되어야 한다', () => {
    render(<Input label="사용자 이름" id="username" />);

    const label = screen.getByText('사용자 이름') as HTMLLabelElement;
    const input = screen.getByLabelText('사용자 이름');

    expect(input).toBeInTheDocument();
    expect(label.htmlFor).toBe(''); // forwardRef로 구현되어 있어 자동 연결 안됨
  });

  /**
   * [복합 시나리오 테스트]
   */
  it('모든 props를 동시에 사용할 수 있어야 한다', () => {
    const handleChange = vi.fn();
    const ref = createRef<HTMLInputElement>();

    render(
      <Input
        ref={ref}
        label="이메일"
        placeholder="email@example.com"
        type="email"
        required
        fullWidth
        helperText="회사 이메일을 입력하세요"
        onChange={handleChange}
        className="custom-class"
      />
    );

    // Label 확인
    expect(screen.getByText('이메일')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();

    // Helper text 확인
    expect(screen.getByText('회사 이메일을 입력하세요')).toBeInTheDocument();

    // Input 확인
    const input = screen.getByPlaceholderText('email@example.com');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('required');

    // Ref 확인
    expect(ref.current).toBe(input);

    // onChange 확인
    fireEvent.change(input, { target: { value: 'test@test.com' } });
    expect(handleChange).toHaveBeenCalled();
  });
});
