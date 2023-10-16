module.exports = {
  '**/*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix --ignore-path ./src/router.ts'],
  '**/*.{css,scss}': ['stylelint --fix'],
};
