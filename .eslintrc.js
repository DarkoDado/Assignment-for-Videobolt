module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  "env": {
    "browser": true,
    "amd": true,
    "node": true
},
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/dot-notation': [
      'error',
      { allowPattern: '^[a-z]+(_[a-z]+)+$' },
    ],
  },
};


