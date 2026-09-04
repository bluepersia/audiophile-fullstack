import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      react,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

      "react/react-in-jsx-scope": "off",

      "no-restricted-syntax": [
        "error",
        {
          selector:
            "TemplateLiteral > CallExpression[callee.property.name='map']",
          message:
            "Do not use .map() directly in template literals. Use .join() instead.",
        },
        {
          selector:
            "VariableDeclarator[init.type='ArrayExpression'][init.elements.length=0]:not([id.typeAnnotation])",
          message:
            "Annotate empty array literals with an explicit type, e.g. `const arr: number[] = []`.",
        },
      ],

      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: ["signature", "field", "constructor", "method"],
        },
      ],

      // Prefer type inference, but enforce consistency

      "@typescript-eslint/consistent-type-imports": [
        "warn",

        { prefer: "type-imports" },
      ],

      // Enforce consistent type definitions (type vs interface)

      "@typescript-eslint/consistent-type-definitions": ["warn", "type"],

      // Require explicit return types ONLY for exported functions

      "@typescript-eslint/explicit-module-boundary-types": "warn",

      // Avoid unnecessary type annotations (keeps code clean)

      "@typescript-eslint/no-inferrable-types": "warn",

      // Enforce consistent array types (T[] instead of Array<T>)

      "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],

      /**
    
    - --- Safety & Clarity ---
    - */

      // Prevent using "any" casually

      "@typescript-eslint/no-explicit-any": "warn",

      // Encourage better type narrowing

      "@typescript-eslint/strict-boolean-expressions": "off", // too harsh for juniors

      // Catch unused vars but allow _

      "@typescript-eslint/no-unused-vars": [
        "warn",

        { argsIgnorePattern: "^_" },
      ],

      "no-console": ["warn", { allow: ["warn", "error"] }],

      "no-param-reassign": ["error", { props: true }],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
