// eslint-disable-next-line @typescript-eslint/no-var-requires
const hooks = require('hooks');

hooks.before('/weapons > POST > 201', async (transaction, done) => {
  transaction.skip = true; // テストをスキップする

  hooks.log('テストをスキップしました。delete, updateもスキップされています。');
  hooks.log('ユーザー認証をモックする機能が未実装です。');

  done();
});
