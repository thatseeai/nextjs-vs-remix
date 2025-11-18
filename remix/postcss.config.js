/**
 * PostCSS 설정 파일
 *
 * [PostCSS란?]
 * CSS를 변환하는 도구입니다. JavaScript 플러그인을 사용하여
 * CSS를 분석하고 변환할 수 있습니다.
 *
 * [사용하는 플러그인]
 * 1. tailwindcss: Tailwind CSS 처리
 * 2. autoprefixer: 벤더 프리픽스 자동 추가
 *    예: display: flex → -webkit-box-flex, -ms-flexbox, flex
 *
 * [신입 개발자를 위한 설명]
 * 개발자는 최신 CSS를 작성하고, PostCSS가 자동으로
 * 구형 브라우저 호환 코드로 변환해줍니다.
 */
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
