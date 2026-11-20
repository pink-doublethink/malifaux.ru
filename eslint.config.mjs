import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  globalIgnores([".vercel/**"]),
  ...nextVitals,
  {
    files: [
      "next.config.js",
      "postcss.config.js",
      "tailwind.config.js",
      "lib/jsonGenerator.js",
    ],
    languageOptions: {
      globals: {
        process: "readonly",
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
      },
    },
  },
]);

export default eslintConfig;
