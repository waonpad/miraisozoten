# ゲーム部分のバックエンドテストを行う

## Dreddを使用してAPIドキュメントの正確性を保証する

Dreddは複雑なテストケースを網羅的に実施するというより, APIドキュメントの正確性を保証するためのツールだという認識です  
そのため, 今回は細かいところには関心を持たず, テストを通す事を目標にします

### テスト対象のエンドポイント一覧

| パス                           | メソッド | 実装ファイル(apps/api/src配下)       | 機能                                                 |
| ------------------------------ | -------- | ------------------------------------ | ---------------------------------------------------- |
| /auth/login                    | POST     | /auth/auth.controller.ts             | ログインする                                         |
| /prefectures                   | GET      | /prefecture/prefecture.controller.ts | 都道府県と関連する情報の一覧を取得する               |
| /games/:id                     | GET      | /todoufuken/game/game.controller.ts  | ゲームと関連する情報を取得する                       |
| /games                         | POST     | /todoufuken/game/game.controller.ts  | ゲームを作成する                                     |
| /games/:id/logging/turn-action | POST     | /todoufuken/game/game.controller.ts  | ゲームのターンの行動を記録し、ゲームの情報を更新する |
| /games/:id/give-up             | PATCH    | /todoufuken/game/game.controller.ts  | ゲームをギブアップする                               |

### テストの事前準備

#### プロダクトのセットアップ手順を一通り行う

docs/SETUP.mdを参照

#### DB, API, Firebase Emulatorを起動する

```
nps test.predredd
```

### テストを実行してみる

💡 共通処理として, Userテーブル, GameLogテーブル, Gameテーブルをテストケース毎に初期化しているため, 既に存在しているデータは削除されます

```
cd apps/api
dredd
```

一番最初の実行結果は

```
complete: 3 passing, 4 failing, 0 errors, 4 skipped, 11 total
```

となるはずです

内訳は以下の通り, ログを遡ると表示されています

```
pass: POST (200) /auth/login duration: 536ms
skip: GET (200) /prefectures/-schema-
pass: GET (200) /prefectures duration: 55ms
skip: GET (200) /prefecture-stats-metadata/-schema-
skip: GET (200) /prefecture-stats-metadata
skip: GET (200) /games/-schema-
pass: GET (200) /games?userId=uuid-uuid-uuid-uuid&mode=NATIONWIDE&difficulty=EASY&state=PLAYING&limit=10&page=1 duration: 35ms
fail: POST (201) /games duration: 73ms
fail: GET (200) /games/uuid-uuid-uuid-uuid duration: 26ms
fail: POST (200) /games/uuid-uuid-uuid-uuid/logging/turn-action duration: 37ms
fail: PATCH (200) /games/uuid-uuid-uuid-uuid/give-up duration: 35ms
```

### なぜ？

#### skipされているテスト

apps/api/test/dredd/before-each.hook.js にこのような設定があるからです

```js
// テストしないエンドポイントをスキップ
if (['prefecture-stats-metadata'].includes(transaction.request.uri.split('/')[1])) {
  transaction.skip = true;
}

// ダミーエンドポイントをスキップ
if (transaction.request.uri.split('/')[2] === '-schema-') {
  transaction.skip = true;
}
```

#### passしているテスト

以下の2つは実際, 正常にドキュメント通りに動作します

```
pass: POST (200) /auth/login duration: 536ms
pass: GET (200) /prefectures duration: 55ms
```

が, これは実際にはテストできていません

```
pass: GET (200) /games?userId=uuid-uuid-uuid-uuid&mode=NATIONWIDE&difficulty=EASY&state=PLAYING&limit=10&page=1 duration: 35ms
```

なぜなら, dreddは空の配列を返されてもそれを正しい結果であると判断してしまうからです

💡 何もしないと, クエリパラメータも全て設定された状態でリクエストします

#### failしているテスト

最初に失敗することは織り込み済みです

| テストケース                                              | 原因                                         |
| --------------------------------------------------------- | -------------------------------------------- |
| POST (201) /games                                         | ゲームの所有者となるユーザーがDBに存在しない |
| GET (200) /games/uuid-uuid-uuid-uuid                      | 対象IDのゲームがDBに存在しない               |
| POST (200) /games/uuid-uuid-uuid-uuid/logging/turn-action | 対象IDのゲームがDBに存在しない               |
| PATCH (200) /games/uuid-uuid-uuid-uuid/give-up            | 対象IDのゲームがDBに存在しない               |

### つまりどうすればいいのか?

dreddはテストの前後にhookを実行することができます  
今回はjavascriptでこれを実装して, テストが正常に行えるようにします

まず以下を実行してください

```
cd apps/api
yarn turbo gen dredd
```

対象のリソース名を聞かれるので, `game` と入力します

すると, `apps/api/test/dredd/game` ディレクトリが作成され, その中に複数のテンプレートが作成されます  
これらは, 最も単純なCRUD処理のテストを行えるようにするためのhookファイルと, その中で使用される設定ファイルです 内容を確認してみてください

---

改めて, 起きている問題についておさらいしながら, 1つずつ解決方法を見ていきます

まず, failしているテストからです

`POST (201) /games` は, ユーザーがDBに存在しないことが失敗の原因でした  
そのため, テストを行う前に現在のトランザクションで使用しているFIrebaseユーザーをDBに保存します

```js
// apps/api/test/dredd/game/create-game.hook.js
await axios.post('/auth/login', null, reqHeadersWithTokenFromTransaction(transaction));
```

---

`GET (200) /games/uuid-uuid-uuid-uuid`, `POST (200) /games/uuid-uuid-uuid-uuid/logging/turn-action`, `PATCH (200) /games/uuid-uuid-uuid-uuid/give-up` は, 対象IDのゲームがDBに存在しないことが失敗の原因でした

そのため, テンプレートでは以下のようにして事前にデータを作成しています  
作成時のレスポンスからエンティティのIDを取得し, それをリクエストのパスに使おうということです

```js
// apps/api/test/dredd/game/get-game.hook.js
const res = await axios.post(RESOURCES, dummyItem, reqHeadersWithTokenFromTransaction(transaction));
```

この中で使用されている `dummyItem` は, `apps/api/test/dredd/game/config.js` で定義されています, が, 今回ゲームの作成に使うデータは `item` ではなく `settings` が適しています

以下のようにオブジェクトを作成し, export, それをdummyItemの位置に置き換えます  
このオブジェクトの型は実装部分やopenapi.yamlで確認できます

```js
// apps/api/test/dredd/game/config.js
const dummySettings = {
  mode: 'NATIONWIDE',
  difficulty: 'NORMAL',
  prefectureId: 1,
};
```

---

最後に, データが存在しないにも関わらず, `GET (200) /games?userId=uuid-uuid-uuid-uuid&mode=NATIONWIDE&difficulty=EASY&state=PLAYING&limit=10&page=1` がpassしていることについてです

これは, テストの前にDBにデータを追加することで対応します

今回, 以下の要件が満たせたらテストが成功していると判断することにとします

- 事前に3つのゲームを作成する
- そのうちの1つだけ, difficultyがEASYである
- クエリには, difficulty=NORMALだけを指定する
- レスポンスに含まれるゲームの数が2つである(レスポンスはhooks.afterで確認できる)
- (レスポンスに含まれるゲームの数が2つでなければエラーをthrowする記述をする)

これまでの内容と, テンプレートを読み解けばテストを行えると思います

よろしくお願いします
