module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react/prop-types': 'off', // TS已做类型校验，关闭prop-types
    '@typescript-eslint/no-explicit-any': 'warn', // 避免any类型
    'react-hooks/rules-of-hooks': 'error', // 强制Hooks规则
    'react-hooks/exhaustive-deps': 'warn', // 检查useEffect依赖
  },
  settings: {
    react: { version: 'detect' }
  }
};