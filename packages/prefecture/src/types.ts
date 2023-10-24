import { Areas } from './areas';
import { Prefectures } from './prefectures';

export type PrefectureId = keyof typeof Prefectures;

export type Prefecture = (typeof Prefectures)[PrefectureId];

export type PrefectureWithNeighbors = Omit<Prefecture, 'neighbors'> & {
  neighbors: Prefecture[];
};

export type AreaId = keyof typeof Areas;

export type Area = (typeof Areas)[AreaId];
