## 開発の流れ

### 目次

- [Issueを立てる](#issueを立てる)
- [ブランチを切る](#ブランチを切る)
- [コードに変更を加える](#コードに変更を加える)
- [コミット, プッシュする](#コミット-プッシュする)
- [PRを投げる](#prを投げる)
- [PRをレビューしてもらう(する)](#prをレビューしてもらうする)
- [mainにマージする](#mainにマージする)

### Issueを立てる

[リポジトリのIssuesページ](https://github.com/waonpad/miraisozoten/issues)で全てのIssueを確認できる  
**このページでは後述の設定項目によって絞り込みが可能**

課題が見つかる度に, [Issueフォームを利用してIssueを作成していく](https://github.com/waonpad/miraisozoten/issues/new/choose)

#### 作業を割り当てる

Issue作成ページの右側, `Assignees` から作業担当者を割り当てる  
誰が作業するか決まっていなければ, 未選択のまま

#### マイルストーン（期限)を設定する

Issue作成ページの右側, `Milestone` からIssueの期限を設定する

[マイルストーン一覧ページ](https://github.com/waonpad/miraisozoten/milestones)で作業の進捗を確認できる  
既存のマイルストーンとは異なる期限設定が必要であれば, [マイルストーン作成ページ](https://github.com/waonpad/miraisozoten/milestones/new)から作成する

#### ラベルをつける

Issue作成ページの右側, `Labels` からラベルをつける  
Issueフォームから作成した場合最低限のラベルはついているが, 必要ならここで設定

### ブランチを切る

1. `Assignees` に割り当てがある事を確認  
2. `Labels` に `wip` ラベルを付与する(作業中のIssueが一目で分かるようになる)  
3. Issueページの右側, `Development` の `Create a branch` をクリックし, そのまま `Create branch` でブランチを切る
4. ローカルで作業するためのコマンドが表示されるので, ターミナルにコピペする

### コードに変更を加える

ブランチ作成の元となったIssueに関する作業を行う  
付随して変更が必要な場合, 本来の作業ブランチの役割を逸脱しないよう注意

### コミット, プッシュする

💡 `git status` で, 現在の作業ブランチで変更のあったファイル一覧が表示できる

1. `nps g.a` で, 1~n個のファイルを**意味のある纏まりで**選択してステージングする
2. `git cz` で, ステージングされたファイル群に実際にどのような変更があったのかを入力してコミットする
3. **意味のある纏まり**が複数ある場合は, 1と2を繰り返す
4. `git push origin HEAD` で, ローカルの作業をリモートに送信する (このコマンドで, 作業ブランチと同じ名前のリモートにこれまでのコミットが一括で送信される)

💡 `git push origin HEAD` 実行時のログの下から2行目のリンクで, 実際にリモートに変更が反映されている事がわかる

### PRを投げる

`git push origin HEAD` 実行時の下から4行目のリンクで, PRを作成するページに直接飛ぶ

#### 作業内容を記述する

テンプレートに沿って**レビューに必要な**情報を記述していく

#### レビュワーを割り当てる

PR作成ページの右側, `Reviewers` からレビュー担当者を割り当てる  
基本的に作業した領域に一番詳しい人を選択すれば良い  
ここで選択されたユーザーがレビューを行い, 作業内容を承認する

💡 担当者は基本的にPR発行者自身なはずなので, 未選択でいい  
💡 Issueで管理するため, マイルストーンの設定も不要  
💡 ラベルはコミットの内容を元に自動的に付与される

### PRをレビューしてもらう(する)

💡 現在このリポジトリの最低必要レビュー人数は1

レビューをリクエストされるとリポジトリのページでレビューを促す表示が出る  
ブラウザ上でも差分の確認をできるし, ローカルにPRを持ってきて動作させることもできる  
PRページの右上, `<> Code ▼` のボタンからローカルで検証可能  
PRページでレビューのやり取りを行い, 問題が無いことを確認するか, 修正を加える

### mainにマージする

レビューが通ると, mainブランチに作業内容がマージされる  

💡 ブランチを切る際にIssueに付与した `wip` ラベルは, PRが閉じられると自動で削除される　　

Issueを参照して再びブランチを切り, 上述の作業を繰り返していく