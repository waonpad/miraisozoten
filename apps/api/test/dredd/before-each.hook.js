const { env } = require('./dredd-config');
const hooks = require('hooks');

hooks.beforeEach((transaction, done) => {
  // ダミーエンドポイントをスキップ
  if (transaction.request.uri.split('/')[2] === '-schema-') {
    transaction.skip = true;
  }

  if (transaction.request.uri.split('/')[1] === 'games') {
    transaction.skip = true;
  }

  transaction.request.headers['Authorization'] = 'Bearer ' + env.VALID_TOKEN;
  done();
});
