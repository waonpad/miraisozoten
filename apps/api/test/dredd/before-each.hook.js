// eslint-disable-next-line @typescript-eslint/no-var-requires
const hooks = require('hooks');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');

// 実行部分の引数が無いと動かない
// doneしないと終了しない

hooks.beforeEach((transaction, done) => {
  done();
});
