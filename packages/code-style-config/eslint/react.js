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
