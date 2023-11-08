export const generateRandomBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// NOTICE: minがmaxより大きくても実行できてしまう
