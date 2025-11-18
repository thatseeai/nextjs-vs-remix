/**
 * Vitest 테스트 환경 설정 파일
 *
 * [용도]
 * 모든 테스트 실행 전 필요한 전역 설정과 모킹을 초기화합니다.
 *
 * [신입 개발자를 위한 설명]
 * 이 파일은 테스트가 실행되기 전에 자동으로 로드됩니다.
 * DOM 환경을 시뮬레이션하고, 테스트에 필요한 유틸리티를 설정합니다.
 */

import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// 각 테스트 후 자동으로 DOM 정리
afterEach(() => {
  cleanup()
})

// Next.js 라우터 모킹
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}))

// 환경 변수 설정
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000'
