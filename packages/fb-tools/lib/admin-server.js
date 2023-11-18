const express = require('express');
const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../apps/api/.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../../../apps/api/.env.test.local') });

const env = process.env;

// Firebase Admin SDK
const adminConfig = {
  projectId: env.FIREBASE_PROJECT_ID,
  privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: env.FIREBASE_CLIENT_EMAIL,
};

// FIREBASE_AUTH_EMULATOR_HOSTが設定されている場合、自動的にエミュレーターを使用する
admin.initializeApp({
  credential: admin.credential.cert(adminConfig),
});

const app = express();

// JSONリクエストのパースを許可
app.use(express.json());
// CORSを許可する
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/firebase/admin', (req, res) => {
  console.log('GET /firebase/admin');

  return res.json({
    message: 'Firebase Admin Server',
  });
});

app.post('/firebase/admin/verify', async (req, res) => {
  const token = req.body.token;

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const userRecord = await admin.auth().getUser(decoded.uid);

    res.json({
      ...decoded,
      userRecord,
    });
  } catch (error) {
    res.status(401).send('Unauthorized: ' + error);
  }
});

app.listen(3010, () => {
  console.log('Server is running on port 3010');
});
