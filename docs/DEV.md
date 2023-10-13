## 開発する

以下のコマンドで,

- DBコンテナの起動
- 全てのワークスペースの開発サーバーの起動

が実行される

```
nps dev
```

デフォルト設定で開かれるポートと対応するアプリは以下

- http://localhost:3000: `api` (NestJS)
- http://localhost:3000/api: `api` のAPIドキュメント
- http://localhost:8080: `web` (React)
- http://localhost:6006: `workshop` (Storybook)
- http://localhost:3306: MySql

Prisma Studio を起動すれば, DBに簡単にアクセスできる

```
nps prisma.studio
```

- http://localhost:5555: Prisma Studio
