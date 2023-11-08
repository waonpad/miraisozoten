import { Coord, Side } from '../types';
import { px, pxToNumber } from '../utils/format';

export const rotationCoords = ({
  coords,
  side,
  sideRange,
  verticalSideRange,
  toTop,
}: {
  coords: (Coord & { [key: string]: unknown })[];
  side: Side;
  sideRange: number;
  verticalSideRange: number;
  toTop?: boolean;
}): (Coord & { [key: string]: unknown })[] => {
  if (side === 'top') {
    return coords;
  }

  if (toTop) {
    const result = coords.map((coord) => {
      if (side === 'right') {
        return {
          ...coord,
          x: coord.y,
          y: px(verticalSideRange - pxToNumber(coord.x)),
        };
      }
      if (side === 'bottom') {
        return {
          ...coord,
          x: px(sideRange - pxToNumber(coord.x)),
          y: px(verticalSideRange - pxToNumber(coord.y)),
        };
      }
      if (side === 'left') {
        return {
          ...coord,
          x: px(sideRange - pxToNumber(coord.y)),
          y: coord.x,
        };
      }
    }) as (Coord & { [key: string]: unknown })[];

    return result;
  } else {
    const result = coords.map((coord) => {
      if (side === 'right') {
        return {
          ...coord,
          x: px(verticalSideRange - pxToNumber(coord.y)),
          y: coord.x,
        };
      }
      if (side === 'bottom') {
        return {
          ...coord,
          x: px(sideRange - pxToNumber(coord.x)),
          y: px(verticalSideRange - pxToNumber(coord.y)),
        };
      }
      if (side === 'left') {
        return {
          ...coord,
          x: coord.y,
          y: px(sideRange - pxToNumber(coord.x)),
        };
      }
    }) as (Coord & { [key: string]: unknown })[];

    return result;
  }
};
