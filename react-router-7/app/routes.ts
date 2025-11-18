import type { RouteConfig } from "@react-router/dev/routes";
import { route, index, layout } from "@react-router/dev/routes";

/**
 * React Router 7 라우트 설정
 *
 * [파일 기반 라우팅]
 * app/routes/ 폴더의 파일을 명시적으로 라우트로 정의합니다.
 *
 * [Remix와의 차이점]
 * - Remix: 자동으로 라우트 감지
 * - React Router 7: routes.ts 파일에서 명시적으로 정의
 *
 * [라우트 규칙]
 * - index() → 인덱스 라우트
 * - route() → 일반 라우트
 * - layout() → 레이아웃 라우트
 */
export default [
  index("routes/_index.tsx"),
  route("about", "routes/about.tsx"),
  route("blog", "routes/blog.tsx"),
  route("client-demo", "routes/client-demo.tsx"),
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),

  // dashboard 라우트 (중첩 라우트)
  route("dashboard", "routes/dashboard.tsx", [
    index("routes/dashboard._index.tsx"),
    route("profile", "routes/dashboard.profile.tsx"),
  ]),

  route("posts", "routes/posts._index.tsx"),
  route("posts/:id", "routes/posts.$id.tsx"),

  route("api/posts", "routes/api.posts.tsx"),
  route("api/posts/:id", "routes/api.posts.$id.tsx"),
] satisfies RouteConfig;
