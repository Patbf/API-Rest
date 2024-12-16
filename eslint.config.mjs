import globals from "globals"; 


/** @type {import('eslint').Linter.Config[]} */
export default [
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
];