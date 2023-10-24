import { Prefectures } from '../prefectures';

import type { Prefecture, PrefectureWithNeighbors } from '../types';

export const getPrefectureNeighbors = (prefectures: Prefecture[]): PrefectureWithNeighbors[] => {
  return prefectures.map((pref) => ({
    ...pref,
    neighbors: pref.neighbors.map((id) => Prefectures[id]),
  }));
};
