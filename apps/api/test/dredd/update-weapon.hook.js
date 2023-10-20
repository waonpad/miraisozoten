// eslint-disable-next-line @typescript-eslint/no-var-requires
const hooks = require('hooks');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');

hooks.before('/weapons/{id} > PATCH > 200', async (transaction, done) => {
  const newWeapon = {
    name: 'new weapon',
    attackPower: 100,
    attribute: 'SWORD',
  };

  const res = await axios.post(`http://${process.env.HOST}:${process.env.PORT}/weapons`, newWeapon);

  hooks.log('更新されるためのデータを作成しました id: ' + res.data.id);

  const updateRequestPath = `/weapons/${res.data.id}`;

  transaction.request.uri = updateRequestPath;
  transaction.fullPath = updateRequestPath;

  done();
});

hooks.after('/weapons/{id} > PUT > 200', async (transaction, done) => {
  const deleteRequestPath = transaction.fullPath;

  const res = await axios.delete(
    `http://${process.env.HOST}:${process.env.PORT}` + deleteRequestPath
  );

  hooks.log('テスト用データを削除しました id: ' + res.data.id);

  done();
});
