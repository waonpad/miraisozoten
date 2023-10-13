import { describe, test, expect, beforeAll, beforeEach, afterAll, afterEach } from '@jest/globals';

/**
 * テストの順番
 *
    beforeAll

      beforeEach
      テスト1
      afterEach

      beforeEach
      テスト2
      afterEach

      ネスト beforeAll
        beforeEach
        ネスト beforeEach
        テスト3
        ネスト afterEach
        afterEach

        beforeEach
        ネスト beforeEach
        テスト4
        ネスト afterEach
        afterEach

      ネスト afterAll
    afterAll
 */
describe('テストの順番を確認する', () => {
  beforeAll(() => {
    console.log('beforeAll');
  });

  beforeEach(() => {
    console.log('beforeEach');
  });

  afterAll(() => {
    console.log('afterAll');
  });

  afterEach(() => {
    console.log('afterEach');
  });

  test('テスト1', () => {
    console.log('テスト1');
    expect(true).toBeTruthy();
  });

  test('テスト2', () => {
    console.log('テスト2');
    expect(true).toBeTruthy();
  });

  describe('ネストしたテスト', () => {
    beforeAll(() => {
      console.log('ネスト beforeAll');
    });

    beforeEach(() => {
      console.log('ネスト beforeEach');
    });

    afterAll(() => {
      console.log('ネスト afterAll');
    });

    afterEach(() => {
      console.log('ネスト afterEach');
    });

    test('テスト3', () => {
      console.log('テスト3');
      expect(true).toBeTruthy();
    });

    test('テスト4', () => {
      console.log('テスト4');
      expect(true).toBeTruthy();
    });
  });
});
