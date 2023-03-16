module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
    // "plugin:@typescript-eslint/recommended"
  ],
  overrides: [
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
    // project: './tsconfig.json'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    '@typescript-eslint'
  ],
  rules: {
    // "@typescript-eslint/dot-notation": "error"
  }
}
