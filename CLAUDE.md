# Next.js vs Remix vs React Router 7 비교 프로젝트 생성 지시서

## 📋 프로젝트 개요

Next.js, Remix, React Router 7 프레임워크의 **정량적 비교**를 위한 동일한 기능을 가진 세 개의 독립적인 웹 애플리케이션을 생성합니다.

### 🔧 버전 요구사항
- **Next.js**: 공식 최신 안정화 버전 (v15.x 이상)
- **Remix**: 공식 최신 안정화 버전 (v2.x 이상, Vite 기반)
- **React Router**: 공식 최신 안정화 버전 (v7.x 이상, Vite 기반)
- **Vite**: 최신 버전 (v5.x 이상) - Remix, React Router 및 개발 도구로 활용
- **Node.js**: 20.x LTS 이상 권장

## 🎯 핵심 목표

- **동일한 기능과 UI**: 세 프레임워크에서 100% 동일한 사용자 경험 제공
- **정량적 비교**: 성능 지표, 번들 크기, 빌드 시간 등 측정 가능한 데이터 포함
- **교육적 가치**: 신입 개발자가 세 프레임워크를 학습할 수 있는 완벽한 예제
- **실무 적용 가능**: 실제 프로덕션 환경에서 사용 가능한 수준의 코드 품질
- **마이그레이션 가이드**: Remix → React Router 7 마이그레이션 경로 제시

## 📁 프로젝트 구조

```
project-root/
├── nextjs/                 # Next.js 애플리케이션
│   ├── src/
│   ├── tests/
│   ├── next.config.js      # Next.js 16 설정
│   ├── package.json
│   └── README.md
├── remix/                  # Remix 애플리케이션 (Vite 기반)
│   ├── app/
│   ├── tests/
│   ├── vite.config.ts      # Vite 설정
│   ├── package.json
│   └── README.md
├── react-router-7/         # React Router 7 애플리케이션 (Vite 기반)
│   ├── app/
│   ├── tests/
│   ├── vite.config.ts      # Vite 설정
│   ├── package.json
│   └── README.md
├── docs/                   # 비교 문서
│   ├── comparison.md       # 상세 비교 분석 (3-way)
│   ├── metrics.md         # 성능 지표
│   ├── decision-guide.md  # 선택 가이드
│   └── remix-to-rr7.md   # Remix → React Router 7 마이그레이션 가이드
├── shared/                # 공통 개발 도구
│   └── vite-analyzer/     # Vite 번들 분석 도구
└── README.md              # 프로젝트 전체 개요
```

## 🔧 필수 구현 기능 (최소 15개)

### 1. **라우팅 시스템** (3가지 비교 요소)
   - 정적 라우팅 (/about, /contact)
   - 동적 라우팅 (/posts/[id] vs /posts/$postId)
   - 중첩 라우팅 (레이아웃 시스템)
   - **측정 지표**: 라우트 전환 시간, 프리페칭 성능

### 2. **데이터 페칭** (3가지 비교 요소)
   - SSR (서버 사이드 렌더링)
   - SSG (정적 사이트 생성)
   - CSR (클라이언트 사이드 렌더링)
   - **측정 지표**: TTFB, FCP, LCP

### 3. **상태 관리** (2가지 비교 요소)
   - 전역 상태 관리 (Context API 또는 Zustand)
   - 폼 상태 관리 및 검증
   - **측정 지표**: 리렌더링 횟수, 상태 업데이트 성능

### 4. **인증 시스템** (2가지 비교 요소)
   - 세션 기반 인증
   - JWT 토큰 관리
   - **측정 지표**: 인증 처리 시간, 세션 유지 메모리 사용량

### 5. **API 라우트** (2가지 비교 요소)
   - REST API 엔드포인트
   - 파일 업로드 처리
   - **측정 지표**: API 응답 시간, 처리량(RPS)

### 6. **스타일링** (2가지 비교 요소)
   - CSS Modules
   - Tailwind CSS 통합
   - **측정 지표**: CSS 번들 크기, 스타일 적용 시간

### 7. **이미지 최적화** (1가지 비교 요소)
   - Next/Image vs Remix 이미지 처리
   - **측정 지표**: 이미지 로딩 시간, 최적화된 크기

### 8. **에러 처리** (2가지 비교 요소)
   - 에러 바운더리
   - 404/500 페이지 커스터마이징
   - **측정 지표**: 에러 복구 시간, 사용자 경험 점수

### 9. **SEO 최적화** (2가지 비교 요소)
   - 메타 태그 관리
   - 사이트맵 생성
   - **측정 지표**: Lighthouse SEO 점수, Core Web Vitals

### 10. **국제화(i18n)** (1가지 비교 요소)
   - 다국어 지원 (한국어/영어)
   - **측정 지표**: 언어 전환 시간, 번역 파일 크기

### 11. **실시간 기능** (1가지 비교 요소)
   - WebSocket 또는 Server-Sent Events
   - **측정 지표**: 레이턴시, 동시 연결 수

### 12. **캐싱 전략** (2가지 비교 요소)
   - 브라우저 캐싱
   - 서버 사이드 캐싱
   - **측정 지표**: 캐시 히트율, 응답 시간 개선도

## 🚀 플랫폼별 고유 기능

### Next.js 고유 기능 (v15+)
1. **App Router with Turbopack**
   - React Server Components
   - 스트리밍 SSR
   - Turbopack (Webpack 대체 번들러)
   - **성능 비교**: Turbopack vs Vite 빌드 시간 측정
   - **코드 예제 포함**

2. **Partial Prerendering (PPR)**
   - 정적 + 동적 콘텐츠 결합
   - Next.js 15의 실험적 기능
   - **성능 측정 데이터 포함**

3. **Server Actions & Mutations**
   - 서버 컴포넌트에서 직접 데이터 변경
   - 폼 처리 최적화
   - **지연 시간 비교 데이터**

### Remix 고유 기능 (v2+ with Vite)
1. **Vite 기반 개발 환경**
   - HMR (Hot Module Replacement) 성능
   - Vite 플러그인 생태계 활용
   - **개발 서버 시작 시간 비교**
   - **번들링 성능 측정**

2. **Progressive Enhancement**
   - JavaScript 없이 동작하는 폼
   - 점진적 향상 전략
   - **접근성 점수 측정**

3. **Route Module API v2**
   - Single Fetch 최적화
   - Streaming 지원
   - **데이터 로딩 성능 비교**

### React Router 7 고유 기능 (v7+ with Vite)
1. **React Router v7 프레임워크 모드**
   - Remix v2의 모든 기능을 React Router에 통합
   - 파일 기반 라우팅 + Type Safety
   - **Remix 대비 개선된 DX**
   - **타입 안정성 개선 측정**

2. **Static Pre-rendering**
   - 빌드 타임 정적 생성 지원
   - Route별 pre-rendering 설정
   - **SSG 성능 비교**

3. **Modern React Features**
   - React 19 최신 기능 지원
   - Server Components 실험적 지원
   - Suspense 기반 데이터 페칭
   - **최신 React 기능 활용도**

4. **Improved Developer Experience**
   - 더 나은 에러 메시지
   - 향상된 타입 추론
   - Vite 5+ 최적화
   - **개발 생산성 지표**

### Vite 도구 활용 영역
1. **개발 도구 통합**
   ```javascript
   // vite.config.ts 예제
   import { vitePlugin as remix } from "@remix-run/dev";
   import { defineConfig } from "vite";
   
   export default defineConfig({
     plugins: [
       remix({
         // Remix v2 Vite 설정
       })
     ],
     // 성능 분석 플러그인
     build: {
       rollupOptions: {
         // 번들 최적화 설정
       }
     }
   });
   ```

2. **번들 분석 도구**
   - rollup-plugin-visualizer
   - vite-bundle-analyzer
   - **번들 크기 시각화 비교**

3. **성능 최적화 도구**
   - Vite PWA Plugin
   - Vite Compression Plugin
   - **최적화 전후 성능 지표**

## 📊 비교 문서 구조 (docs/comparison.md)

```markdown
# Next.js vs Remix vs React Router 7 상세 비교

## 1. 성능 지표 비교
| 지표 | Next.js 16 | Remix v2 | React Router 7 | 최고 성능 |
|------|------------|----------|----------------|-----------|
| 초기 로딩 시간 (FCP) | X.XXs | X.XXs | X.XXs | 🏆 |
| 번들 크기 | XXX KB | XXX KB | XXX KB | 🏆 |
| 빌드 시간 (프로덕션) | XX초 | XX초 | XX초 | 🏆 |
| 개발 서버 시작 시간 | X.Xs | X.Xs | X.Xs | 🏆 |
| HMR 업데이트 시간 | XXms | XXms | XXms | 🏆 |
| 메모리 사용량 | XXX MB | XXX MB | XXX MB | 🏆 |

## 2. 빌드 도구 비교
| 항목 | Next.js (Turbopack) | Remix (Vite) | React Router 7 (Vite) | 평가 |
|------|-------------------|--------------|----------------------|------|
| 콜드 스타트 | X.Xs | X.Xs | X.Xs | 측정값... |
| 리빌드 시간 | XXms | XXms | XXms | 측정값... |
| 트리 쉐이킹 효율 | XX% | XX% | XX% | 분석... |
| 코드 스플리팅 | 자동 | 수동/자동 | 자동 | 설명... |
| 플러그인 생태계 | Webpack/Turbo | Vite/Rollup | Vite/Rollup | 비교... |

## 3. 개발자 경험 (DX) 비교
| 항목 | Next.js 16 | Remix v2 | React Router 7 | 평가 |
|------|------------|----------|----------------|------|
| 학습 곡선 | 중간 | 높음 | 중간 | 설명... |
| 문서 품질 | 우수 | 우수 | 우수 | 설명... |
| 타입 안정성 | 우수 | 우수 | 최고 | TypeScript 지원... |
| 디버깅 도구 | Next DevTools | Vite DevTools | Vite DevTools | 비교... |
| 커뮤니티 크기 | 대규모 | 중규모 | 성장 중 | GitHub 통계... |
| Remix 마이그레이션 | N/A | N/A | 쉬움 | 호환성... |

## 4. 테스트 성능 비교 (Vitest)
| 측정 항목 | Next.js 16 | Remix v2 | React Router 7 | 최고 성능 |
|-----------|------------|----------|----------------|-----------|
| 전체 테스트 실행 시간 | XX.Xs | XX.Xs | XX.Xs | 🏆 |
| 단일 파일 테스트 시간 | XXms | XXms | XXms | 🏆 |
| Watch 모드 재실행 시간 | XXms | XXms | XXms | 🏆 |
| 커버리지 생성 시간 | X.Xs | X.Xs | X.Xs | 🏆 |
| 병렬 실행 효율성 | XX% | XX% | XX% | 🏆 |
| 메모리 사용량 (테스트) | XXX MB | XXX MB | XXX MB | 🏆 |

## 5. 기능별 코드 비교
### 5.1 라우팅 예제
[Next.js 16 App Router 코드]
[Remix v2 Route Modules 코드]
[React Router 7 Route Modules 코드]
[차이점 분석]

### 5.2 테스트 코드 예제 (Vitest)
[Next.js 컴포넌트 테스트]
[Remix 컴포넌트 테스트]
[React Router 7 컴포넌트 테스트]
[테스트 설정 차이점]

... (각 기능별 상세 비교)
```

## 🧪 테스트 요구사항

### Unit Tests
- **커버리지 목표**: 80% 이상
- **테스트 프레임워크**: Vitest + React Testing Library
- **Vitest 선택 이유**:
  - Vite와 동일한 설정 및 변환 파이프라인 사용
  - Jest 대비 5-10배 빠른 테스트 실행 속도
  - HMR 지원으로 테스트 파일 수정 시 즉시 재실행
  - TypeScript, JSX, CSS Modules 네이티브 지원
- **필수 테스트 항목**:
  - 컴포넌트 렌더링
  - 사용자 인터랙션
  - API 호출 (MSW 통합)
  - 상태 변경
  - 훅(Hooks) 테스트
  - 유틸리티 함수 테스트

### Vitest 설정 예제
```typescript
// vitest.config.ts (Next.js)
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      threshold: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80
      }
    },
    // 테스트 실행 시간 측정
    reporters: ['verbose', 'json'],
    outputFile: './test-results.json'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})

// vitest.config.ts (Remix - Vite 통합)
import { defineConfig } from 'vite'
import { vitePlugin as remix } from '@remix-run/dev'

export default defineConfig({
  plugins: [remix()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      threshold: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80
      }
    }
  }
})
```

### 테스트 파일 구조
```
tests/
├── unit/
│   ├── components/      # 컴포넌트 테스트
│   ├── hooks/           # 커스텀 훅 테스트
│   ├── utils/           # 유틸리티 함수 테스트
│   └── api/             # API 라우트 테스트
├── integration/         # 통합 테스트
├── setup.ts            # 테스트 환경 설정
└── mocks/              # MSW 목 설정
```

### E2E Tests
- **프레임워크**: Playwright 또는 Cypress
- **시나리오** (최소 10개):
  1. 회원가입 → 로그인 → 프로필 수정
  2. 게시글 CRUD 전체 플로우
  3. 검색 및 필터링
  4. 파일 업로드 및 다운로드
  5. 다국어 전환
  6. 에러 발생 및 복구
  7. 실시간 알림 수신
  8. 반응형 디자인 테스트
  9. 접근성 테스트 (키보드 네비게이션)
  10. 성능 테스트 (대용량 데이터 처리)

## 💻 코드 작성 가이드라인

### 1. 주석 규칙
```javascript
/**
 * 컴포넌트명: UserProfile
 * 용도: 사용자 프로필 정보를 표시하고 편집할 수 있는 컴포넌트
 * 
 * [Next.js 특징]
 * - next/image를 사용한 이미지 최적화
 * - getServerSideProps를 통한 서버사이드 데이터 페칭
 * 
 * [신입 개발자를 위한 설명]
 * 이 컴포넌트는 서버에서 사용자 데이터를 미리 가져와서
 * 클라이언트에 전달합니다. 이렇게 하면 SEO에 유리하고
 * 초기 로딩 속도가 빨라집니다.
 * 
 * @param {Object} user - 사용자 객체
 * @returns {JSX.Element} 사용자 프로필 UI
 */
```

### 2. Vitest 테스트 작성 예제
```typescript
// UserProfile.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { UserProfile } from './UserProfile'

describe('UserProfile 컴포넌트', () => {
  // 각 테스트 전 실행
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('사용자 정보를 올바르게 표시해야 한다', () => {
    const user = {
      id: '1',
      name: '홍길동',
      email: 'hong@example.com'
    }
    
    render(<UserProfile user={user} />)
    
    expect(screen.getByText('홍길동')).toBeInTheDocument()
    expect(screen.getByText('hong@example.com')).toBeInTheDocument()
  })

  it('프로필 수정 버튼 클릭 시 편집 모드로 전환되어야 한다', async () => {
    const user = { id: '1', name: '홍길동' }
    
    render(<UserProfile user={user} />)
    
    const editButton = screen.getByRole('button', { name: /수정/i })
    fireEvent.click(editButton)
    
    await waitFor(() => {
      expect(screen.getByRole('textbox', { name: /이름/i })).toBeInTheDocument()
    })
  })

  // 성능 측정 테스트
  it('컴포넌트 렌더링 시간이 100ms 이내여야 한다', () => {
    const startTime = performance.now()
    
    render(<UserProfile user={{ id: '1', name: 'Test' }} />)
    
    const endTime = performance.now()
    const renderTime = endTime - startTime
    
    expect(renderTime).toBeLessThan(100)
  })
})
```

### 3. 유지보수성 체크리스트
- [ ] **명명 규칙**: 일관된 네이밍 컨벤션 (camelCase, PascalCase)
- [ ] **파일 구조**: 기능별 모듈화 (components/, hooks/, utils/)
- [ ] **타입 안정성**: TypeScript 사용 (strict mode)
- [ ] **코드 재사용**: 공통 컴포넌트 및 유틸리티 함수
- [ ] **테스트 작성**: 
  - Vitest 유닛 테스트 커버리지 80% 이상
  - 테스트 파일은 동일 폴더에 `.test.ts(x)` 또는 `.spec.ts(x)` 형식
  - 테스트 실행 시간 측정 및 최적화
- [ ] **환경 설정**: .env를 통한 설정 관리
- [ ] **의존성 관리**: 최소한의 외부 라이브러리
- [ ] **에러 처리**: 모든 비동기 작업에 try-catch
- [ ] **로깅**: 구조화된 로깅 시스템
- [ ] **문서화**: JSDoc 및 README 완성도
- [ ] **린팅**: ESLint + Prettier 설정

### 4. 성능 최적화 필수 사항
- **코드 스플리팅**: 동적 import() 사용
- **메모이제이션**: React.memo, useMemo, useCallback 적절히 활용
- **번들 분석**: 
  - Next.js: @next/bundle-analyzer 사용
  - Remix: rollup-plugin-visualizer (Vite 통합) 사용
- **이미지 최적화**: WebP/AVIF 포맷, lazy loading
- **폰트 최적화**: next/font 또는 Vite 폰트 최적화 플러그인
- **빌드 최적화**:
  - Next.js 15: Turbopack 최적화 옵션 활용
  - Remix v2: Vite 빌드 최적화 (minify, treeshake, chunk 전략)
- **개발 환경 최적화**:
  - Vite의 prebundling 활용
  - 의존성 최적화 설정
- **테스트 성능 최적화**:
  - Vitest의 병렬 실행 활용
  - 테스트 파일 분할 전략
  - Watch 모드 최적화

## 📝 README.md 템플릿 (각 폴더별)

```markdown
# [Next.js/Remix] 애플리케이션

## 🔖 버전 정보
- **프레임워크**: [Next.js 15.x / Remix 2.x]
- **빌드 도구**: [Turbopack / Vite 5.x]
- **React**: 18.3.x
- **Node.js**: 20.x LTS

## 🚀 시작하기

### 사전 요구사항
- Node.js 20.0.0 이상
- npm 10.0.0 이상 또는 pnpm 8.0.0 이상

### 설치 및 실행
\`\`\`bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev              # Next.js: next dev / Remix: vite dev

# 프로덕션 빌드
npm run build           # Next.js: next build / Remix: vite build

# 프로덕션 실행
npm start               # Next.js: next start / Remix: remix-serve

# 타입 체크
npm run type-check

# 린트 실행
npm run lint

# Vitest 유닛 테스트
npm test                # Vitest 실행
npm run test:ui         # Vitest UI 모드
npm run test:coverage   # 커버리지 리포트 생성
npm run test:watch      # Watch 모드

# E2E 테스트
npm run test:e2e

# 번들 분석 (Vite 기반)
npm run analyze
\`\`\`

### Vite 개발 도구 (Remix)
\`\`\`bash
# Vite 개발 서버 디버그 모드
DEBUG=vite:* npm run dev

# Vite 빌드 최적화 리포트
npm run build -- --report

# Vite Preview (프로덕션 빌드 미리보기)
npm run preview
\`\`\`

## 📂 프로젝트 구조
[상세한 폴더 구조 설명]

## 🔑 주요 기능
1. [기능 1] - 설명 및 위치
2. [기능 2] - 설명 및 위치
...

## 🎓 신입 개발자를 위한 가이드

### 1단계: 기본 개념 이해
[프레임워크 핵심 개념 설명]

### 2단계: 코드 구조 파악
[주요 파일과 역할 설명]

### 3단계: 개발 플로우
[새 기능 추가 시 단계별 절차]

### 4단계: 빌드 도구 이해
- **Next.js**: Turbopack의 동작 원리
- **Remix**: Vite의 동작 원리와 플러그인 시스템

## 🔧 환경 변수
\`\`\`env
# .env.example
DATABASE_URL=
NEXT_PUBLIC_API_URL=    # Next.js
PUBLIC_API_URL=         # Remix (Vite)
JWT_SECRET=
VITE_APP_VERSION=       # Vite 환경 변수
\`\`\`

## 📊 성능 지표
- Lighthouse 점수: Performance XX, Accessibility XX
- 번들 크기: XXX KB (gzipped)
- 빌드 시간: XX초
- 개발 서버 시작: X.X초
- HMR 업데이트: XXms

## 🛠️ 빌드 최적화 설정
### Next.js (next.config.js)
\`\`\`javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      // Turbopack 설정
    }
  }
}
\`\`\`

### Remix (vite.config.ts)
\`\`\`typescript
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [remix()],
  // Vite 최적화 설정
})
\`\`\`

## 🐛 알려진 이슈
[현재 알려진 이슈와 해결 방법]

## 📚 참고 자료
- [Next.js 15 공식 문서](https://nextjs.org/docs)
- [Remix v2 공식 문서](https://remix.run/docs)
- [Vite 공식 문서](https://vitejs.dev)
- [유용한 블로그/튜토리얼]
```

## ✅ 완료 기준

1. **기능 완성도**: 모든 기능이 세 플랫폼에서 동일하게 동작
2. **버전 준수**:
   - Next.js 15.x+ 최신 안정화 버전 사용
   - Remix 2.x 최신 안정화 버전 (Vite 기반) 사용
   - React Router 7.x+ 최신 안정화 버전 (Vite 기반) 사용
3. **테스트 커버리지**: Unit 80% 이상, E2E 주요 시나리오 100%
4. **성능 측정**:
   - 모든 지표에 대한 정량적 데이터 수집 완료
   - Turbopack vs Vite 빌드 성능 비교 데이터
   - HMR 성능 비교 데이터 (3-way)
   - Remix vs React Router 7 성능 차이 측정
5. **문서화**: 한글 문서 100% 완성, 코드 주석 충실도 90% 이상
6. **코드 품질**:
   - ESLint 에러 0개
   - TypeScript 컴파일 에러 0개 (strict mode)
   - Lighthouse 점수 각 항목 90점 이상
7. **유지보수성 점수**:
   - SonarQube 또는 CodeClimate A등급
   - 순환 복잡도 10 이하
   - 중복 코드 3% 이하
8. **빌드 도구 최적화**:
   - Vite/Turbopack 설정 최적화 완료
   - 번들 크기 최적화 (Tree-shaking, Code-splitting)
   - 개발/프로덕션 환경 분리 설정
9. **마이그레이션 가이드**:
   - Remix → React Router 7 마이그레이션 문서 작성
   - 호환성 이슈 및 해결 방법 포함

## 🎯 최종 산출물

1. **소스 코드**: /nextjs, /remix, /react-router-7 폴더의 완전한 애플리케이션
2. **비교 문서**: 15개 이상의 비교 항목에 대한 정량적 분석 (3-way)
3. **테스트 스위트**:
   - Vitest 기반 유닛 테스트 (커버리지 80% 이상)
   - Playwright E2E 테스트
   - 테스트 실행 성능 비교 리포트 (3-way)
4. **마이그레이션 가이드**: Remix → React Router 7 상세 가이드
4. **의사결정 가이드**: 어떤 상황에서 어떤 프레임워크를 선택해야 하는지
5. **성능 리포트**: 
   - 런타임 성능 벤치마크
   - 빌드 도구 성능 비교
   - 테스트 실행 성능 비교
6. **교육 자료**: 신입 개발자를 위한 학습 경로 문서

## 📌 추가 고려사항

- **보안**: OWASP Top 10 체크리스트 준수
- **접근성**: WCAG 2.1 AA 기준 충족
- **브라우저 호환성**: Chrome, Firefox, Safari, Edge 최신 2개 버전
- **모바일 최적화**: 반응형 디자인, 터치 인터랙션
- **CI/CD**: GitHub Actions 설정 파일 포함
- **버전 관리**:
  - package-lock.json 또는 pnpm-lock.yaml 포함
  - 정확한 버전 명시 (^ 대신 exact version 사용 권장)
- **마이그레이션 가이드**:
  - Next.js 14 → 15 마이그레이션 참고사항
  - Remix v1 → v2 (Vite) 마이그레이션 참고사항
- **개발 환경 통합**:
  - VS Code 설정 파일 (.vscode/)
  - Prettier, ESLint 설정 통일
  - TypeScript 설정 최적화

## 🔄 버전 업데이트 전략

```json
// package.json 예시
{
  "dependencies": {
    "next": "15.0.3",        // Next.js 최신 안정화 버전
    "@remix-run/react": "2.15.0",  // Remix 최신 안정화 버전
    "react": "18.3.1",       // React 18 최신
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "vite": "5.4.11",        // Vite 최신 버전
    "vitest": "2.1.5",       // Vitest 최신 버전
    "@vitest/ui": "2.1.5",   // Vitest UI
    "@vitest/coverage-v8": "2.1.5", // 커버리지 도구
    "@testing-library/react": "16.0.1",
    "@testing-library/jest-dom": "6.6.3",
    "@testing-library/user-event": "14.5.2",
    "msw": "2.6.4"          // API 모킹
  }
}
```

### Vitest 스크립트 설정
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest watch",
    "test:bench": "vitest bench",
    "test:typecheck": "vitest typecheck"
  }
}
```

---

이 지시서를 기반으로 Next.js 15와 Remix v2 (Vite 기반)의 장단점을 명확히 비교할 수 있는 
고품질의 프로젝트를 생성해주세요. 모든 코드와 문서는 한글로 작성하며,
신입 개발자도 이해할 수 있도록 상세한 설명을 포함해야 합니다.

**특별 강조사항**: 
- 반드시 각 프레임워크의 최신 공식 릴리즈 버전을 사용하세요
- Vite의 장점을 최대한 활용하여 개발 경험을 개선하세요
- Vitest를 활용한 빠른 테스트 실행과 HMR 지원을 구현하세요
- 빌드 도구 성능 비교를 정량적으로 측정하여 문서화하세요
- 테스트 실행 성능을 Next.js와 Remix 간 비교 측정하세요
