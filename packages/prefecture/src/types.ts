import { Areas } from './areas';
import { Prefectures } from './prefectures';

export type Prefecture = (typeof Prefectures)[keyof typeof Prefectures];

export type PrefectureWithNeighbors = Omit<Prefecture, 'neighbors'> & {
  neighbors: Prefecture[];
};

export type Area = (typeof Areas)[keyof typeof Areas];
