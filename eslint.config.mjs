
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["node_modules"],
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-unused-vars": "error",
      "no-console": "off",
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": "error", // Habilita las reglas de Prettier
    },
  },
  eslintConfigPrettier, // Incluye las configuraciones de Prettier
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "prettier/prettier": "error", // Asegura que Prettier se aplique a estos archivos
    },
  },
];
