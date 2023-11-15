import { useRef } from 'react';

import { Button } from 'ui/components/ui/button';

import { useAuth } from '@/auth/use-auth';
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
    params: { userId: user!.id },
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
            <InfiniteGameArchiveListItem gameArchive={game} />
          </li>
        ))}
      </ul>
      {/* ボタンは不要なので後で消す */}
      <Button ref={loadMoreRef}>Load More</Button>
    </>
  );
};