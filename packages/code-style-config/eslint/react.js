module.exports = {
  plugins: ["react", "react-refresh", "jsx-a11y", "unused-imports", "sort-exports"],
  extends: [
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],

  settings: {
    react: {
      version: "detect",
    },
  },

  overrides: [
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
      rules: {
        "react-refresh/only-export-components": "off",
      },
    },
  ],

  rules: {
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
    "sort-exports/sort-exports": ["error"],
    "no-unused-vars": "off",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "jsx-a11y/alt-text": [
      "warn",
      {
        elements: ["img"],
      },
    ],
    "jsx-a11y/aria-props": "warn",
    "jsx-a11y/aria-proptypes": "warn",
    "jsx-a11y/aria-unsupported-elements": "warn",
    "jsx-a11y/role-has-required-aria-props": "warn",
    "jsx-a11y/role-supports-aria-props": "warn",
    "react/no-unknown-property": "off",
    "react/prop-types": "off",
  },
  overrides: [
    {
      files: ["**/style.ts", "**/*.stories.tsx"],
      rules: {
        "sort-exports/sort-exports": ["off"],
      },
    },
  ],
};
