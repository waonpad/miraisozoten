// eslint-disable-next-line @typescript-eslint/no-var-requires
const hooks = require('hooks');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');

// 実行部分の引数が無いと動かない
// doneしないと終了しない

hooks.before('/weapons/{id} > DELETE > 200', async (transaction, done) => {
  const newWeapon = {
    name: 'new weapon',
    attackPower: 100,
    attribute: 'sword',
  };

  const res = await axios.post('http://localhost:3000/weapons', newWeapon);

  hooks.log('削除されるためのデータを作成しました id: ' + res.data.id);

  const deleteRequestPath = `/weapons/${res.data.id}`;

  transaction.request.uri = deleteRequestPath;
  transaction.fullPath = deleteRequestPath;

  done();
});
