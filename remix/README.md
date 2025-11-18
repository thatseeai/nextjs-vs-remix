# Remix v2 + Vite 애플리케이션

Next.js 15와의 정량적 비교를 위한 Remix v2 (Vite 기반) 프로젝트입니다.

## 🔖 버전 정보

- **프레임워크**: Remix 2.17.2
- **빌드 도구**: Vite 6.0.11
- **React**: 18.3.1
- **Node.js**: 20.x LTS 이상
- **TypeScript**: 5.8.3
- **테스트 프레임워크**: Vitest 4.0.10, Playwright 1.56.1

## 🚀 시작하기

### 사전 요구사항

- Node.js 20.0.0 이상
- npm 10.0.0 이상 또는 pnpm 8.0.0 이상

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 타입 체크
npm run typecheck

# 린트 실행
npm run lint

# 프로덕션 빌드
npm run build

# 프로덕션 실행
npm start

# Vite Preview (프로덕션 빌드 미리보기)
npm run preview
```

### 테스트 실행

```bash
# Vitest 유닛 테스트
npm test                # 테스트 실행
npm run test:ui         # Vitest UI 모드
npm run test:coverage   # 커버리지 리포트 생성
npm run test:watch      # Watch 모드

# Playwright E2E 테스트
npm run test:e2e        # E2E 테스트 실행
npm run test:e2e:ui     # Playwright UI 모드

# 번들 분석
npm run analyze
```

### Vite 개발 도구

```bash
# Vite 개발 서버 디버그 모드
DEBUG=vite:* npm run dev

# Vite 빌드 최적화 리포트
npm run build -- --report
```

## 📂 프로젝트 구조

```
remix/
├── app/                      # Remix 애플리케이션 코드
│   ├── routes/              # 라우트 파일 (파일 시스템 기반 라우팅)
│   │   └── _index.tsx       # 홈페이지 (/)
│   ├── components/          # 재사용 가능한 React 컴포넌트
│   ├── lib/                 # 유틸리티 함수 및 헬퍼
│   ├── styles/              # 글로벌 스타일 및 Tailwind CSS
│   │   └── tailwind.css     # Tailwind 기본 스타일
│   └── root.tsx             # 루트 레이아웃 컴포넌트
├── public/                  # 정적 파일 (이미지, 폰트 등)
├── tests/                   # 테스트 파일
│   ├── unit/               # 유닛 테스트
│   ├── e2e/                # E2E 테스트
│   ├── mocks/              # MSW 목 설정
│   └── setup.ts            # Vitest 설정
├── vite.config.ts           # Vite 설정
├── vitest.config.ts         # Vitest 설정
├── playwright.config.ts     # Playwright 설정
├── tsconfig.json            # TypeScript 설정
├── tailwind.config.ts       # Tailwind CSS 설정
├── postcss.config.js        # PostCSS 설정
├── eslint.config.js         # ESLint 설정 (Flat Config)
└── package.json             # 프로젝트 의존성
```

## 🎯 주요 기능

### 1. Vite 기반 개발 환경
- **초고속 HMR**: 100ms 이내의 빠른 업데이트
- **ESBuild**: Go 언어 기반의 빠른 트랜스파일러
- **개발 서버 시작**: 수백 밀리초 이내

### 2. Remix v2 핵심 기능
- **파일 시스템 기반 라우팅**: 직관적인 라우트 구조
- **Nested Routing**: 레이아웃 상속 및 데이터 로딩
- **Progressive Enhancement**: JavaScript 없이도 동작하는 폼
- **Single Fetch**: 최적화된 데이터 로딩 (Remix v2.9+)

### 3. Vitest 테스트 통합
- **빠른 테스트 실행**: Jest 대비 5-10배 빠름
- **HMR 지원**: 테스트 파일 수정 시 즉시 재실행
- **네이티브 지원**: TypeScript, JSX, CSS Modules
- **UI 모드**: 브라우저에서 테스트 결과 확인

### 4. Tailwind CSS 스타일링
- **유틸리티 우선**: 빠른 개발 속도
- **JIT 컴파일**: 필요한 CSS만 생성
- **커스터마이징**: 프로젝트 디자인 시스템 적용

## 🎓 신입 개발자를 위한 가이드

### 1단계: Remix 핵심 개념 이해

#### 라우트 (Routes)
Remix는 파일 시스템 기반 라우팅을 사용합니다.

```
app/routes/_index.tsx        → /
app/routes/about.tsx         → /about
app/routes/posts.$postId.tsx → /posts/:postId
app/routes/posts._index.tsx  → /posts/
```

#### 데이터 로딩 (Loaders)
서버에서 데이터를 로드하는 함수입니다.

```typescript
export async function loader({ params }: LoaderFunctionArgs) {
  const post = await getPost(params.postId);
  return json({ post });
}
```

#### 데이터 변경 (Actions)
폼 제출 등 데이터를 변경하는 함수입니다.

```typescript
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  await createPost(formData);
  return redirect("/posts");
}
```

### 2단계: Vite 개발 환경 이해

#### 빠른 HMR
파일을 수정하면 브라우저가 즉시 업데이트됩니다.

```typescript
// 컴포넌트 수정 → 저장 → 100ms 이내 브라우저 반영
export default function MyComponent() {
  return <div>Hello Vite!</div>;
}
```

#### 환경 변수
Vite는 `VITE_` 접두사를 사용합니다.

```typescript
// 클라이언트에서 접근 가능
const apiUrl = import.meta.env.VITE_PUBLIC_API_URL;

// 서버에서만 접근 가능 (VITE_ 접두사 없음)
const secret = process.env.JWT_SECRET;
```

### 3단계: 테스트 작성

#### Vitest 유닛 테스트

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

#### Playwright E2E 테스트

```typescript
import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Remix v2 + Vite');
});
```

### 4단계: 새 기능 추가 절차

1. **라우트 생성**: `app/routes/new-page.tsx` 파일 생성
2. **컴포넌트 작성**: React 컴포넌트 작성
3. **데이터 로딩**: `loader` 함수 추가 (필요시)
4. **스타일링**: Tailwind CSS 클래스 적용
5. **테스트 작성**: Vitest 유닛 테스트 추가
6. **E2E 테스트**: Playwright 시나리오 추가
7. **타입 체크**: `npm run typecheck`
8. **린트**: `npm run lint`

## 🔧 환경 변수

```env
# .env.example 참고
NODE_ENV=development
VITE_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
```

**주의사항**:
- `VITE_` 접두사: 클라이언트에서 접근 가능
- 접두사 없음: 서버에서만 접근 가능
- `.env` 파일은 Git에 커밋하지 마세요!

## 📊 성능 지표

측정 예정 항목:

- **개발 서버 시작 시간**: ?ms
- **HMR 업데이트 시간**: ?ms
- **초기 번들 크기**: ?KB
- **프로덕션 빌드 시간**: ?s
- **TTFB (Time to First Byte)**: ?ms
- **FCP (First Contentful Paint)**: ?ms
- **LCP (Largest Contentful Paint)**: ?ms
- **테스트 실행 시간**: ?s

## 🛠️ 빌드 최적화 설정

### Vite 최적화 (vite.config.ts)

```typescript
export default defineConfig({
  build: {
    // CSS 코드 스플리팅
    cssCodeSplit: true,

    // 청크 분리 전략
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },

  // 개발 환경 최적화
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
```

### Tailwind CSS 최적화

```typescript
// tailwind.config.ts
export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  // 사용하지 않는 CSS 자동 제거
};
```

## 🐛 알려진 이슈

현재 알려진 이슈가 없습니다.

## 📚 참고 자료

- [Remix v2 공식 문서](https://remix.run/docs)
- [Vite 공식 문서](https://vitejs.dev)
- [Vitest 공식 문서](https://vitest.dev)
- [Playwright 공식 문서](https://playwright.dev)
- [Tailwind CSS 공식 문서](https://tailwindcss.com)

## 📈 Next.js vs Remix 비교

이 프로젝트는 Next.js 15와 Remix v2의 정량적 비교를 목적으로 합니다.

비교 항목:
- 빌드 도구 성능 (Turbopack vs Vite)
- 개발자 경험 (DX)
- 런타임 성능
- 번들 크기
- 테스트 실행 속도
- 학습 곡선
- 커뮤니티 및 생태계

자세한 비교는 `/docs/comparison.md` 참고 (작성 예정)

## 📝 라이선스

MIT

---

**프로젝트 상태**: 🚧 개발 중

**마지막 업데이트**: 2025-11-18
