import { GameMode } from 'database';
import { GameDifficulty } from 'schema/dist/todoufuken/game';

import { InfiniteGameRankingListProps } from './infinite-game-ranking-list';

// TODO: モードが地方制覇の場合、地方idで絞り込めるようにする Issue #182
export type GameRankingFilterProps = {
  filterParams: InfiniteGameRankingListProps['filterParams'];
  handleClickGameDifficulty: (difficulty: GameDifficulty) => void;
  handleClickGameMode: (mode: GameMode) => void;
};

export const GameRankingFilter = ({}: GameRankingFilterProps) => {
  // 中身は後で書く
  return <></>;
};
