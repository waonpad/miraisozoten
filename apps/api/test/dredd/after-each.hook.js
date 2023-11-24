const hooks = require('hooks');
const { firebaseAdmin, dreddHooksWrapper, prisma } = require('./dredd-config');

hooks.afterEach(async (transaction, done) => {
  await dreddHooksWrapper(async () => {
    // テスト後に全テストユーザーを削除する
    const { users } = await firebaseAdmin.auth().listUsers();
    const testUsers = users.filter((user) => user.email?.includes('test-user'));
    const userIds = testUsers.map((user) => user.uid);

    await firebaseAdmin.auth().deleteUsers(userIds);

    // delete all gamelogs
    await prisma.gameLog.deleteMany();

    // delete all games
    await prisma.game.deleteMany();

    // delete all users
    await prisma.user.deleteMany();

    done();
  });
});
