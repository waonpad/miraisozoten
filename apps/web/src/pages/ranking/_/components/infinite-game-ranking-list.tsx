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
    'state' | 'orderBy' | 'userId' | 'mode' | 'regionId'
  > & {
    mode: 'NATIONWIDE' | `REGIONAL-${number}`;
  };
};

/**
 * @description
 * 絞りこまれたランキングを無限スクロールで表示するコンポーネント
 */
export const InfiniteGameRankingList = ({ filterParams }: InfiniteGameRankingListProps) => {
  const modeAndRegionId = (() => {
    if (filterParams.mode === 'NATIONWIDE') {
      return { mode: filterParams.mode };
    }

    return {
      mode: 'REGIONAL',
      regionId: Number(filterParams.mode.split('-')[1]),
    } as const;
  })();

  const infiniteinfiniteGamesQuery = useInfiniteGames({
    params: {
      ...filterParams,
      ...modeAndRegionId,
      state: 'FINISHED', // ランキングなので、終了しているもののみを取得する
      orderBy: [
        { column: 'clearTime', sort: 'asc', nulls: 'last' }, // タイムが短い順に並べる
        { column: 'createdAt', sort: 'asc' }, // 作成日が古い順に並べる
      ],
    },
    config: {
      suspense: false, // suspenseをtrueにするとフィルターを変更したときに毎回ローディングが表示されるのでfalseにする
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
    <div
      /**
       * rankdata is custom css class
       */
      className="rankdata bg-white/70"
    >
      {infiniteGames.map((game) => (
        <InfiniteGameRankingListItem gameRanking={game} key={game.id} />
      ))}
      {/* ボタンは見えているひつようが無いので非表示にしてトリガーのみ動くようにする */}
      <Button className="invisible" ref={loadMoreRef}>
        Load More
      </Button>
    </div>
  );
};
