import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    ignores: [".next/**", "out/**", "build/**", ".vercel/**"],
  },
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
];

export default eslintConfig;
