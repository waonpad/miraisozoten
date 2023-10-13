# Turborepo FullStack Starter

## 概要

- ✅ [Turborepo](https://turbo.build/repo/docs)
- ✅ [NestJS](https://docs.nestjs.com)
  - ✅ Prisma
  - ✅ APIドキュメント生成, [Dredd](https://dredd.org/en/latest/)によるテスト
- ✅ [React](https://react.dev)
  - ✅ [Vite](https://ja.vitejs.dev)
  - ✅ [Generouted](https://github.com/oedotme/generouted) ファイルベースルーティング
  - ✅ Tailwind
- ✅ [Storybook](https://storybook.js.org/docs/react/get-started/whats-a-story)
- ✅ jestによるテスト
- ✅ 環境変数バリデーション
- ✅ Git
  - ✅ GitHub Actions (自動テスト)
  - ✅ Issue, PR, Commitメッセージのテンプレート
  - ✅ Git Hooks (自動整形, 自動テスト, 自動インストール)
- ✅ DBをDockerコンテナで利用
- ✅ [Node Package Scripts](https://github.com/sezna/nps#readme) によるコマンド簡潔化

## 中身

### Apps and Packages

- `apps`
  - `api`: [NestJS](https://docs.nestjs.com) のバックエンド
  - `web`: [React](https://react.dev) のフロントエンド
  - `workshop`: [Storybook](https://storybook.js.org/docs/react/get-started/whats-a-story) のUIカタログ
- `packages`
  - `database`: `api`, `web` で使われる, PrismaClientのラッパー
  - `eslint-config-custom`: `.eslintrc.js` で使われる, eslintの設定
  - `stylelint-config`: `.stylelintrc.js` で使われる, stylelintの設定
  - `tailwind-config`: `globals.css`, `postcss.config.js`, `tailwind.config.js` で使われる, tailwindまわりの設定
  - `tsconfig`: `tsconfig.json` で使われる, TypeScriptの設定
  - `ui`: `web`, `workshop` で使われる汎用コンポーネントと, コンポーネント生成

### Utilities

- `.vscode`: チーム開発で環境を素早く合わせるためのあれこれ
- `tool`: こまごましたスクリプト置き場

## ドキュメント一覧

### [セットアップ](./docs/SETUP.md)

### [開発する](./docs/DEV.md)

### [Git操作](./docs/GIT.md)

### [デプロイ](./docs/DEPLOY.md)
