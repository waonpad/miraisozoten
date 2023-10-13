export const sum = (a: number, b: number) => {
  if (a < 0 || b < 0) {
    throw new Error('引数は整数で指定してください');
  }
  return a + b;
};
