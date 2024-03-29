module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ['dist'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'eslint-config-prettier',
    'prettier',
    'airbnb-base',
    'airbnb/hooks',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'prettier', 'react-refresh'],
  rules: {
    'import/prefer-default-export': 0,
    'import/no-cycle': 0,
    'import/no-useless-path-segments': 0,
    'import/no-unresolved': 0,
    'import/export': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/named': 0,
    'react/prop-types': 0,
    'react/function-component-definition': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'no-underscore-dangle': 0,
    'max-len': ['error', { code: 140, ignorePattern: '^\\s*//\\s*\\d+$', ignoreComments: true }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
