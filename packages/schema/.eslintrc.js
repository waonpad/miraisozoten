module.exports = {
  extends: ['custom/react'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'commonjs',
  },
  ignorePatterns: [
    '.eslintrc.js',
    'lint-staged.config.js',
    './dist/',
    'tsconfig.json',
    'tsup.config.ts',
  ],
};
