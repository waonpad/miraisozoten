const axios = require('axios');
const admin = require('firebase-admin');
const { initializeApp } = require('firebase/app');
const { getAuth, connectAuthEmulator } = require('firebase/auth');
const { prisma } = require('database');

require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.test.local' });

const env = process.env;

/**
 * @description
 * baseURLとAuthorizationがデフォルトで設定されたaxiosインスタンス
 */
const axiosInstance = axios.create({
  baseURL: `http://${env.HOST}:${env.PORT}`,
  // 毎回firebaseのユーザーを作るため、その時のトークンを使うようにする
  // TODO: トランザクションからトークンを取得し、それをヘッダーに設定するようにテンプレートを修正する
  headers: {
    Authorization: 'Bearer ' + env.VALID_TOKEN, // これは動かなくなった
  },
});

/**
 * @description
 * リクエストヘッダーにトランザクションから取得したトークンを設定して返す
 */
const reqHeadersWithTokenFromTransaction = (transaction) => ({
  headers: {
    Authorization: 'Bearer ' + transaction.request.headers.Authorization.split(' ')[1],
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

// Firebase Admin の初期化
const adminConfig = {
  projectId: env.FIREBASE_PROJECT_ID,
  privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: env.FIREBASE_CLIENT_EMAIL,
};
admin.initializeApp({
  credential: admin.credential.cert(adminConfig),
});

// Firebase App の初期化
const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  projectId: env.FIREBASE_PROJECT_ID,
};
initializeApp(firebaseConfig);

// Firebase Auth の初期化
const firebaseAuth = getAuth();
env.FIREBASE_AUTH_EMULATOR_HOST &&
  connectAuthEmulator(firebaseAuth, `http://${env.FIREBASE_AUTH_EMULATOR_HOST}`);

module.exports = {
  axios: axiosInstance,
  reqHeadersWithTokenFromTransaction,
  env,
  dreddHooksWrapper,
  address,
  firebaseAdmin: admin,
  firebaseAuth,
  prisma,
};
