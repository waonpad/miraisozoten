const { axios, dreddHooksWrapper, address } = require('../dredd-config');
const hooks = require('hooks');
const { RESOURCES, dummyItem } = require('./config');

const addr = address(RESOURCES, 'POST');

hooks.before(addr, async (transaction, done) => {
  await dreddHooksWrapper(async () => {
    transaction.request.body = JSON.stringify(dummyItem);

    done();
  });
});

hooks.after(addr, async (transaction, done) => {
  await dreddHooksWrapper(async () => {
    await axios.delete(`${RESOURCES}/${JSON.parse(transaction.real.body).id}`);

    done();
  });
});
