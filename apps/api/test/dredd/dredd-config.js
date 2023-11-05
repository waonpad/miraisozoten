const axios = require('axios');

require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.test.local' });

const env = process.env;

/**
 * @description
 * baseURLとAuthorizationがデフォルトで設定されたaxiosインスタンス
 */
const axiosInstance = axios.create({
  baseURL: `http://${env.HOST}:${env.PORT}`,
  headers: {
    Authorization: 'Bearer ' + env.VALID_TOKEN,
  },
});

/**
 * @param {() => Promise<void>} fn
 * @description
 * hooksは普通に使うとエラーが起きても何も表示されないので,
 * try-catchでエラーをキャッチして表示するようにしている
 */
const dreddHooksWrapper = async (fn) => {
  try {
    await fn();
  } catch (e) {
    console.log(e);
  }
};

/**
 *
 * @param {string} path
 * @param {'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'} method
 * @param {number?} status
 * @param {string?} contentType
 * @returns `path > method > status > contentType`
 */
const address = (path, method, status, contentType) => {
  const statuses = {
    GET: 200,
    POST: 201,
    PUT: 201,
    PATCH: 200,
    DELETE: 200,
  };

  return `${path} > ${method} > ${status || statuses[method]} > ${
    contentType || 'application/json; charset=utf-8'
  }`;
};

module.exports = {
  axios: axiosInstance,
  env,
  dreddHooksWrapper,
  address,
};
