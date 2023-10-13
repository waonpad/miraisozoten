## DB : [PlanetScale](https://planetscale.com)

簡単なGUI操作でDBを作成できる  
DB作成時に接続情報を取得できるため, これを, バックのホスティング先の環境変数 `DATABASE_URL` に設定する

### 外部キーをサポートしていない

PlanetScale は外部キーをサポートしていない  
Prismaの場合, 以下のような設定が必要

```prisma:schema.prisma
datasource db {
  ...
  relationMode = "prisma"
}

model Post {
  ...
  userId String

  @@index([userId])
}
```

### ブランチ機能を使わず高速開発

このプロジェクトではまだブランチ機能を簡単に使う手順を実装していないし, スキーマの更新に時間がかかる

**Safe migrations** 機能を無効にすると, mainブランチに直接スキーマをデプロイできる  
Prisma の場合, `DATABASE_URL` に接続情報を設定し, `db push`
