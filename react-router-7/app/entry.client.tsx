import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

/**
 * 클라이언트 엔트리 포인트
 *
 * [React Router 7 클라이언트 하이드레이션]
 * - 서버에서 렌더링된 HTML을 React 컴포넌트로 연결
 * - startTransition으로 우선순위가 낮은 업데이트 처리
 *
 * [신입 개발자를 위한 설명]
 * 하이드레이션은 서버에서 렌더링된 HTML에 이벤트 리스너와 상태를 추가하는 과정입니다.
 * 이를 통해 정적 HTML이 인터랙티브한 React 애플리케이션으로 변환됩니다.
 */
startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>
  );
});
