import { Percent } from '../types';

import { percentToNumber, percent } from './format';

export const calculateInterval = (interval: Percent, large: number, small: number) => {
  const intervalPxOfLarge = (percentToNumber(interval) * large) / 100;
  return percent((intervalPxOfLarge * 100) / small);
};
