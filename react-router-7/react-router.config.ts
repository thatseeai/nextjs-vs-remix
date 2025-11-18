import type { Config } from "@react-router/dev/config";

/**
 * React Router 설정 파일
 *
 * [React Router 7 특징]
 * - 선택적 설정 파일
 * - 대부분의 경우 기본 설정으로 충분
 * - 고급 설정이 필요한 경우에만 사용
 *
 * [Remix와의 차이점]
 * - remix.config.js → react-router.config.ts
 * - 더 간결한 설정 옵션
 */
export default {
  // 서버 빌드 디렉토리
  serverBuildFile: "index.js",

  // 앱 디렉토리 (기본값: "app")
  appDirectory: "app",

  // 빌드 디렉토리 (기본값: "build")
  buildDirectory: "build",
} satisfies Config;
