// eslint-disable-next-line @typescript-eslint/no-var-requires
const hooks = require('hooks');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');

// 実行部分の引数が無いと動かない
// doneしないと終了しない

hooks.before('/weapons/{id} > PUT > 200', async (transaction, done) => {
  const newWeapon = {
    name: 'new weapon',
    attackPower: 100,
    attribute: 'sword',
  };

  const res = await axios.post('http://localhost:3000/weapons', newWeapon);

  hooks.log('更新されるためのデータを作成しました id: ' + res.data.id);

  const updateRequestPath = `/weapons/${res.data.id}`;

  transaction.request.uri = updateRequestPath;
  transaction.fullPath = updateRequestPath;

  done();
});

hooks.after('/weapons/{id} > PUT > 200', async (transaction, done) => {
  const deleteRequestPath = transaction.fullPath;

  const res = await axios.delete('http://localhost:3000' + deleteRequestPath);

  hooks.log('テスト用データを削除しました id: ' + res.data.id);

  done();
});
