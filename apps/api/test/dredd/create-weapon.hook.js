// eslint-disable-next-line @typescript-eslint/no-var-requires
const hooks = require('hooks');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');

// 実行部分の引数が無いと動かない
// doneしないと終了しない

hooks.before('/weapons > POST > 201', async (transaction, done) => {
  transaction.skip = true; // テストをスキップする

  hooks.log('テストをスキップしました。delete, updateもスキップされています。');
  hooks.log('ユーザー認証をモックする機能が未実装です。');

  done();
});
