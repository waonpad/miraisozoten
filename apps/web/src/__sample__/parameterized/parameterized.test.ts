import { describe, test, expect } from '@jest/globals';

describe('Parameterized テストを実行する', () => {
  const animals = [
    { name: 'dog', age: 1, expected: 1 },
    { name: 'cat', age: 2, expected: 2 },
    { name: 'mouse', age: 3, expected: 3 },
  ];

  test.each(animals)('animal の年齢を比較する', ({ age, expected }) => {
    expect(age).toBe(expected);
  });
});
