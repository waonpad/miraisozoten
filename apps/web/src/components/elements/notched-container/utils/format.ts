import { Percent, Px } from '../types';

export const pxToNumber = (px: Px): number => {
  return Number(px.replace('px', ''));
};

export const percentToNumber = (percent: Percent): number => {
  return Number(percent.replace('%', ''));
};

export const pxOrPercentToNumber = (pxOrPercent: Px | Percent): number => {
  if (pxOrPercent.includes('px')) {
    return pxToNumber(pxOrPercent as Px);
  }
  return percentToNumber(pxOrPercent as Percent);
};

export const px = (num: number): Px => {
  return `${num}px`;
};

export const percent = (num: number): Percent => {
  return `${num}%`;
};
