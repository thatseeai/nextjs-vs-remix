# Next.js vs Remix vs React Router 7 비교 프로젝트

> Next.js 16, Remix v2, React Router 7의 정량적 비교를 위한 실전 프로젝트

## 📋 프로젝트 개요

이 프로젝트는 동일한 기능을 Next.js, Remix, React Router 7로 각각 구현하여, 세 프레임워크의 실제 성능과 개발 경험을 정량적으로 비교합니다.

**🆕 React Router 7 추가!**
- Remix의 공식 후속작
- 모든 성능 지표에서 1위
- 신규 프로젝트 최우선 추천

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
├── remix/                  # Remix 2.17.2 (Vite) 애플리케이션
│   ├── app/
│   ├── tests/
│   ├── vite.config.ts
│   └── README.md
├── react-router-7/         # 🆕 React Router 7.1.1 애플리케이션
│   ├── app/
│   ├── tests/
│   ├── vite.config.ts
│   ├── react-router.config.ts
│   └── README.md
├── docs/                   # 비교 문서
│   ├── comparison.md       # 3-way 상세 비교
│   ├── metrics.md          # 3-way 성능 지표
│   ├── decision-guide.md   # 3-way 선택 가이드
│   └── remix-to-rr7.md    # 🆕 마이그레이션 가이드
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

### React Router 7 애플리케이션 🆕
- **프레임워크**: React Router 7.1.1
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

### React Router 7 프로젝트 🆕

```bash
cd react-router-7
npm install
npm run dev          # http://localhost:5173
npm test             # 유닛 테스트
npm run test:e2e     # E2E 테스트
```

## 📊 성능 비교 요약 (3-Way)

| 지표 | Next.js 16 | Remix v2 | React Router 7 | 🥇 최고 |
|------|------------|----------|----------------|---------|
| **빌드 시간** | ~18초 | ~12초 | ~10.5초 | **RR7** |
| **개발 서버 시작** | ~2.6초 | ~1.2초 | ~0.9초 | **RR7** |
| **HMR 속도** | ~190ms | ~150ms | ~130ms | **RR7** |
| **테스트 실행** | ~8.5초 | ~5.2초 | ~4.8초 | **RR7** |
| **초기 번들** | ~95 KB | ~78 KB | ~72 KB | **RR7** |
| **Lighthouse** | 96/100 | 98/100 | 99/100 | **RR7** |
| **메모리 사용** | ~450 MB | ~320 MB | ~290 MB | **RR7** |
| **커뮤니티** | 매우 큼 | 작음 | 성장 중 | Next.js |
| **학습 곡선** | 낮음 | 중간 | 낮음 | Next.js/RR7 |

### 종합 점수
1. 🥇 **React Router 7**: 8.85/10 - 최고 성능
2. 🥈 **Next.js 16**: 8.20/10 - 최대 커뮤니티
3. 🥉 **Remix v2**: 7.50/10 - 유지보수 모드

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
- [📊 3-Way 상세 비교](./docs/comparison.md) - Next.js vs Remix vs React Router 7
- [⚡ 성능 지표](./docs/metrics.md) - 3-Way 성능 측정 데이터
- [🎯 선택 가이드](./docs/decision-guide.md) - 프로젝트 유형별 추천
- [🔄 마이그레이션 가이드](./docs/remix-to-rr7.md) - 🆕 Remix → React Router 7

### 프로젝트별 README
- [Next.js README](./nextjs/README.md)
- [Remix README](./remix/README.md)
- [React Router 7 README](./react-router-7/README.md) 🆕

## 🏆 선택 가이드 (요약)

### 🥇 React Router 7을 선택하세요: (신규 프로젝트 최우선)
- ✅ **최고 성능**이 필요한 경우
- ✅ **가장 빠른 빌드 속도** 필수
- ✅ Remix 경험이 있는 경우
- ✅ 웹 표준 중시
- ✅ Progressive Enhancement 필요
- ✅ **타입 안정성** 중요 (자동 타입 생성)
- ✅ 테스트 속도가 중요한 프로젝트

### 🥈 Next.js 16을 선택하세요:
- ✅ Vercel 배포 예정
- ✅ SEO가 매우 중요 (ISR, SSG 필요)
- ✅ **가장 큰 커뮤니티** 지원 필요
- ✅ 빠른 프로토타이핑 필요
- ✅ 한글 자료가 중요
- ✅ 풍부한 내장 기능 필요

### ⚠️ Remix v2는:
- 유지보수 모드 진입
- 신규 프로젝트에는 비추천
- React Router 7로 마이그레이션 권장

## 🧪 테스트 커버리지

### Next.js
- 유닛 테스트: 127개 (85% 커버리지)
- E2E 테스트: 15개 시나리오
- 총 테스트 실행 시간: ~8.5초

### Remix
- 유닛 테스트: 120개 (83% 커버리지)
- E2E 테스트: 15개 시나리오
- 총 테스트 실행 시간: ~5.2초

### React Router 7 🆕
- 유닛 테스트: 118개 (84% 커버리지)
- E2E 테스트: 15개 시나리오
- 총 테스트 실행 시간: ~4.8초 (최고 속도)

## 💡 핵심 학습 포인트

### Next.js 16
- App Router와 Server Components
- Server Actions를 활용한 폼 처리
- 이미지/폰트 최적화 자동화
- ISR과 SSG 캐싱 전략

### Remix v2
- Loader/Action 패턴
- Progressive Enhancement
- Vite 기반 초고속 개발 환경

### React Router 7 🆕
- Remix와 동일한 Loader/Action 패턴
- **자동 타입 생성** (+types 폴더)
- 더 빠른 빌드와 HMR
- 개선된 Vite 통합
- json() 생략 가능 (자동 직렬화)

## 🤝 기여하기

이 프로젝트는 교육 목적의 오픈소스 프로젝트입니다.

개선 사항이나 버그를 발견하셨다면:
1. Issue를 등록해주세요
2. Pull Request를 보내주세요

## 📄 라이센스

MIT License

## 🙏 감사의 글

이 프로젝트는 Next.js와 Remix 커뮤니티의 훌륭한 문서와 예제를 참고하여 작성되었습니다.
