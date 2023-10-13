import { jest, describe, test, expect, afterEach } from '@jest/globals';
import axios from 'axios';
import { SpiedFunction } from 'jest-mock';

import { rand } from '@/__sample__/mock/mock';
import { getUser } from '@/__sample__/mock/outerMock';
import * as spyModule from '@/__sample__/mock/spy';
import { sum } from '@/__sample__/sum';

jest.spyOn(spyModule, 'spyRand');

// 内部モジュールのモック化
jest.mock('@/__sample__/mock/mock');

// 外部モジュールのモック化
jest.mock('axios');

// sum 関数のモック化 // 追加
jest.mock('@/__sample__/sum');

describe('内部モジュールの mock を行う', () => {
  test('モックの戻り値を設定する, パターン1', () => {
    // 準備
    const expected = 1;
    (rand as jest.Mock).mockReturnValue(expected);

    // 実行
    const actual = rand();

    // 検証
    expect(actual).toBe(expected);
  });

  test('モックの戻り値を設定する, パターン2', () => {
    // 準備
    const expected = 1;
    (rand as jest.Mock).mockImplementation(() => expected);

    // 実行
    const actual = rand();

    // 検証
    expect(actual).toBe(expected);
  });

  test('モックで例外をスローする', () => {
    // 準備
    const expected = 'error';
    (rand as jest.Mock).mockImplementation(() => {
      throw new Error('error');
    });

    // 実行
    const actual = () => rand();

    // 検証
    expect(actual).toThrowError(expected);
  });

  test('モックの引数と呼び出し回数を検証する', () => {
    // 準備
    const expected = 3;
    (sum as jest.Mock).mockImplementation(() => expected);

    // 実行
    const actual = sum(1, 2);

    // 検証
    expect(actual).toBe(expected);
    expect(sum).toHaveBeenCalledWith(1, 2); // 引数の検証
    expect(sum).toHaveBeenCalledTimes(1); // 呼び出し回数の検証
    expect((sum as jest.Mock).mock.calls[0]).toEqual([1, 2]); // 1回目呼び出しの引数の検証
    expect((sum as jest.Mock).mock.results).toHaveLength(1); // 全体の呼び出し回数の検証
  });
});

describe('外部モジュールの mock を行う', () => {
  test('モックの戻り値を設定する', async () => {
    // 準備
    (axios as jest.Mocked<typeof axios>).get.mockResolvedValue({
      data: {
        name: 'Taro',
      },
    });

    // 検証
    await expect(getUser('https://example.com')).resolves.toEqual({
      name: 'Taro',
    });
  });

  test('モックで例外をスローする', async () => {
    // 準備
    (axios as jest.Mocked<typeof axios>).get.mockRejectedValue({
      message: 'error',
    });

    // 検証
    await expect(getUser('https://example.com')).rejects.toEqual({
      message: 'error',
    });
  });
});

describe('Spy を使用する', () => {
  let spy: SpiedFunction<() => number>;

  afterEach(() => {
    spy.mockRestore();
  });

  test('Spy を使用する', () => {
    // 準備
    const expected = 1;
    spy = jest.spyOn(spyModule, 'spyRand').mockReturnValue(expected);

    // 実行
    const actual = spyModule.spyRand();

    // 検証
    expect(actual).toBe(expected);
    expect(spy).toHaveBeenCalled();
  });
});
