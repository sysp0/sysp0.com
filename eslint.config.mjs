import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["blog/**/*.{js,cjs}"],
    rules: { "@typescript-eslint/no-require-imports": "off", "@next/next/no-img-element": "off" },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "blog/build/**",
    "blog/.docusaurus*/**",
    "next-env.d.ts",
    ".agents/**",
    ".taste-skill/**",
  ]),
]);

export default eslintConfig;
