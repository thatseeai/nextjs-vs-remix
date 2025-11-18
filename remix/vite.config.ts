import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * Vite 설정 파일
 *
 * [Remix v2 + Vite 특징]
 * - Vite의 빠른 HMR (Hot Module Replacement) 활용
 * - ESBuild 기반의 빠른 빌드 성능
 * - Rollup을 사용한 프로덕션 번들링
 *
 * [신입 개발자를 위한 설명]
 * Vite는 개발 환경에서 매우 빠른 속도를 제공하는 빌드 도구입니다.
 * - 개발 서버 시작 시간: 수백 밀리초 이내
 * - HMR: 파일 수정 시 즉시 브라우저에 반영
 * - ESBuild: Go로 작성된 매우 빠른 번들러 사용
 */
export default defineConfig({
  plugins: [
    remix({
      future: {
        // Remix v3를 위한 준비
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  server: {
    port: 3000,
    host: "localhost",
  },
  build: {
    // 프로덕션 빌드 최적화
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // SSR 빌드가 아닌 경우에만 벤더 청크 분리
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
          }
        },
      },
    },
  },
  // 개발 환경 최적화
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
