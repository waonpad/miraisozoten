module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  ignorePath: [
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
  ],
  rules: {
    // https://designsupply-web.com/media/programming/7642/
    'at-rule-no-unknown': [true, { ignoreAtRules: ['tailwind'] }],
    'scss/at-rule-no-unknown': [true, { ignoreAtRules: ['tailwind'] }],
  },
};
