import { useEffect, useState } from 'react';

import { GameDifficulty, GameMode } from 'schema/dist/todoufuken/game';

import { Logo } from '@/components/elements/logo';
import { Head } from '@/components/head';
import { useFadeTransition } from '@/components/transitions/fade-transition/use-fade-transition';

import { GameRankingFilter } from './_/components/game-ranking-filter';
import { InfiniteGameRankingListHeader } from './_/components/game-ranking-list-header';
import {
  InfiniteGameRankingList,
  InfiniteGameRankingListProps,
} from './_/components/infinite-game-ranking-list';

const defaultFilterParams = {
  mode: 'NATIONWIDE',
  difficulty: 'NORMAL',
} as const satisfies InfiniteGameRankingListProps['filterParams'];

export default function Page() {
  const [rankingFilterParams, setRankingFilterParams] =
    useState<InfiniteGameRankingListProps['filterParams']>(defaultFilterParams);

  const fadeTransition = useFadeTransition();

  const handleClickGameDifficulty = (difficulty: GameDifficulty) => {
    setRankingFilterParams((prev) => ({ ...prev, difficulty }));
  };

  const handleClickGameMode = (mode: GameMode) => {
    setRankingFilterParams((prev) => ({ ...prev, mode }));
  };

  useEffect(() => {
    if (!fadeTransition.isOpen) {
      fadeTransition.openFade();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head
        title="ランキング"
        description="ゲームのランキングページです。ゲームを速くクリアして高順位を目指そう！"
      />

      <Logo />

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
