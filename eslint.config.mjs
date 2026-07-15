import perfectionist from "eslint-plugin-perfectionist";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import js from "@eslint/js";

import multilineTypeLiteralsRule from "./scripts/eslint-rules/multiline-type-literals.mjs";
import moduleMemberOrderRule from "./scripts/eslint-rules/module-member-order.mjs";

const browserGlobals = {
  AbortController: "readonly",
  URLSearchParams: "readonly",
  sessionStorage: "readonly",
  clearInterval: "readonly",
  clearTimeout: "readonly",
  localStorage: "readonly",
  setInterval: "readonly",
  setTimeout: "readonly",
  navigator: "readonly",
  document: "readonly",
  console: "readonly",
  window: "readonly",
  fetch: "readonly",
  URL: "readonly",
};

const commonJsGlobals = {
  __dirname: "readonly",
  process: "readonly",
  require: "readonly",
  module: "readonly",
};
const nodeScriptGlobals = { console: "readonly", process: "readonly" };

const vitestGlobals = {
  beforeEach: "readonly",
  afterEach: "readonly",
  beforeAll: "readonly",
  afterAll: "readonly",
  describe: "readonly",
  expect: "readonly",
  test: "readonly",
  it: "readonly",
  vi: "readonly",
};

const projectAliasPattern =
  "^@(assets(?:/illustrations)?|shared|adapters|features|infrastructure|components|services|configs|domain|utils|hooks)(?:/.*)?$";
const perfectionistRecommendedLineLengthRules =
  perfectionist.configs["recommended-line-length"].rules;

export default [
  {
    ignores: [
      "eslint.config.mjs",
      ".dependency-cruiser.js",
      "node_modules/**",
      "coverage/**",
      ".husky/**",
      "build/**",
      "report/*",
      "dist/**",
      "out/**",
      ".next",
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    rules: {
      ...perfectionistRecommendedLineLengthRules,
      "prettier/prettier": "error",
      "perfectionist/sort-imports": [
        "error",
        {
          groups: [
            [
              "type-builtin",
              "value-builtin",
              "type-external",
              "value-external",
            ],
            ["alias-type", "alias-value"],
            [
              "type-parent",
              "type-sibling",
              "type-index",
              "value-parent",
              "value-sibling",
              "value-index",
            ],
            "unknown",
          ],
          customGroups: [
            {
              elementNamePattern: projectAliasPattern,
              groupName: "alias-type",
              selector: "type",
            },
            {
              elementNamePattern: projectAliasPattern,
              groupName: "alias-value",
            },
          ],
          fallbackSort: { type: "alphabetical", order: "asc" },
          type: "line-length",
          newlinesBetween: 1,
          order: "desc",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { fixStyle: "separate-type-imports", prefer: "type-imports" },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "no-empty": ["error", { allowEmptyCatch: true }],
      "local/multiline-type-literals": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "local/module-member-order": "error",
      "perfectionist/sort-modules": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
    plugins: {
      local: {
        rules: {
          "multiline-type-literals": multilineTypeLiteralsRule,
          "module-member-order": moduleMemberOrderRule,
        },
      },
      "react-hooks": reactHooks,
      react: reactPlugin,
      perfectionist,
      prettier,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module",
        project: false,
      },
      globals: browserGlobals,
    },
    settings: { react: { version: "detect" } },
    files: ["**/*.{ts,tsx,js,jsx,mjs,cjs}"],
  },

  {
    files: [
      "src/configs/tailwind/**/*.js",
      "**/*.webpack.{js,cjs}",
      "**/*.config.{js,cjs}",
      "tailwind.config.js",
      "postcss.config.js",
    ],
    languageOptions: {
      parserOptions: { ecmaVersion: "latest", sourceType: "script" },
      globals: commonJsGlobals,
    },
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
    files: ["**/*.{test,spec}.{ts,tsx,js,jsx}"],
    languageOptions: { globals: vitestGlobals },
  },
  {
    languageOptions: {
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
      globals: nodeScriptGlobals,
    },
    files: ["scripts/**/*.mjs"],
  },
];
