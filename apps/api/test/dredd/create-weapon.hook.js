// eslint-disable-next-line @typescript-eslint/no-var-requires
const hooks = require('hooks');
const axios = require('axios');

require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.test.local' });

hooks.before(
  '/weapons > POST > 201 > application/json; charset=utf-8',
  async (transaction, done) => {
    const newWeapon = {
      name: 'new weapon',
      attackPower: 100,
      attribute: 'SWORD',
    };

    transaction.request.body = JSON.stringify(newWeapon);

    done();
  }
);

hooks.after(
  '/weapons > POST > 201 > application/json; charset=utf-8',
  async (transaction, done) => {
    const deleteRequestPath = `/weapons/${JSON.parse(transaction.real.body).id}`;

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
