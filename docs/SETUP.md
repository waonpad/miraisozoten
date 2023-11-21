## セットアップ

### 前提条件

yarn, nps, Dredd, [git-cz](https://www.npmjs.com/package//git-cz), firebase-tools をインストール

```
npm i -g yarn nps dredd git-cz firebase-tools
```

firebase CLI でログイン

```
firebase login
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

Docker アプリの起動を確認し, 以下のコマンドで,

- (`.env.*example`)を全てコピーし, 設定可能にする
- パッケージのインストール
- DBコンテナの起動と初回マイグレーション
- 内部パッケージのビルド
- Firebase Emulator の初期化

が実行される

```
nps prepare
```

#### Firebase認証の準備

1. [ココ](https://console.firebase.google.com/u/0/)にアクセス
2. `プロジェクトを追加` をクリックして, 適当なプロジェクト名をつけてそのまま画面の通りに手順を進め, プロジェクトを作成
3. 作成が完了したら, `続行` をクリックして, プロジェクトのページへ
4. 左側のドロワーの `構築` 内の `Authentication` をクリック, `始める`
5. ログインプロバイダ一覧から, `Google` を選択, `有効にする` をクリックして, 公開名とサポートメールを設定して, `保存`
6. `新しいプロバイダを追加` をクリックして, `匿名` をクリック, `有効にする` をクリックして, `保存`
7. 左側のドロワーの `プロジェクトの概要` 右側の歯車マークをクリックして, `プロジェクトの設定` をクリック
8. `マイアプリ` の `</>` をクリックし, アプリのニックネームをつけて, `登録`, 表示されたコンフィグの, `apiKey`, `authDomain`, `projectId`, `appId` を, apps/web/.env の該当環境変数にそれぞれ設定  
   `apiKey` を, apps/api/.env.test.local の該当環境変数に設定
9. `サービス アカウント` をクリックしてタブを切り替え, `新しい秘密鍵を作成` をクリック (jsonがダウンロードされる)
10. ダウンロードされたjsonを開き, `project_id`, `private_key`, `client_email` を, apps/api/.env の該当環境変数にそれぞれ設定
