## デプロイ

以下構成であれば, スケールするまでほぼコストがかからない  
バックエンドはDBのホスティング先情報, フロントエンドはバックエンドのそれが必要なため, 上から順にやると良い

### [DB : PlanetScale](./deploy/DB_PLANET_SCALE.md)

### [バックエンド : Cloud Run](./deploy/BACK_CLOUD_RUN.md)

### [フロントエンド : Vercel](./deploy/FRONT_VERCEL.md)
