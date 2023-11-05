const { axios, dreddHooksWrapper, address } = require('../dredd-config');
const hooks = require('hooks');
const { RESOURCE, RESOURCES, dummyItem } = require('./config');

const addr = address(RESOURCE, 'PATCH');

hooks.before(addr, async (transaction, done) => {
  await dreddHooksWrapper(async () => {
    const res = await axios.post(RESOURCES, dummyItem);

    const requestPath = `${RESOURCES}/${res.data.id}`;

    transaction.request.uri = requestPath;
    transaction.fullPath = requestPath;

    done();
  });
});

hooks.after(addr, async (transaction, done) => {
  await dreddHooksWrapper(async () => {
    await axios.delete(transaction.fullPath);

    done();
  });
});
