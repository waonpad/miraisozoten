const {
  axios,
  dreddHooksWrapper,
  address,
  reqHeadersWithTokenFromTransaction,
} = require('../dredd-config');
const hooks = require('hooks');
const { RESOURCE, RESOURCES, dummyItem, dummySettings } = require('./config');

const addr = address(RESOURCE, 'GET');

hooks.before(addr, async (transaction, done) => {
  await dreddHooksWrapper(async () => {
    await axios.post('/auth/login', null, reqHeadersWithTokenFromTransaction(transaction));

    const res = await axios.post(
      RESOURCES,
      dummySettings,
      reqHeadersWithTokenFromTransaction(transaction)
    );

    const requestPath = `${RESOURCES}/${res.data.id}`;

    transaction.request.uri = requestPath;
    transaction.fullPath = requestPath;

    done();
  });
});

// hooks.after(addr, async (transaction, done) => {
//   await dreddHooksWrapper(async () => {
//     done();
//   });
// });
