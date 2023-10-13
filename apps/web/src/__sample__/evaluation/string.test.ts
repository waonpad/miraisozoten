import { describe, test, expect } from '@jest/globals';

describe('文字列で結果を判定する', () => {
  const log1 = '10.144.33.211 - - [01/Aug/2023:12:34:56 +0900] "GET /index.html HTTP/1.1" 200 4523';
  const log2 =
    '10.52.36.125 - - [01/Aug/2023:12:35:01 +0900] "GET /images/logo.png HTTP/1.1" 200 12345';
  const log3 = '172.20.45.78 - - [01/Aug/2023:12:35:05 +0900] "POST /login.php HTTP/1.1" 302 5';

  test('文字列が一致する場合は true とする', () => {
    expect(log1).toEqual(log1);
  });

  test('文字列を含む場合は true とする', () => {
    expect(log1).toEqual(expect.stringContaining('10.144.33.211'));
    expect(log2).toContain('10.52.36.125');
  });

  test('文字列を含まない場合は true とする', () => {
    expect(log1).toEqual(expect.not.stringContaining('10.144.33.xxx'));
    expect(log2).not.toContain('10.52.36.xxx');
  });

  test('正規表現に一致する場合は true とする', () => {
    const regex = /10\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
    expect(log1).toMatch(regex);
  });

  test('正規表現に一致しない場合は true とする', () => {
    const regex = /10\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
    expect(log3).not.toMatch(regex);
  });
});
