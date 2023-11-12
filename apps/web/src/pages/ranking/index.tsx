import { useState } from 'react';

import { GameDifficulty, GameMode } from 'schema/dist/todoufuken/game';

import { GameRankingFilter } from './_/components/game-ranking-filter';
import { InfiniteGameRankingListHeader } from './_/components/game-ranking-list-header';
import {
  InfiniteGameRankingList,
  InfiniteGameRankingListProps,
} from './_/components/infinite-game-ranking-list';

const defaultFilterParams = {
  modde: 'NATIONWIDE',
  difficulty: 'NORMAL',
} as const satisfies InfiniteGameRankingListProps['filterParams'];

export default function Page() {
  const [rankingFilterParams, setRankingFilterParams] =
    useState<InfiniteGameRankingListProps['filterParams']>(defaultFilterParams);

  const handleClickGameDifficulty = (difficulty: GameDifficulty) => {
    setRankingFilterParams((prev) => ({ ...prev, difficulty }));
  };

  const handleClickGameMode = (mode: GameMode) => {
    setRankingFilterParams((prev) => ({ ...prev, mode }));
  };

  return (
    <>
      <GameRankingFilter
        filterParams={rankingFilterParams}
        handleClickGameDifficulty={handleClickGameDifficulty}
        handleClickGameMode={handleClickGameMode}
      />

      <InfiniteGameRankingListHeader />

      <InfiniteGameRankingList filterParams={rankingFilterParams} />
    </>
  );
}
