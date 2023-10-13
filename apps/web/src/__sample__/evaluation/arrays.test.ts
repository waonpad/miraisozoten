import { describe, test, expect } from '@jest/globals';

describe('配列の結果を判定する', () => {
  const animals = ['dog', 'cat', 'mouse'];
  const objectAnimals = [
    { name: 'dog', age: 1 },
    { name: 'cat', age: 2 },
    { name: 'mouse', age: 3 },
  ];

  test('配列が一致する場合は true とする', () => {
    expect(animals).toEqual(animals);
  });

  test('配列を含む場合は true とする', () => {
    expect(animals).toEqual(expect.arrayContaining(['dog', 'cat']));
    expect(animals).toContain('mouse');
  });

  test('配列を含まない場合は true とする', () => {
    expect(animals).not.toEqual(expect.arrayContaining(['snake', 'pig']));
    expect(animals).not.toContain('snake');
  });

  test('オブジェクトの配列を含む場合は true とする', () => {
    expect(objectAnimals).toEqual(
      expect.arrayContaining([
        { name: 'dog', age: 1 },
        { name: 'cat', age: 2 },
      ])
    );
    expect(objectAnimals).toContainEqual({ name: 'dog', age: 1 });
  });

  test('オブジェクトの配列を含まない場合は true とする', () => {
    expect(objectAnimals).toEqual(
      expect.not.arrayContaining([
        { name: 'snake', age: 1 },
        { name: 'pig', age: 2 },
      ])
    );
    expect(objectAnimals).not.toContainEqual({ name: 'snake', age: 3 });
  });
});
