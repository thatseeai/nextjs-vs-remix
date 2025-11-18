/**
 * 테스트 파일: Card.test.tsx
 * 용도: Card 컴포넌트 및 하위 컴포넌트 유닛 테스트
 *
 * [테스트 커버리지]
 * - Card 기본 렌더링
 * - CardHeader, CardBody, CardFooter 렌더링
 * - hoverable prop 동작
 * - 커스텀 className 적용
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardBody, CardFooter } from '~/components/ui/Card';

describe('Card 컴포넌트', () => {
  /**
   * [기본 렌더링 테스트]
   */
  it('기본 카드가 정상적으로 렌더링되어야 한다', () => {
    render(
      <Card>
        <div>카드 내용</div>
      </Card>
    );

    expect(screen.getByText('카드 내용')).toBeInTheDocument();
  });

  /**
   * [기본 스타일 테스트]
   */
  it('기본 스타일이 적용되어야 한다', () => {
    const { container } = render(
      <Card>
        <div>Content</div>
      </Card>
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('bg-white');
    expect(card).toHaveClass('rounded-lg');
    expect(card).toHaveClass('shadow-md');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('border-gray-200');
  });

  /**
   * [Hoverable 테스트]
   */
  it('hoverable이 true일 때 호버 스타일이 적용되어야 한다', () => {
    const { container } = render(
      <Card hoverable>
        <div>Hoverable Card</div>
      </Card>
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('transition-shadow');
    expect(card).toHaveClass('duration-200');
    expect(card).toHaveClass('hover:shadow-lg');
    expect(card).toHaveClass('cursor-pointer');
  });

  it('hoverable이 false일 때 호버 스타일이 적용되지 않아야 한다', () => {
    const { container } = render(
      <Card hoverable={false}>
        <div>Normal Card</div>
      </Card>
    );

    const card = container.firstChild as HTMLElement;
    expect(card).not.toHaveClass('hover:shadow-lg');
    expect(card).not.toHaveClass('cursor-pointer');
  });

  /**
   * [커스텀 className 테스트]
   */
  it('커스텀 className이 추가되어야 한다', () => {
    const { container } = render(
      <Card className="custom-card">
        <div>Custom Card</div>
      </Card>
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('custom-card');
    // 기본 스타일도 유지되어야 함
    expect(card).toHaveClass('bg-white');
  });

  /**
   * [HTML 속성 전달 테스트]
   */
  it('HTML 속성들이 카드에 전달되어야 한다', () => {
    const { container } = render(
      <Card data-testid="test-card" role="article">
        <div>Card with Props</div>
      </Card>
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveAttribute('data-testid', 'test-card');
    expect(card).toHaveAttribute('role', 'article');
  });

  /**
   * [성능 테스트]
   */
  it('컴포넌트 렌더링 시간이 100ms 이내여야 한다', () => {
    const startTime = performance.now();

    render(
      <Card>
        <div>Performance Test</div>
      </Card>
    );

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    expect(renderTime).toBeLessThan(100);
  });
});

describe('CardHeader 컴포넌트', () => {
  /**
   * [기본 렌더링 테스트]
   */
  it('헤더가 정상적으로 렌더링되어야 한다', () => {
    render(
      <Card>
        <CardHeader>
          <h2>카드 제목</h2>
        </CardHeader>
      </Card>
    );

    expect(screen.getByText('카드 제목')).toBeInTheDocument();
  });

  /**
   * [스타일 테스트]
   */
  it('헤더 스타일이 적용되어야 한다', () => {
    const { container } = render(
      <CardHeader>
        <h2>Header</h2>
      </CardHeader>
    );

    const header = container.firstChild as HTMLElement;
    expect(header).toHaveClass('px-6');
    expect(header).toHaveClass('py-4');
    expect(header).toHaveClass('border-b');
    expect(header).toHaveClass('border-gray-200');
  });

  /**
   * [커스텀 className 테스트]
   */
  it('커스텀 className이 추가되어야 한다', () => {
    const { container } = render(
      <CardHeader className="custom-header">
        <h2>Custom Header</h2>
      </CardHeader>
    );

    const header = container.firstChild as HTMLElement;
    expect(header).toHaveClass('custom-header');
    expect(header).toHaveClass('px-6');
  });
});

describe('CardBody 컴포넌트', () => {
  /**
   * [기본 렌더링 테스트]
   */
  it('바디가 정상적으로 렌더링되어야 한다', () => {
    render(
      <Card>
        <CardBody>
          <p>카드 본문</p>
        </CardBody>
      </Card>
    );

    expect(screen.getByText('카드 본문')).toBeInTheDocument();
  });

  /**
   * [스타일 테스트]
   */
  it('바디 스타일이 적용되어야 한다', () => {
    const { container } = render(
      <CardBody>
        <p>Body Content</p>
      </CardBody>
    );

    const body = container.firstChild as HTMLElement;
    expect(body).toHaveClass('px-6');
    expect(body).toHaveClass('py-4');
  });

  /**
   * [커스텀 className 테스트]
   */
  it('커스텀 className이 추가되어야 한다', () => {
    const { container } = render(
      <CardBody className="custom-body">
        <p>Custom Body</p>
      </CardBody>
    );

    const body = container.firstChild as HTMLElement;
    expect(body).toHaveClass('custom-body');
    expect(body).toHaveClass('px-6');
  });
});

describe('CardFooter 컴포넌트', () => {
  /**
   * [기본 렌더링 테스트]
   */
  it('푸터가 정상적으로 렌더링되어야 한다', () => {
    render(
      <Card>
        <CardFooter>
          <button>확인</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByRole('button', { name: /확인/i })).toBeInTheDocument();
  });

  /**
   * [스타일 테스트]
   */
  it('푸터 스타일이 적용되어야 한다', () => {
    const { container } = render(
      <CardFooter>
        <button>Footer Button</button>
      </CardFooter>
    );

    const footer = container.firstChild as HTMLElement;
    expect(footer).toHaveClass('px-6');
    expect(footer).toHaveClass('py-4');
    expect(footer).toHaveClass('border-t');
    expect(footer).toHaveClass('border-gray-200');
    expect(footer).toHaveClass('bg-gray-50');
  });

  /**
   * [커스텀 className 테스트]
   */
  it('커스텀 className이 추가되어야 한다', () => {
    const { container } = render(
      <CardFooter className="custom-footer">
        <button>Custom Footer</button>
      </CardFooter>
    );

    const footer = container.firstChild as HTMLElement;
    expect(footer).toHaveClass('custom-footer');
    expect(footer).toHaveClass('px-6');
  });
});

describe('Card 컴포지션 테스트', () => {
  /**
   * [전체 구조 테스트]
   * Header, Body, Footer를 모두 사용한 완전한 카드
   */
  it('전체 카드 구조가 올바르게 렌더링되어야 한다', () => {
    render(
      <Card hoverable>
        <CardHeader>
          <h2>제목</h2>
        </CardHeader>
        <CardBody>
          <p>본문 내용</p>
        </CardBody>
        <CardFooter>
          <button>액션</button>
        </CardFooter>
      </Card>
    );

    // 모든 요소가 렌더링되었는지 확인
    expect(screen.getByText('제목')).toBeInTheDocument();
    expect(screen.getByText('본문 내용')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /액션/i })).toBeInTheDocument();
  });

  /**
   * [부분 구조 테스트]
   * 필요한 부분만 사용할 수 있는지 확인
   */
  it('Header 없이 Body만 사용할 수 있어야 한다', () => {
    render(
      <Card>
        <CardBody>
          <p>본문만 있는 카드</p>
        </CardBody>
      </Card>
    );

    expect(screen.getByText('본문만 있는 카드')).toBeInTheDocument();
  });

  it('Footer 없이 Header와 Body만 사용할 수 있어야 한다', () => {
    render(
      <Card>
        <CardHeader>
          <h3>헤더</h3>
        </CardHeader>
        <CardBody>
          <p>바디</p>
        </CardBody>
      </Card>
    );

    expect(screen.getByText('헤더')).toBeInTheDocument();
    expect(screen.getByText('바디')).toBeInTheDocument();
  });

  /**
   * [성능 테스트 - 복잡한 구조]
   */
  it('복잡한 카드 구조의 렌더링 시간이 150ms 이내여야 한다', () => {
    const startTime = performance.now();

    render(
      <Card hoverable className="custom">
        <CardHeader className="custom-header">
          <h2>Complex Card</h2>
        </CardHeader>
        <CardBody className="custom-body">
          <p>This is a complex card with multiple sections</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </CardBody>
        <CardFooter className="custom-footer">
          <button>Action 1</button>
          <button>Action 2</button>
        </CardFooter>
      </Card>
    );

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    expect(renderTime).toBeLessThan(150);
  });
});
