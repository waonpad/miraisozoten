## セットアップ

### 前提条件

yarn, nps, Dredd, [git-cz](https://www.npmjs.com/package//git-cz) をインストール

```
npm i -g yarn nps dredd git-cz
```

💡 Docker, Docker Compose のインストールを確認

### 準備する

#### ワークスペースを作る

ローカルにクローン

```
git clone <リポジトリURL>.git
```

💡 クローンしたら, `.vscode` による設定共有を行うため, フォルダをVSCodeのワークスペースとして開く

---

以下のコマンドで,

- (`.env.*example`)を全てコピーし, 設定可能にする
- パッケージのインストール
- DBコンテナの起動と初回マイグレーション

が実行される

```
nps prepare
```

#### OAuth認証の準備

Google CloudでOAuth認証をセットアップする

1. [ココ](https://console.cloud.google.com/apis/credentials)にアクセス
2. `+ CREATE CREDENTIALS` をクリック
3. `OAuth client ID` を選択
4. `Application type` に `Web application` を選択
5. `Authorized JavaScript origins` に `http://localhost:8080`, `http://localhost` を追加
6. `Authorized redirect URIs` に `http://localhost:8080`, `http://localhost` を追加
7. `CREATE` をクリックし, 作成が完了するとClient IDとClient secretが表示される
8. Client ID を `<rootDir>/apps/web/.env` の対応する行に設定
