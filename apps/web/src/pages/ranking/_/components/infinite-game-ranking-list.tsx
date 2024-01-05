import { useRef } from 'react';

import { GameResponse } from 'schema/dist/todoufuken/game';
import { Button } from 'ui/components/ui/button';

import { env } from '@/constants/env';
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
  const infiniteGames = env.VITE_GAKUNAI_SHINSA
    ? GakunaiShinsaGameRankings
    : (formatInfiniteData(infiniteinfiniteGamesQuery.data) as (GameResponse & {
        rank: number;
        clearTime: number;
      })[]);

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
        <InfiniteGameRankingListItem
          /**
           * TODO: あとで消す
           * 発表用のダミーデータ(必要な部分だけを作成)を使うので、ts-ignoreする
           */
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          gameRanking={game}
          key={game.id}
        />
      ))}
      {/* ボタンは見えているひつようが無いので非表示にしてトリガーのみ動くようにする */}
      <Button className="invisible" ref={loadMoreRef}>
        Load More
      </Button>
    </div>
  );
};

const GakunaiShinsaGameRankings = [
  {
    rank: 1,
    user: {
      name: 'ゲスト',
    },
    id: '1',
    mode: 'NATIONWIDE',
    difficulty: 'NORMAL',
    clearTime: 4500000,
    logs: [{ result: 'LOSE' }, { result: 'LOSE' }],
  },
  {
    rank: 2,
    user: {
      name: 'ゲスト',
    },
    id: '2',
    mode: 'NATIONWIDE',
    difficulty: 'EASY',
    clearTime: 2700120,
    logs: [{ result: 'LOSE' }, { result: 'LOSE' }, { result: 'LOSE' }, { result: 'LOSE' }],
  },
  {
    rank: 3,
    user: {
      name: 'HAL 太郎',
    },
    id: '3',
    mode: 'REGIONAL',
    prefecture: {
      regionId: 1,
    },
    difficulty: 'NORMAL',
    clearTime: 151234,
    logs: [{ result: 'LOSE' }],
  },
  {
    rank: 4,
    user: {
      name: '名古屋 太郎',
    },
    id: '4',
    mode: 'NATIONWIDE',
    difficulty: 'HARD',
    clearTime: 5500056,
    logs: [],
  },
  {
    rank: 5,
    user: {
      name: 'HAL 花子',
    },
    id: '5',
    mode: 'NATIONWIDE',
    difficulty: 'NORMAL',
    clearTime: 4556789,
    logs: [{ result: 'LOSE' }, { result: 'LOSE' }, { result: 'LOSE' }],
  },
  {
    rank: 6,
    user: {
      name: '名古屋 花子',
    },
    id: '6',
    mode: 'NATIONWIDE',
    difficulty: 'VERY_HARD',
    clearTime: 7891011,
    logs: [
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
    ],
  },
  {
    rank: 7,
    user: {
      name: 'ゲスト',
    },
    id: '7',
    mode: 'REGIONAL',
    prefecture: {
      regionId: 4,
    },
    difficulty: 'NORMAL',
    clearTime: 3904173,
    logs: [{ result: 'LOSE' }, { result: 'LOSE' }, { result: 'LOSE' }],
  },
  {
    rank: 8,
    user: {
      name: 'ゲスト',
    },
    id: '8',
    mode: 'REGIONAL',
    prefecture: {
      regionId: 4,
    },
    difficulty: 'NORMAL',
    clearTime: 3904173,
    logs: [{ result: 'LOSE' }, { result: 'LOSE' }, { result: 'LOSE' }],
  },
  {
    rank: 9,
    user: {
      name: 'React 太郎',
    },
    id: '9',
    mode: 'REGIONAL',
    prefecture: {
      regionId: 6,
    },
    difficulty: 'HARD',
    clearTime: 2345678,
    logs: [
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
    ],
  },
  {
    rank: 10,
    user: {
      name: 'NestJS 花子',
    },
    id: '10',
    mode: 'REGIONAL',
    prefecture: {
      regionId: 2,
    },
    difficulty: 'EASY',
    clearTime: 7854791,
    logs: [],
  },
  {
    rank: 11,
    user: {
      name: 'ゲスト',
    },
    id: '11',
    mode: 'NATIONWIDE',
    difficulty: 'NORMAL',
    clearTime: 5188491,
    logs: [{ result: 'LOSE' }, { result: 'LOSE' }],
  },
  {
    rank: 12,
    user: {
      name: 'John GitHub',
    },
    id: '12',
    mode: 'REGIONAL',
    prefecture: {
      regionId: 4,
    },
    difficulty: 'NORMAL',
    clearTime: 9528831,
    logs: [
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
      { result: 'LOSE' },
    ],
  },
  {
    rank: 13,
    user: {
      name: 'VS Code',
    },
    id: '13',
    mode: 'NATIONWIDE',
    difficulty: 'NORMAL',
    clearTime: 9528831,
    logs: [{ result: 'LOSE' }],
  },
];
