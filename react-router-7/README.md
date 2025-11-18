# React Router 7 애플리케이션

## 🔖 버전 정보
- **프레임워크**: React Router 7.1.1
- **빌드 도구**: Vite 6.0.11
- **React**: 18.3.1
- **Node.js**: 20.x LTS

## 📋 프로젝트 소개

React Router 7과 Vite를 활용한 현대적인 풀스택 웹 애플리케이션입니다. React Router 7은 Remix v3의 후속 버전으로, 파일 기반 라우팅과 서버 사이드 렌더링을 지원하는 강력한 프레임워크입니다.

### React Router 7이란?

React Router 7은 Remix의 모든 기능을 포함하면서도 더 간결한 API를 제공하는 프레임워크입니다:

- **파일 기반 라우팅**: app/routes 폴더의 파일명이 URL 경로가 됩니다
- **서버 사이드 렌더링**: SEO 최적화와 빠른 초기 로딩
- **데이터 로딩**: loader 함수로 서버에서 데이터 페칭
- **폼 처리**: action 함수로 서버에서 폼 처리
- **Progressive Enhancement**: JavaScript 없이도 동작하는 폼
- **Vite 기반**: 빠른 HMR과 빌드 성능

### Remix와의 관계

React Router 7 = Remix v3입니다. Remix 팀이 React Router로 프로젝트를 통합했습니다:

- **동일한 기능**: loader, action, ErrorBoundary 등 모든 Remix 기능 포함
- **패키지명 변경**: `@remix-run/*` → `react-router`, `@react-router/*`
- **더 간결한 API**: 핵심 기능에 집중
- **Vite 우선**: Vite를 기본 빌드 도구로 사용

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

# 프로덕션 빌드
npm run build

# 프로덕션 실행
npm start

# 타입 체크
npm run type-check

# 린트 실행
npm run lint
```

### 테스트
```bash
# Vitest 유닛 테스트
npm test                # Vitest 실행
npm run test:ui         # Vitest UI 모드
npm run test:coverage   # 커버리지 리포트 생성
npm run test:watch      # Watch 모드

# E2E 테스트 (Playwright)
npm run test:e2e
npm run test:e2e:ui     # UI 모드
```

### 개발 도구
```bash
# 번들 분석 (Vite 기반)
npm run analyze

# Vite Preview (프로덕션 빌드 미리보기)
npm run preview
```

## 📂 프로젝트 구조

```
react-router-7/
├── app/
│   ├── components/           # 재사용 가능한 컴포넌트
│   │   ├── layout/          # Header, Footer 등 레이아웃 컴포넌트
│   │   └── ui/              # Button, Card, Input 등 UI 컴포넌트
│   ├── lib/                 # 유틸리티 함수 및 라이브러리
│   │   ├── constants.ts     # 전역 상수
│   │   ├── utils.ts         # 유틸리티 함수
│   │   ├── api.ts          # API 클라이언트
│   │   ├── session.server.ts # 세션 관리 (서버 전용)
│   │   └── auth.server.ts   # 인증 로직 (서버 전용)
│   ├── routes/              # 파일 기반 라우팅
│   │   ├── _index.tsx       # 홈 페이지 (/)
│   │   ├── about.tsx        # 소개 페이지 (/about)
│   │   ├── posts._index.tsx # 게시글 목록 (/posts)
│   │   ├── posts.$id.tsx    # 게시글 상세 (/posts/:id)
│   │   ├── dashboard.tsx    # 대시보드 레이아웃
│   │   ├── login.tsx        # 로그인 (/login)
│   │   └── register.tsx     # 회원가입 (/register)
│   ├── store/               # Zustand 상태 관리
│   │   ├── authStore.ts     # 인증 상태
│   │   └── uiStore.ts       # UI 상태
│   ├── styles/              # 스타일시트
│   │   └── tailwind.css     # Tailwind CSS
│   └── root.tsx             # 루트 레이아웃
├── tests/
│   ├── unit/                # 유닛 테스트 (Vitest)
│   ├── e2e/                 # E2E 테스트 (Playwright)
│   └── setup.ts             # 테스트 환경 설정
├── public/                  # 정적 파일
├── vite.config.ts          # Vite 설정
├── vitest.config.ts        # Vitest 설정
├── playwright.config.ts    # Playwright 설정
└── package.json
```

## 🔑 주요 기능

### 1. 라우팅 시스템
- **정적 라우팅**: `/about`, `/contact`
- **동적 라우팅**: `/posts/$id` (URL 파라미터)
- **중첩 라우팅**: `/dashboard/*` (레이아웃 공유)

### 2. 데이터 페칭
- **SSR**: `loader` 함수로 서버에서 데이터 페칭
- **Form Actions**: `action` 함수로 서버에서 폼 처리
- **Type Safety**: TypeScript로 타입 안정성 확보

### 3. 상태 관리
- **Zustand**: 전역 상태 관리 (authStore, uiStore)
- **Form State**: React Router의 useNavigation 활용

### 4. 인증 시스템
- **세션 기반 인증**: 쿠키 세션 스토리지
- **JWT 토큰**: jose 라이브러리 사용
- **비밀번호 해싱**: bcryptjs

### 5. 스타일링
- **Tailwind CSS**: Utility-first CSS 프레임워크
- **반응형 디자인**: 모바일 우선 접근 방식

## 🎓 신입 개발자를 위한 가이드

### 1단계: React Router 7 핵심 개념 이해

#### 파일 기반 라우팅
```
app/routes/_index.tsx       → /
app/routes/about.tsx        → /about
app/routes/posts.$id.tsx    → /posts/:id
app/routes/dashboard.tsx    → /dashboard (레이아웃)
app/routes/dashboard._index.tsx → /dashboard (인덱스)
```

#### loader: 서버에서 데이터 가져오기
```typescript
// app/routes/posts.$id.tsx
export async function loader({ params }: LoaderFunctionArgs) {
  const post = await getPost(params.id);
  return json({ post });
}

export default function Post() {
  const { post } = useLoaderData<typeof loader>();
  return <div>{post.title}</div>;
}
```

#### action: 서버에서 폼 처리
```typescript
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title");
  await createPost({ title });
  return redirect("/posts");
}

export default function NewPost() {
  return (
    <Form method="post">
      <input name="title" />
      <button type="submit">생성</button>
    </Form>
  );
}
```

### 2단계: 코드 구조 파악

#### 서버 전용 코드 (.server.ts)
```typescript
// app/lib/session.server.ts
// 이 파일은 서버에서만 실행되며, 클라이언트 번들에 포함되지 않습니다.
export async function getSession(request: Request) {
  // 세션 로직
}
```

#### 컴포넌트 재사용
```typescript
// app/components/ui/Button.tsx
export function Button({ children, ...props }) {
  return <button {...props}>{children}</button>;
}
```

### 3단계: 새 기능 추가 방법

1. **새 페이지 추가**
   ```bash
   # app/routes/contact.tsx 생성
   # 자동으로 /contact 경로 생성됨
   ```

2. **API 라우트 추가**
   ```bash
   # app/routes/api.users.tsx
   # POST /api/users 엔드포인트
   ```

3. **테스트 작성**
   ```bash
   # tests/unit/components/NewComponent.test.tsx
   ```

### 4단계: 빌드 도구 이해 (Vite)

React Router 7은 Vite를 기본 빌드 도구로 사용합니다:

- **HMR (Hot Module Replacement)**: 코드 변경 시 즉시 반영
- **빠른 빌드**: esbuild 기반의 빠른 번들링
- **Code Splitting**: 자동 코드 분할로 초기 로딩 최적화
- **Tree Shaking**: 사용하지 않는 코드 제거

## 🔧 환경 변수

```env
# .env.example
# 세션 시크릿 (운영 환경에서는 반드시 변경)
SESSION_SECRET=your-secret-key-change-this-in-production

# JWT 시크릿
JWT_SECRET=your-jwt-secret-key-change-this-in-production

# API 엔드포인트 (PUBLIC_ 접두사 필수)
PUBLIC_API_URL=http://localhost:3000/api

# 애플리케이션 설정
PUBLIC_APP_NAME=React Router 7 App
PUBLIC_APP_VERSION=0.1.0

# 개발 환경
NODE_ENV=development
```

**주의**: `PUBLIC_` 접두사가 있는 환경 변수만 클라이언트에서 접근 가능합니다. (Vite 규칙)

## 📊 성능 지표

React Router 7의 성능 특징:

- **개발 서버 시작**: ~500ms (Vite 기반)
- **HMR 업데이트**: ~50ms
- **빌드 시간**: 프로젝트 크기에 따라 다름
- **번들 크기**: Code Splitting으로 최소화
- **Lighthouse 점수**: Performance 90+, Accessibility 95+

## 🛠️ 빌드 최적화 설정

### Vite 설정 (vite.config.ts)
```typescript
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router'],
        },
      },
    },
  },
});
```

### 최적화 팁
1. **동적 import**: `const Component = lazy(() => import('./Component'))`
2. **이미지 최적화**: WebP 포맷 사용
3. **폰트 최적화**: 웹 폰트 프리로드
4. **캐싱 전략**: Cache-Control 헤더 설정

## 🔄 Remix에서 마이그레이션

Remix 프로젝트를 React Router 7로 마이그레이션하는 방법:

### 1. 패키지 변경
```bash
# 제거
npm uninstall @remix-run/react @remix-run/node @remix-run/serve @remix-run/dev

# 설치
npm install react-router @react-router/node @react-router/serve @react-router/dev
```

### 2. Import 경로 변경
```typescript
// Before (Remix)
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

// After (React Router 7)
import { useLoaderData } from "react-router";
import { json } from "react-router";
```

### 3. 설정 파일 변경
```typescript
// vite.config.ts
// Before
import { vitePlugin as remix } from "@remix-run/dev";

// After
import { reactRouter } from "@react-router/dev/vite";
```

### 4. 나머지는 동일!
- 파일 구조: 변경 없음
- loader/action: 완전히 동일
- hooks: 동일한 API
- 컴포넌트: 변경 없음

## 🐛 알려진 이슈

현재 알려진 이슈 없음. React Router 7은 안정적인 버전입니다.

## 📚 참고 자료

- [React Router 공식 문서](https://reactrouter.com)
- [React Router 7 마이그레이션 가이드](https://reactrouter.com/upgrading/v7)
- [Vite 공식 문서](https://vitejs.dev)
- [Remix → React Router 7 마이그레이션](https://remix.run/blog/merging-remix-and-react-router)
- [Vitest 공식 문서](https://vitest.dev)
- [Playwright 공식 문서](https://playwright.dev)

## 🎯 Next.js 및 Remix와의 비교

### React Router 7의 장점
1. **간결한 API**: Remix의 모든 기능을 더 간단한 인터페이스로
2. **Vite 우선**: 빠른 개발 경험
3. **점진적 마이그레이션**: 기존 React 앱에서 점진적 도입 가능
4. **Progressive Enhancement**: JavaScript 없이도 동작

### 사용 사례
- **풀스택 앱**: 서버 사이드 로직이 필요한 경우
- **SEO 중요**: 검색 엔진 최적화가 중요한 경우
- **폼 중심 앱**: 복잡한 폼 처리가 많은 경우
- **기존 React 앱 확장**: SPA를 SSR로 확장하고 싶은 경우

## 🤝 기여

이 프로젝트는 Next.js와 Remix 비교를 위한 샘플 프로젝트입니다.

## 📝 라이선스

MIT
