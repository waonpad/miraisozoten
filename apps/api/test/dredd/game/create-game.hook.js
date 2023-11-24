const {
  axios,
  dreddHooksWrapper,
  address,
  reqHeadersWithTokenFromTransaction,
} = require('../dredd-config');
const hooks = require('hooks');
const { RESOURCES, dummySettings } = require('./config');

const addr = address(RESOURCES, 'POST');

hooks.before(addr, async (transaction, done) => {
  await dreddHooksWrapper(async () => {
    await axios.post('/auth/login', null, reqHeadersWithTokenFromTransaction(transaction));

    transaction.request.body = JSON.stringify(dummySettings);

    done();
  });
});

// hooks.after(addr, async (transaction, done) => {
//   await dreddHooksWrapper(async () => {
//     done();
//   });
// });
