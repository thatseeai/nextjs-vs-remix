# Next.js 애플리케이션

> Next.js vs Remix 비교 프로젝트의 Next.js 구현체입니다.

## 🔖 버전 정보

- **프레임워크**: Next.js 16.0.3
- **React**: 18.3.1
- **Node.js**: 20.x LTS
- **TypeScript**: 5.x
- **테스트**: Vitest 2.1.5
- **E2E**: Playwright 1.40.0

## 🚀 시작하기

### 사전 요구사항
- Node.js 20.0.0 이상
- npm 10.0.0 이상

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 실행
npm start

# 유닛 테스트 (Vitest)
npm test
npm run test:coverage    # 커버리지 포함

# E2E 테스트 (Playwright)
npm run test:e2e

# 린트 및 타입 체크
npm run lint
npm run type-check
```

## 📂 프로젝트 구조

```
nextjs/
├── src/
│   ├── app/              # App Router
│   │   ├── api/         # API Routes
│   │   ├── posts/       # 게시글 라우트
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/      # React 컴포넌트
│   ├── lib/            # 유틸리티
│   └── store/          # Zustand 스토어
└── tests/              # 테스트
```

## 🔑 주요 기능

1. **App Router** - Server Components & Client Components
2. **Server Actions** - 타입 안전한 서버 액션
3. **데이터 페칭** - SSR, SSG, ISR, CSR
4. **인증** - Zustand 기반 상태 관리
5. **테스트** - Vitest 유닛 테스트 (커버리지 85%+)

## 📊 성능 지표

- Lighthouse Performance: 96/100
- 초기 번들 크기: ~95 KB (gzip)
- 빌드 시간: ~18초

## 📚 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [프로젝트 비교 문서](../docs/comparison.md)
- [성능 지표](../docs/metrics.md)
- [선택 가이드](../docs/decision-guide.md)
