## バックエンド : [Cloud Run](https://cloud.google.com/run?hl=ja)

### 当プロジェクトの想定しているデプロイプロセス

1. 機密情報をSecret Managerで管理
2. ローカルでDockerイメージをビルド
3. レジストリにDockerイメージをアップロード
4. デプロイ

### 詳細な手順

💡 出来るだけミニマルな構成でデプロイするため, 以下の手順では要件を満たせない可能性がある

#### gcloud CLI をインストールする

以下のリンクを参照

[gcloud CLI をインストールする  |  Google Cloud CLI のドキュメント](https://cloud.google.com/sdk/docs/install?hl=ja)

#### gcloud CLI で認証

```
nps gc.auth
```

#### プロジェクトを作成 (既にあればそれを使っても良い)

`<rootDir>/.env` の `GC_PROJECT_ID` を確認してから

```
nps gc.project.create
nps gc.project.set
```

#### 請求先アカウントを設定

`<rootDir>/.env` の `GC_BILLING_ACCOUNT_ID` を確認してから

```
nps billing.link
```

#### Secret Manager に機密情報をアップロード

`<rootDir>/.env` の `GC_SERVICE_ACCOUNT`, `GC_SECRET_` プレフィックスのついた変数を確認してから

```
nps gx.secret.enable
nps gc.secret.role.add
nps gc.secret.deploy
```

`nps gc.secret.deploy` コマンドは, `GC_SECRET_` プレフィックスのついた変数を全て 作成/更新 する

#### Dockerイメージをレジストリにアップロード

`<rootDir>/.env` の `GC_GOOGLE_ACCOUNT`, `GC_DOCKER_IMAGE` を確認してから

```
nps gc.docker.auth
nps gc.docker.enable
nps gc.docker.role.add
nps docker.build.api
nps gc.docker.tag
nps gc.docker.push
```

#### Cloud Run にデプロイ

`<rootDir>/.env` の `GC_RUN_ENV_` プレフィックスのついた変数を確認してから

```
nps gc.run.role.add
nps gc.run.deploy
```

💡 デフォルト構成では, このタイミングでホスティング先DBのスキーマが更新される

#### アクセスする

`https://console.cloud.google.com/run/detail/asia-northeast1/<GC_RUN_SERVICEの値>/metrics?project=<GC_PROJECT_IDの値>`

管理画面が表示される
