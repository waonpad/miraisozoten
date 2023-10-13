import { describe, test, expect } from '@jest/globals';

import { timeoutCallback } from '@/__sample__/evaluation/callback';

describe('コールバックのテスト', () => {
  test('コールバックが呼び出されること', (done) => {
    // 準備
    const expected = 'Hello, World!';
    const callback = (actual: string) => {
      // 検証
      expect(actual).toBe(expected);
      done();
    };

    // 実行
    timeoutCallback(callback);
  });
});
