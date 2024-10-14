import eslintPluginJest from 'eslint-plugin-jest';
import eslintRecommended from '@eslint/js';
import eslintPluginCypress from 'eslint-plugin-cypress';

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
    // Unit test (Jest) configuration
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
  {
    // Cypress test configuration
    files: ['cypress/**/*.js', 'cypress/**/*.ts'],
    languageOptions: {
      globals: {
        Cypress: 'readonly',
        cy: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        before: 'readonly',
        after: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    plugins: {
      cypress: eslintPluginCypress,
    },
    rules: {
      ...eslintPluginCypress.configs.recommended.rules,
    },
  },
];
