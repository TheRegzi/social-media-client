import eslintPluginJest from 'eslint-plugin-jest';
import eslintRecommended from '@eslint/js';

export default [
  {
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    ...eslintRecommended.configs.recommended,
  },
  {
    files: ['**/*.test.js'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        afterEach: 'readonly',
        expect: 'readonly',
        global: 'readonly',
        jest: 'readonly',
      },
    },
    plugins: {
      jest: eslintPluginJest,
    },
    rules: {
      ...eslintPluginJest.configs.recommended.rules,
      'jest/prefer-expect-assertions': 'off',
    },
  },
];
