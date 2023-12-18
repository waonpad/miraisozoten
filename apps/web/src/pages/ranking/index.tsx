import { useState } from 'react';

import { GameDifficulty } from 'schema/dist/todoufuken/game';

import { Logo } from '@/components/elements/logo';
import { Head } from '@/components/head';

import { GameRankingFilter } from './_/components/game-ranking-filter';
import { InfiniteGameRankingListHeader } from './_/components/game-ranking-list-header';
import { InfiniteGameRankingListProps } from './_/components/infinite-game-ranking-list';
import './_/css/ranking.css'; // css読み込み

const defaultFilterParams = {
  mode: 'NATIONWIDE',
  difficulty: 'NORMAL',
} as const satisfies InfiniteGameRankingListProps['filterParams'];

export default function Page() {
  const [rankingFilterParams, setRankingFilterParams] =
    useState<InfiniteGameRankingListProps['filterParams']>(defaultFilterParams);

  const handleClickGameDifficulty = (difficulty: GameDifficulty) => {
    setRankingFilterParams((prev) => ({ ...prev, difficulty }));
  };

  const handleClickGameMode = (mode: 'NATIONWIDE' | `REGIONAL-${number}`) => {
    setRankingFilterParams((prev) => ({ ...prev, mode }));
  };

  return (
    <>
      <Head
        title="ランキング"
        description="ゲームのランキングページです。ゲームを速くクリアして高順位を目指そう！"
      />

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

          {/* 表題に対するデータ表示領域 */}
          <div className="rankdata">
            <div>
              <div>1位</div>
              <div className="rankname">
                <div>
                  ※名前長い人用スクロール表示可能。長い名前は好きじゃないしHAL SHINE長スンギ
                </div>
              </div>
              <div>99:59:59</div>
              <div>46</div>
            </div>

            <div>
              <div>2位</div>
              <div className="rankname">
                <div>※名前</div>
              </div>
              <div>※タイム</div>
              <div>※ミス数</div>
            </div>

            <div>
              <div>3位</div>
              <div className="rankname">
                <div>※名前</div>
              </div>
              <div>※タイム</div>
              <div>※ミス数</div>
            </div>

            <div>
              <div>4位</div>
              <div className="rankname">
                <div>※名前</div>
              </div>
              <div>※タイム</div>
              <div>※ミス数</div>
            </div>

            <div>
              <div>5位</div>
              <div className="rankname">
                <div>※名前</div>
              </div>
              <div>※タイム</div>
              <div>※ミス数</div>
            </div>

            <div>
              <div>6位</div>
              <div className="rankname">
                <div>※名前</div>
              </div>
              <div>※タイム</div>
              <div>※ミス数</div>
            </div>

            <div>
              <div>7位</div>
              <div className="rankname">
                <div>※名前</div>
              </div>
              <div>※タイム</div>
              <div>※ミス数</div>
            </div>

            <div>
              <div>8位</div>
              <div className="rankname">
                <div>※名前</div>
              </div>
              <div>※タイム</div>
              <div>※ミス数</div>
            </div>

            <div>
              <div>9位</div>
              <div className="rankname">
                <div>※名前</div>
              </div>
              <div>※タイム</div>
              <div>※ミス数</div>
            </div>

            <div>
              <div>10位</div>
              <div className="rankname">
                <div>※名前</div>
              </div>
              <div>※タイム</div>
              <div>※ミス数</div>
            </div>
          </div>
        </div>
      </div>

      {/* <InfiniteGameRankingList filterParams={rankingFilterParams} /> */}
    </>
  );
}
