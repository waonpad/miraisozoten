import { useEffect, useState } from 'react';

import { GameDifficulty } from 'schema/dist/todoufuken/game';

import { Logo } from '@/components/elements/logo';
import { SoundToggleIconButton } from '@/components/elements/sound-toggle-icon-button';
import { Head } from '@/components/head';
import { useFadeTransition } from '@/components/transitions/fade-transition/use-fade-transition';

import { GameRankingFilter } from './_/components/game-ranking-filter';
import { InfiniteGameRankingListHeader } from './_/components/game-ranking-list-header';
import {
  InfiniteGameRankingList,
  InfiniteGameRankingListProps,
} from './_/components/infinite-game-ranking-list';

import './_/css/ranking.css'; // css読み込み

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

  const handleClickGameMode = (mode: 'NATIONWIDE' | `REGIONAL-${number}`) => {
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

      <div className="p-2 lg:p-4">
        <div className="pagetitle">
          <Logo />
          <p>ランキング</p>
        </div>

        <div className="rankwrap">
          <GameRankingFilter
            filterParams={rankingFilterParams}
            handleClickGameDifficulty={handleClickGameDifficulty}
            handleClickGameMode={handleClickGameMode}
          />
          <div>
            <InfiniteGameRankingListHeader />

            <InfiniteGameRankingList filterParams={rankingFilterParams} />
          </div>
        </div>
      </div>

      <SoundToggleIconButton className="absolute right-2 top-2" />
    </>
  );
}
