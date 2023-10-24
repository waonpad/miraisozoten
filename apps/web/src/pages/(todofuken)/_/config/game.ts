import { PrefectureWithNeighbors, Area } from 'prefecture/dist';

import { GameDifficulty } from './game-difficulty';
import { GameMode } from './game-mode';
import { GameState } from './game-stete';

// 地方ごとのモードの場合、隣接県をその範囲だけで取得する必要がある

export type Game = {
  prefecture: PrefectureWithNeighbors | null;
  conqueredPrefectures: PrefectureWithNeighbors[];
  neighboringPrefectures: PrefectureWithNeighbors[];
  state: GameState;
  difficulty: GameDifficulty | null;
  mode: GameMode | null;
  area: Area | null;
  hideData: boolean;
};
