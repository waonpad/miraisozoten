import { describe, test, expect } from '@jest/globals';

import { promiseFunc } from '@/__sample__/evaluation/async';

describe('非同期処理のテスト', () => {
  test('Promise の処理で resolve されること', () => {
    // 準備
    const expected = 'Hello, World!';

    // 実行&検証, return で返すことで、テストが終了するまで待つ
    return promiseFunc(true).then((actual) => {
      expect(actual).toBe(expected);
    });
  });

  test('Promise の処理で reject されること', () => {
    // 準備
    const expected = 'Error!';

    // 実行&検証, return で返すことで、テストが終了するまで待つ
    return promiseFunc(false).catch((actual) => {
      expect(actual).toBe(expected);
    });
  });

  test('await で resolve されること', async () => {
    // 準備
    const expected = 'Hello, World!';

    // 実行&検証
    await expect(promiseFunc(true)).resolves.toBe(expected);
  });

  test('await で reject されること', async () => {
    // 準備
    const expected = 'Error!';

    // 実行&検証
    await expect(promiseFunc(false)).rejects.toBe(expected);
  });
});
