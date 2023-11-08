export type Percent = `${number}%`;
export type Px = `${number}px`;

export type Coord = {
  // x: Px | Percent;
  // y: Px | Percent;
  x: Px;
  y: Px;
};

export type Range<T> = {
  min: T;
  max: T;
};

/**
 * 順番固定
 */
export const Side = ['top', 'right', 'bottom', 'left'] as const;
export type Side = (typeof Side)[number];
