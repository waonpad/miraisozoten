// eslint-disable-next-line @typescript-eslint/no-var-requires
const hooks = require('hooks');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');

require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.test.local' });

hooks.before(
  '/weapons/{id} > GET > 200 > application/json; charset=utf-8',
  async (transaction, done) => {
    const newWeapon = {
      name: 'new weapon',
      attackPower: 100,
      attribute: 'SWORD',
    };

    const res = await axios.post(
      `http://${process.env.HOST}:${process.env.PORT}/weapons`,
      newWeapon,
      {
        headers: {
          Authorization: 'Bearer ' + process.env.VALID_TOKEN,
        },
      }
    );

    const getRequestPath = `/weapons/${res.data.id}`;

    transaction.request.uri = getRequestPath;
    transaction.fullPath = getRequestPath;

    done();
  }
);

hooks.after(
  '/weapons/{id} > GET > 200 > application/json; charset=utf-8',
  async (transaction, done) => {
    const deleteRequestPath = transaction.fullPath;

    const res = await axios.delete(
      `http://${process.env.HOST}:${process.env.PORT}` + deleteRequestPath,
      {
        headers: {
          Authorization: 'Bearer ' + process.env.VALID_TOKEN,
        },
      }
    );

    done();
  }
);
