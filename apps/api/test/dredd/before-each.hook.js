const { firebaseAuth, dreddHooksWrapper } = require('./dredd-config');
const hooks = require('hooks');
const { GoogleAuthProvider, signInWithCredential, signInAnonymously } = require('firebase/auth');

hooks.beforeEach(async (transaction, done) => {
  await dreddHooksWrapper(async () => {
    // 匿名ユーザー
    // const result = await signInAnonymously(firebaseAuth);

    const random = Math.random();

    // テスト用のユーザーを作成
    const result = await signInWithCredential(
      firebaseAuth,
      GoogleAuthProvider.credential(
        JSON.stringify({
          sub: `test-user-${random}`,
          email: `test-user-${random}@example.com`,
          email_verified: true,
          name: `test-user-${random}`,
        })
      )
    );

    // テスト用のユーザーのトークンを取得
    const token = await result.user.getIdToken();

    // テストしないエンドポイントをスキップ
    if (['prefecture-stats-metadata'].includes(transaction.request.uri.split('/')[1])) {
      transaction.skip = true;
    }

    // ダミーエンドポイントをスキップ
    if (transaction.request.uri.split('/')[2] === '-schema-') {
      transaction.skip = true;
    }

    // 作成したユーザーのトークンをリクエストヘッダーに追加
    transaction.request.headers['Authorization'] = 'Bearer ' + token;
    done();
  });
});
