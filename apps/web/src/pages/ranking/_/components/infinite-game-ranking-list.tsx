import { useRef } from 'react';

import { GameDifficulty, GameMode } from 'schema/dist/todoufuken/game';
import { Button } from 'ui/components/ui/button';

import { useInfiniteGames } from '@/pages/(todoufuken)/_/api/get-infinite-games';
import { formatInfiniteData } from '@/utils/format';
import { useIntersectionObserver } from '@/utils/hooks/use-intersection-observer';

import { InfiniteGameRankingListItem } from './game-ranking-list-item';

export type InfiniteGameRankingListProps = {
  filterParams: {
    // TODO: モードが地方制覇の場合、地方idで絞り込めるようにする Issue #182
    modde: GameMode;
    difficulty: GameDifficulty;
  };
};

/**
 * @description
 * 絞りこまれたランキングを無限スクロールで表示するコンポーネント
 */
export const InfiniteGameRankingList = ({ filterParams }: InfiniteGameRankingListProps) => {
  const infiniteinfiniteGamesQuery = useInfiniteGames({
    params: {
      ...filterParams,
      state: 'FINISHED', // ランキングなので、終了しているもののみを取得する
    },
  });

  const infiniteGames = formatInfiniteData(infiniteinfiniteGamesQuery.data);

  const loadMoreRef = useRef<HTMLButtonElement>(null);

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: () => infiniteinfiniteGamesQuery.fetchNextPage(),
    enabled: infiniteinfiniteGamesQuery.hasNextPage,
  });

  return (
    <>
      <ul>
        {infiniteGames.map((game) => (
          <li key={game.id}>
            <InfiniteGameRankingListItem gameRanking={game} />
          </li>
        ))}
      </ul>
      {/* ボタンは不要なので後で消す */}
      <Button ref={loadMoreRef}>Load More</Button>
    </>
  );
};
