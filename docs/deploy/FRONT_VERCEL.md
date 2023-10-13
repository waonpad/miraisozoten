## フロントエンド : [Vercel](https://vercel.com)

簡単なGUI操作でデプロイできる  
以下のリンクを参照

[Vercelにデプロイしてみよう | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/tutorials/vercel-deploy)

### 環境変数を設定する

以下のパスで設定可能

`https://vercel.com/<チーム名>/<プロジェクト名>/settings/environment-variables`

当然, ローカルの環境変数のままでは動かない  
以下のように設定する

VITE_API_URL: <バックエンドのホスティング先URL>  
VITE_HOST_URL: https://<プロジェクト名>.vercel.app

### OAuth認証が通るようにする

お試しで利用するならローカルで利用していたClient IDをそのまま使えば良い  
以下をそれぞれ追加する

- `Authorized JavaScript origins` に https://<プロジェクト名>.vercel.app
- `Authorized redirect URIs` に https://<プロジェクト名>.vercel.app

### 自動デプロイを止める, 条件をつける

以下のパス, **Ignored Build Step** の項で設定可能

`https://vercel.com/<チーム名>/<プロジェクト名>/settings/git`
