module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'next',
    'turbo',
    'plugin:tailwindcss/recommended',
    'prettier',
  ],
  plugins: ['unused-imports'],
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
    'public/',
    '.prettierrc.js',
    '.eslintrc.js',
    'tailwind.config.js',
    'next.config.js',
    'postcss.config.js',
    'jest.config.js',
    'lint-staged.config.js',
    // 怒られたのでテストファイルは無視する
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/*.spec.ts',
    '**/*.spec.tsx',
    '**/*.mjs',
  ],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'turbo/no-undeclared-env-vars': 'off', // process.env.なんとか を許可する
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    'unused-imports/no-unused-imports-ts': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: '{react,react-dom/**,react-router-dom}',
            group: 'builtin',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
  },
};

// よくわからなかったものたち↓

// const { resolve } = require("node:path");

// const project = resolve(process.cwd(), "tsconfig.json");

// /*
//  * This is a custom ESLint configuration for use with
//  * Next.js apps.
//  *
//  * This config extends the Vercel Engineering Style Guide.
//  * For more information, see https://github.com/vercel/style-guide
//  *
//  */

// // module.exports = {
// //   extends: [
// //     "@vercel/style-guide/eslint/node",
// //     "@vercel/style-guide/eslint/browser",
// //     "@vercel/style-guide/eslint/typescript",
// //     "@vercel/style-guide/eslint/react",
// //     "@vercel/style-guide/eslint/next",
// //     "eslint-config-turbo",
// //     "eslint-config-next/core-web-vitals",
// //   ].map(require.resolve),
// //   parserOptions: {
// //     project,
// //   },
// //   globals: {
// //     React: true,
// //     JSX: true,
// //   },
// //   settings: {
// //     "import/resolver": {
// //       typescript: {
// //         project,
// //       },
// //     },
// //   },
// //   ignorePatterns: ["node_modules/", "dist/"],
// //   // add rules configurations here
// //   rules: {
// //     "import/no-default-export": "off",
// //   },
// // };

// module.exports = {
//   extends: "next/core-web-vitals",
//   // add rules configurations here
//   rules: {
//     "import/no-default-export": "off",
//   },
// };
