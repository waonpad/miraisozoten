import { describe, test, expect } from '@jest/globals';

import { sum } from '@/__sample__/evaluation/error';

describe('エラーのテスト', () => {
  test('引数が負の数の場合、エラーが発生すること', () => {
    // 準備
    const expected = new Error('引数は整数で指定してください');

    // 実行
    const actual = () => sum(-1, 2);

    // 検証
    expect(actual).toThrowError(); // エラーの検証
    expect(actual).toThrowError(Error); // 型の検証
    expect(actual).toThrowError(expected); // メッセージの検証
  });
});
