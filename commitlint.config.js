const changelogConfig = require('./changelog.config');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', changelogConfig.list],
  },
};

// # 概要
// # https://zenn.dev/kalubi/articles/27fa889c338cdf
