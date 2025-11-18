import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * Vite 설정 파일 (React Router 7)
 *
 * [React Router 7 특징]
 * - reactRouter 플러그인을 사용하여 파일 기반 라우팅 지원
 * - Vite 6.x 기반의 빠른 HMR 및 빌드 성능
 * - TypeScript 경로 별칭 지원 (~/*)
 *
 * [Remix와의 차이점]
 * - 패키지명: @remix-run/dev → @react-router/dev
 * - 플러그인명: remix() → reactRouter()
 * - 설정 구조는 거의 동일
 */
export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // SSR 빌드에서는 manualChunks를 사용하지 않음
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
