import { describe, test, expect } from '@jest/globals';

describe('オブジェクトで結果を判定する', () => {
  const user = {
    id: 1,
    name: 'Taro',
    email: 'email@example.com',
    address: {
      prefecture: 'Tokyo',
      city: 'Shinjuku',
    },
  };

  test('オブジェクトが一致する場合は true とする', () => {
    expect(user).toEqual(user);
  });

  test('プロパティが一致するか判定する', () => {
    expect(user).toHaveProperty('id', 1);
  });

  test('プロパティが一致しない判定する', () => {
    expect(user).not.toHaveProperty('id', 2);
  });

  test('ネストしたプロパティが一致するか判定する', () => {
    expect(user).toHaveProperty('address.prefecture', 'Tokyo');
  });

  test('ネストしたプロパティが一致しないか判定する', () => {
    expect(user).not.toHaveProperty('address.prefecture', 'Chiba');
  });

  test('複数プロパティが一致するか判定する', () => {
    expect(user).toEqual(
      expect.objectContaining({
        id: 1,
        address: {
          prefecture: 'Tokyo',
          city: 'Shinjuku',
        },
      })
    );
  });
});
