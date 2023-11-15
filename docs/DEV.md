## 開発する

以下のコマンドで,

- DBコンテナの起動
- 全てのワークスペースの開発サーバーの起動

が実行される

```
nps dev
```

デフォルト設定で開かれるポートと対応するアプリは以下

| URL                       | パッケージ                        | 技術              |
| ------------------------- | --------------------------------- | ----------------- |
| http://localhost:3000     | `api`                             | NestJS            |
| http://localhost:3000/api | `api`のAPIドキュメント            | Swagger UI        |
| http://localhost:8080     | `web`                             | React             |
| ~~http://localhost:6006~~ | `workshop` (起動しないようにした) | Storybook         |
| http://localhost:3306     | `database`                        | MySql             |
| http://localhost:9099     | `fb-tools`                        | Firebase Emulator |

---

`web` の環境変数 `VITE_API_MOCKING` がtrueである場合, エミュレーターに加えてトークン検証用のサーバーを用意する必要があるため, 以下のコマンドを実行する

```
nps firebase.admin
```

| URL                   | パッケージ | 技術           |
| --------------------- | ---------- | -------------- |
| http://localhost:3010 | `fb-tools` | Firebase Admin |

尚, `api` と `web` は実際のFirebaseプロジェクトにアクセスするかエミュレーターを使用するかの設定を合わせる必要がある  
`api` で実際のFirebaseプロジェクトにアクセスするには, 環境変数 `FIREBASE_AUTH_EMULATOR_HOST` を無効に  
`web` は, 環境変数 `VITE_FIREBASE_EMULATOR_ENABLED` をfalseに設定する

---

Prisma Studio を起動すれば, DBに簡単にアクセスできる

```
nps prisma.studio
```

| URL                   | パッケージ | 技術   |
| --------------------- | ---------- | ------ |
| http://localhost:5555 | `database` | Prisma |
