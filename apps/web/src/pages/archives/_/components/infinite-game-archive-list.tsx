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
    // orderByはスキーマのデフォルト値を使う
    // よろしくない書き方ではあるはずだが、とりあえずこれで動くので妥協
    params: { userId: user!.id, orderBy: undefined as never },
  });

  const infiniteGames = formatInfiniteData(infiniteinfiniteGamesQuery.data);

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
