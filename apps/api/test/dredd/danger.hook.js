// eslint-disable-next-line @typescript-eslint/no-var-requires
const hooks = require('hooks');
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const axios = require('axios');

hooks.before('/danger > GET > 200', async (transaction, done) => {
  transaction.skip = true; // テストをスキップする

  // トークンをヘッダーに付与する
  // transaction.request.headers.Authorization = 'Bearer ' + `ここにトークンを入れる`;

  done();
});
