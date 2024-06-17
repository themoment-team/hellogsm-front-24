require("@org/eslint-config/patch");

module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "code-style-config/eslint",
    "code-style-config/eslint/react",
    "next/core-web-vitals",
  ],
  settings: {
    react: {
      // 현재 React 버전을 명시합니다.
      // 명시하지 않을 경우(기본값 'detect') React 라이브러리 전체를 불러오므로
      // 린트 과정에서 속도가 느려질 수 있습니다.
      // 예: '16.9', '17.0', '18.0' 등
      version: "18",
    },
  },
  parserOptions: {
    project: true,
    tsconfigRootDir: "./tsconfig.json",
  },
};
