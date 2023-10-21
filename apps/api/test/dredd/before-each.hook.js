// eslint-disable-next-line @typescript-eslint/no-var-requires
const hooks = require('hooks');

require('dotenv').config({ path: '.env.test.local' });

hooks.beforeEach((transaction, done) => {
  // ダミーエンドポイントをスキップ
  if (transaction.request.uri.split('/')[2] === '-schema-') {
    transaction.skip = true;
  }

  transaction.request.headers['Authorization'] = 'Bearer ' + process.env.VALID_TOKEN;
  done();
});
