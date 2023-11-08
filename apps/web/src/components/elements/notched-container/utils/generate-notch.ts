import { Coord, Px } from '../types';

import { px, pxToNumber } from './format';

type Notch = [Coord, Coord, Coord];

export const generateNotch = ({ width, depth }: { width: Px; depth: Px }): Notch => {
  return [
    { x: `0px`, y: `0px` },
    { x: px(pxToNumber(width) / 2), y: depth },
    { x: width, y: `0px` },
  ];
};
