## Git操作

### 楽に ステージング (git add) する

以下のコマンドで, パスを入力せず対話形式でステージングできる

```
nps g.a
```

### 正確にコミットメッセージを作る

以下のコマンドで, [Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/#%E6%A6%82%E8%A6%81) に則り, プロジェクトで統一されたコミットメッセージを作成できる

```
git cz
```

### 依存関係の更新し忘れで困らない

`post-merge`, `post-checkout` Hookにより, 依存関係の更新が見つかると自動でインストールされる

### エイリアスでストレスフリーなCLI体験

Windows: C:/Users/(ユーザー名)/.gitconfig  
Mac: ~/.gitconfig

このファイルを編集することでエイリアスを設定できる
