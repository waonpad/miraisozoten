import { Coord } from '../types';

export const generatePolygonCoords = (coords: Coord[]): `polygon(${string})` => {
  return `polygon(${coords.map((coord) => `${coord.x} ${coord.y}`).join(', ')})`;
};

// NOTICE: 要素数が最低限必要な数なくても実行できてしまう
