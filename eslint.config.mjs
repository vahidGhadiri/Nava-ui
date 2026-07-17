import perfectionist from "eslint-plugin-perfectionist";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";
import js from "@eslint/js";

export default [
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/.next/**", "**/.turbo/**", "**/coverage/**"],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    rules: {
      ...perfectionist.configs["recommended-line-length"].rules,
      "@typescript-eslint/no-explicit-any": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "perfectionist/sort-modules": "off",
      "prettier/prettier": "error",
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      perfectionist,
      prettier,
    },
    settings: { react: { version: "detect" } },
  },
];
