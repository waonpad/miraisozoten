import { useRef } from 'react';

import { GameResponse } from 'schema/dist/todoufuken/game';
import { Button } from 'ui/components/ui/button';

import { useInfiniteGames } from '@/pages/(todoufuken)/_/api/get-infinite-games';
import { formatInfiniteData } from '@/utils/format';
import { useIntersectionObserver } from '@/utils/hooks/use-intersection-observer';

import { InfiniteGameRankingListItem } from './game-ranking-list-item';

export type InfiniteGameRankingListProps = {
  filterParams: Omit<
    typeof useInfiniteGames extends (args: { params: infer T }) => unknown ? T : never,
    'state' | 'orderBy' | 'userId'
  >;
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
      orderBy: [
        { column: 'clearTime', sort: 'asc', nulls: 'last' }, // タイムが短い順に並べる
        { column: 'createdAt', sort: 'asc' }, // 作成日が古い順に並べる
      ],
    },
  });

  // NOTICE: 上記の形でリクエストした場合確実にrankとclearTimeが存在する
  const infiniteGames = formatInfiniteData(infiniteinfiniteGamesQuery.data) as (GameResponse & {
    rank: number;
    clearTime: number;
  })[];

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
