module.exports = {
  plugins: ["no-relative-import-paths"],
  extends: ["@rushstack/eslint-config/profile/web-app"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
  },
  settings: {},
};
