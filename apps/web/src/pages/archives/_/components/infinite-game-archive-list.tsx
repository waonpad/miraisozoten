import { useRef } from 'react';

import { Button } from 'ui/components/ui/button';

import { useAuth } from '@/auth/use-auth';
import { env } from '@/constants/env';
import { useInfiniteGames } from '@/pages/(todoufuken)/_/api/get-infinite-games';
import { formatInfiniteData } from '@/utils/format';
import { useIntersectionObserver } from '@/utils/hooks/use-intersection-observer';

import { InfiniteGameArchiveListItem } from './game-archive-list-item';

/**
 * @description
 * 自分のゲーム成績を無限スクロールで表示するコンポーネント
 */
export const InfiniteGameArchiveList = () => {
  const { user } = useAuth();

  const infiniteinfiniteGamesQuery = useInfiniteGames({
    // orderByはスキーマのデフォルト値を使う
    // よろしくない書き方ではあるはずだが、とりあえずこれで動くので妥協
    params: { userId: user!.id, orderBy: undefined as never },
  });

  const infiniteGames =
    env.VITE_GAKUNAI_SHINSA === 'true'
      ? GakunaiShinsaGameArchives
      : formatInfiniteData(infiniteinfiniteGamesQuery.data);

  console.log(infiniteGames);

  const loadMoreRef = useRef<HTMLButtonElement>(null);

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: () => infiniteinfiniteGamesQuery.fetchNextPage(),
    enabled: infiniteinfiniteGamesQuery.hasNextPage,
  });

  return (
    <>
      <div
        /**
         * archwrap is custom class
         */
        className="archwrap"
      >
        {infiniteGames.map((game) => (
          <InfiniteGameArchiveListItem
            /**
             * TODO: あとで消す
             * 発表用のダミーデータ(必要な部分だけを作成)を使うので、ts-ignoreする
             */
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            gameArchive={game}
            key={game.id}
          />
        ))}
      </div>
      <Button className="invisible" ref={loadMoreRef}>
        Load More
      </Button>
    </>
  );
};

const GakunaiShinsaGameArchives = [
  {
    id: '1',
    mode: 'NATIONWIDE',
    difficulty: 'NORMAL',
    clearTime: 4500000,
    logs: [{ result: 'LOSE' }, { result: 'LOSE' }],
  },
  {
    id: '2',
    mode: 'NATIONWIDE',
    difficulty: 'EASY',
    clearTime: 2700120,
    logs: [{ result: 'LOSE' }, { result: 'LOSE' }, { result: 'LOSE' }, { result: 'LOSE' }],
  },
  {
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
    id: '4',
    mode: 'NATIONWIDE',
    difficulty: 'HARD',
    clearTime: 5500056,
    logs: [],
  },
  {
    id: '5',
    mode: 'NATIONWIDE',
    difficulty: 'NORMAL',
    clearTime: 4556789,
    logs: [{ result: 'LOSE' }, { result: 'LOSE' }, { result: 'LOSE' }],
  },
  {
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
    id: '11',
    mode: 'NATIONWIDE',
    difficulty: 'NORMAL',
    clearTime: 5188491,
    logs: [{ result: 'LOSE' }, { result: 'LOSE' }],
  },
  {
    id: '12',
    mode: 'REGIONAL',
    prefecture: {
      regionId: 4,
    },
    difficulty: 'NORMAL',
    clearTime: null,
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
    id: '13',
    mode: 'NATIONWIDE',
    difficulty: 'NORMAL',
    clearTime: 9528831,
    logs: [{ result: 'LOSE' }],
  },
];
