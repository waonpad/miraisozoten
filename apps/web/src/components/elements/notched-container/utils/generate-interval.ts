import { Coord, Px } from '../types';

type Interval = [Coord, Coord];

// 冗長だが、線分を定義する
export const generateInterval = ({ width }: { width: Px }): Interval => {
  return [
    { x: `0px`, y: `0px` },
    { x: width, y: `0px` },
  ];
};
