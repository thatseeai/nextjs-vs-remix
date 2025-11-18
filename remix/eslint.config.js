import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

/**
 * ESLint 설정 파일 (Flat Config)
 *
 * [ESLint 9.x Flat Config]
 * ESLint 9부터는 새로운 flat config 형식을 사용합니다.
 * .eslintrc.json 대신 eslint.config.js를 사용합니다.
 *
 * [신입 개발자를 위한 설명]
 * ESLint는 JavaScript/TypeScript 코드의 문제를 찾아주는 도구입니다.
 * - 코딩 스타일 일관성 유지
 * - 잠재적 버그 사전 발견
 * - 베스트 프랙티스 강제
 *
 * 주요 규칙:
 * - no-unused-vars: 사용하지 않는 변수 경고
 * - no-console: console.log 경고 (프로덕션)
 * - @typescript-eslint/*: TypeScript 관련 규칙
 */
export default [
  // 기본 JavaScript 권장 규칙
  js.configs.recommended,

  // 모든 파일에 적용되는 기본 설정
  {
    ignores: [
      "node_modules/**",
      "build/**",
      ".remix/**",
      ".cache/**",
      "coverage/**",
      "playwright-report/**",
      "*.config.js",
      "*.config.ts",
    ],
  },

  // TypeScript 파일 설정
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // 브라우저 전역 변수
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        // Node.js 전역 변수
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        // Vitest 전역 변수
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        vi: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      // TypeScript 규칙
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",

      // 일반 JavaScript 규칙
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-var": "error",

      // React 관련 규칙
      "react/react-in-jsx-scope": "off", // React 17+ 자동 import
    },
  },

  // JavaScript 파일 설정
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        process: "readonly",
      },
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-var": "error",
    },
  },

  // 테스트 파일 설정
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
    },
  },
];
