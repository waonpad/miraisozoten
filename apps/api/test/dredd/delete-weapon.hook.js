// eslint-disable-next-line @typescript-eslint/no-var-requires
const hooks = require('hooks');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');

hooks.before('/weapons/{id} > DELETE > 204', async (transaction, done) => {
  const newWeapon = {
    name: 'new weapon',
    attackPower: 100,
    attribute: 'SWORD',
  };

  const res = await axios.post(`http://${process.env.HOST}:${process.env.PORT}/weapons`, newWeapon);

  hooks.log('削除されるためのデータを作成しました id: ' + res.data.id);

  const deleteRequestPath = `/weapons/${res.data.id}`;

  transaction.request.uri = deleteRequestPath;
  transaction.fullPath = deleteRequestPath;

  done();
});
