module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true,
    "jest/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "jest/expect-expect": [
      "error",
      {
        assertFunctionNames: ["expect", "scope.done"],
      },
    ],
  },
  plugins: ["jest", "@typescript-eslint"],
  ignorePatterns: ["examples/", "lib/"],
};
