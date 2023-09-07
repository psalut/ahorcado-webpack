module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['node_modules/'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // Reglas específicas para TypeScript
    '@typescript-eslint/no-explicit-any': 'error', // Evita el uso de 'any'
    '@typescript-eslint/no-unused-vars': 'error', // Detecta variables no utilizadas
    '@typescript-eslint/explicit-module-boundary-types': 'error', // Requiere tipos de retorno explícitos en funciones públicas

    // Reglas generales de estilo y buenas prácticas
    'indent': ['error', 2], // Indentación de 2 espacios
    'quotes': ['error', 'single'], // Comillas simples en lugar de dobles
    'semi': ['error', 'always'], // Siempre usa punto y coma al final de una sentencia
    'comma-dangle': ['error', 'always-multiline'], // Coma al final en arrays y objetos multi-línea
    'no-console': 'warn', // Advierte sobre el uso de console.log() y similares
    'no-unused-vars': 'off', // Desactiva la regla de ESLint para variables no utilizadas (usamos '@typescript-eslint/no-unused-vars' en su lugar)
  },
};