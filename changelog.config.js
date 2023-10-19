// 設定の引用元
// https://zenn.dev/kalubi/articles/45c3b6ebedc2c4

module.exports = {
  disableEmoji: false,
  format: '{type}{scope}: {emoji}{subject}',
  list: [
    'chore',
    'ci',
    'config',
    'docs',
    'feat',
    'fix',
    'package',
    'perf',
    'refactor',
    'style',
    'test',
  ],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: ['type', 'scope', 'subject'],
  scopes: ['none', 'api', 'web', 'design', 'env', 'config', 'types'],
  types: {
    chore: {
      description: 'ビルド関連や補助ツールの変更',
      emoji: '🤖',
      value: 'chore',
    },
    ci: {
      description: 'CI関連の変更',
      emoji: '🎡',
      value: 'ci',
    },
    config: {
      description: '設定ファイル',
      emoji: '⚙',
      value: 'config',
    },
    docs: {
      description: 'ドキュメントの更新',
      emoji: '✏',
      value: 'docs',
    },
    feat: {
      description: '機能の追加、変更、削除）',
      emoji: '✨',
      value: 'feat',
    },
    fix: {
      description: 'バグ修正',
      emoji: '🐞',
      value: 'fix',
    },
    package: {
      description: '依存関係',
      emoji: '📦',
      value: 'package',
    },
    perf: {
      description: 'パフォーマンス改善',
      emoji: '⚡️',
      value: 'perf',
    },
    refactor: {
      description: 'リファクタリング',
      emoji: '🔨',
      value: 'refactor',
    },
    style: {
      description: 'スタイル調整',
      emoji: '👙',
      value: 'style',
    },
    test: {
      description: 'テストコードの変更',
      emoji: '🧪',
      value: 'test',
    },
  },
  messages: {
    type: 'コミットする内容はどの型ですか:',
    scope: 'コミットが影響するスコープを選んでください:',
    subject: '変更内容を簡潔に書いてください:\n',
  },
};
