import { Coord } from '../types';

import { px, pxToNumber } from './format';

export const moveToCurrentSideRangeCoords = ({
  coords,
  currentSideRange,
}: {
  coords: Coord[];
  currentSideRange: number;
}) => {
  const movedCoords = coords.map((coord) => ({
    x: px(pxToNumber(coord.x) + currentSideRange),
    y: coord.y,
  }));

  return movedCoords;
};
