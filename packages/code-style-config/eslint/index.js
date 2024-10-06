module.exports = {
  plugins: ["no-relative-import-paths"],
  extends: ["@rushstack/eslint-config/profile/web-app"],
  rules: {
    quotes: ["error", "single"],
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@rushstack/typedef-var": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "variable",
        format: ["camelCase", "PascalCase", "UPPER_CASE"], // 변수는 camelCase 또는 PascalCase로 설정
      },
      {
        selector: "function",
        format: ["camelCase", "PascalCase"], // 함수명은 camelCase 혹은 PascalCase로 설정
      },
      {
        selector: "typeLike",
        format: ["PascalCase"], // 타입 이름은 PascalCase로 설정
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin", // Node.js built-in modules
          "external", // 외부 라이브러리
          "internal", // 내부 모듈 (프로젝트 내 특정 폴더에 있는 모듈)
          ["parent", "sibling", "index"], // 부모, 형제, 인덱스 파일
          "object", // 객체 형태의 import
          "type", // 타입 import (TypeScript)
        ],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
          {
            pattern: "react-dom",
            group: "external",
            position: "before",
          },
          {
            pattern: "@tanstack/react-query",
            group: "external",
            position: "before",
          },
          {
            pattern: "axios",
            group: "external",
            position: "before",
          },
          {
            pattern: "tailwindcss",
            group: "external",
            position: "before",
          },
          {
            pattern: "admin/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "client/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "shared/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "api/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "tailwind-config/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "types/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "./**",
            group: "sibling",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: ["../"],
      },
    ],
    "unused-imports/no-unused-imports-ts": ["error"],
    "no-console": "error",
    "@typescript-eslint/no-unused-vars": ["error"],
    "no-unused-vars": "off",
  },
  settings: {},
};
