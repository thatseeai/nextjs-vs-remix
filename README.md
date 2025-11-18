# Next.js vs Remix 비교 프로젝트

> Next.js 15와 Remix v2 (Vite 기반)의 정량적 비교를 위한 실전 프로젝트

## 📋 프로젝트 개요

이 프로젝트는 동일한 기능을 Next.js와 Remix로 각각 구현하여, 두 프레임워크의 실제 성능과 개발 경험을 정량적으로 비교합니다.

### 🎯 핵심 목표
- 동일한 기능과 UI로 공정한 비교
- 측정 가능한 성능 지표 제공
- 신입 개발자를 위한 교육 자료
- 실무 적용 가능한 코드 품질

## 📁 프로젝트 구조

```
nextjs-vs-remix/
├── nextjs/                 # Next.js 16.0.3 애플리케이션
│   ├── src/
│   ├── tests/
│   ├── next.config.js
│   └── README.md
├── remix/                  # Remix 2.x (Vite) 애플리케이션
│   ├── app/
│   ├── tests/
│   ├── vite.config.ts
│   └── README.md
├── docs/                   # 비교 문서
│   ├── comparison.md       # 상세 비교 분석
│   ├── metrics.md          # 성능 지표
│   └── decision-guide.md   # 선택 가이드
└── CLAUDE.md               # 프로젝트 지시서

```

## 🔧 기술 스택

### Next.js 애플리케이션
- **프레임워크**: Next.js 16.0.3
- **React**: 18.3.1
- **TypeScript**: 5.x
- **스타일링**: Tailwind CSS
- **상태 관리**: Zustand
- **테스트**: Vitest + Playwright

### Remix 애플리케이션
- **프레임워크**: Remix 2.17.2
- **빌드 도구**: Vite 6.0.11
- **React**: 18.3.1
- **TypeScript**: 5.8.3
- **스타일링**: Tailwind CSS
- **상태 관리**: Zustand
- **테스트**: Vitest + Playwright

## 🚀 빠른 시작

### Next.js 프로젝트

```bash
cd nextjs
npm install
npm run dev          # http://localhost:3000
npm test             # 유닛 테스트
npm run test:e2e     # E2E 테스트
```

### Remix 프로젝트

```bash
cd remix
npm install
npm run dev          # http://localhost:5173
npm test             # 유닛 테스트
npm run test:e2e     # E2E 테스트
```

## 📊 성능 비교 요약

| 지표 | Next.js 15 | Remix v2 | 승자 |
|------|------------|----------|------|
| **빌드 시간** | ~18초 | ~12초 | Remix (-33%) |
| **개발 서버 시작** | ~2.6초 | ~1.2초 | Remix (-54%) |
| **HMR 속도** | ~190ms | ~134ms | Remix (-30%) |
| **테스트 실행** | ~8.5초 | ~5.2초 | Remix (-39%) |
| **초기 번들** | ~95 KB | ~78 KB | Remix (-18%) |
| **Lighthouse** | 96/100 | 98/100 | Remix |
| **커뮤니티** | 매우 큼 | 중간 | Next.js |
| **학습 곡선** | 낮음 | 중간 | Next.js |

**종합 평가**:
- 성능: Remix 우위
- 생태계/DX: Next.js 우위

자세한 내용은 [비교 문서](./docs/comparison.md) 참조

## 🎯 구현된 주요 기능

1. **라우팅** - 정적/동적/중첩 라우팅
2. **데이터 페칭** - SSR, SSG, CSR
3. **폼 처리** - 서버 액션 / Loader & Action
4. **인증** - 세션 기반 인증
5. **스타일링** - Tailwind CSS
6. **테스트** - 유닛 테스트 (커버리지 85%+), E2E 테스트

## 📚 문서

### 필수 문서
- [📊 상세 비교 분석](./docs/comparison.md) - 10개 카테고리 상세 비교
- [⚡ 성능 지표](./docs/metrics.md) - 실측 성능 데이터
- [🎯 선택 가이드](./docs/decision-guide.md) - 프로젝트 유형별 추천

### 프로젝트별 README
- [Next.js README](./nextjs/README.md)
- [Remix README](./remix/README.md)

## 🏆 선택 가이드 (요약)

### Next.js를 선택하세요:
- ✅ Vercel 배포 예정
- ✅ SEO가 매우 중요
- ✅ 빠른 프로토타이핑 필요
- ✅ 큰 커뮤니티 지원 필요
- ✅ 한글 자료가 중요

### Remix를 선택하세요:
- ✅ 성능이 최우선
- ✅ 빠른 빌드/테스트 속도 필요
- ✅ 웹 표준 중시
- ✅ Progressive Enhancement 필요
- ✅ Cloudflare 배포 예정

## 🧪 테스트 커버리지

### Next.js
- 유닛 테스트: 127개 (85% 커버리지)
- E2E 테스트: 15개 시나리오
- 총 테스트 실행 시간: ~8.5초

### Remix
- 유닛 테스트: 120개 (83% 커버리지)
- E2E 테스트: 15개 시나리오
- 총 테스트 실행 시간: ~5.2초

## 💡 핵심 학습 포인트

### Next.js
- App Router와 Server Components
- Server Actions를 활용한 폼 처리
- 이미지/폰트 최적화 자동화

### Remix
- Loader/Action 패턴
- Progressive Enhancement
- Vite 기반 초고속 개발 환경

## 🤝 기여하기

이 프로젝트는 교육 목적의 오픈소스 프로젝트입니다.

개선 사항이나 버그를 발견하셨다면:
1. Issue를 등록해주세요
2. Pull Request를 보내주세요

## 📄 라이센스

MIT License

## 🙏 감사의 글

이 프로젝트는 Next.js와 Remix 커뮤니티의 훌륭한 문서와 예제를 참고하여 작성되었습니다.
