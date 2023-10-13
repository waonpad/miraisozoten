import { describe, test, expect } from '@jest/globals';

import { sum, sumItemsCount, Item } from '@/__sample__/evaluation/equals';

describe('Jest のイコール比較', () => {
  test('プリミティブ型の比較', () => {
    // 準備
    const expected = 3;

    // 実行
    const actual = sum(1, 2);

    // 検証
    expect(actual).toBe(expected);
  });

  test('オブジェクトの比較', () => {
    // 準備
    const keyborad: Item = {
      name: 'keyboard',
      count: 1,
    };
    const mouse: Item = {
      name: 'mouse',
      count: 2,
    };
    const expected: Item = {
      name: 'keyboard,mouse',
      count: 3,
    };

    // 実行
    const actual = sumItemsCount(keyborad, mouse);

    // 検証
    expect(actual).toEqual(expected);
  });
});
