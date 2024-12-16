/*import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
/*export default [
  {
    // Ignorar node_modules
    ignores: ["node_modules"], 
  },
  {
    languageOptions: {
      // Última versión de ECMAScript
      ecmaVersion: "latest", 
      // Usamos módulos ES
      sourceType: "module", 
      globals: {
        // Variables globales de navegador
        ...globals.browser, 
      },
    },
    rules: {
      // Prohíbe variables no usadas
      "no-unused-vars": "error",  
      // Permite console.log
      "no-console": "off",  
      // Obliga a usar punto y coma      
      "semi": ["error", "always"], 
      // Obliga a usar comillas dobles
      "quotes": ["error", "double"], 
    },
  },
  {
    // Configuración de Prettier
    extends: [
      // Esto activa Prettier como plugin
      "plugin:prettier/recommended", 
      "eslint:recommended",
    ],
    plugins: ["prettier"],
    rules: {
      // Marca cualquier conflicto con Prettier como error
      "prettier/prettier": "error",  
    },
  },
];*/

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
