import { GameResponse } from 'schema/dist/todoufuken/game';

import { millisecondsToHms } from '@/utils/format';

export type InfiniteGameRankingListItemProps = {
  gameRanking: GameResponse & {
    rank: number;
    clearTime: number;
  };
};

export const InfiniteGameRankingListItem = ({ gameRanking }: InfiniteGameRankingListItemProps) => {
  return (
    <div>
      <div>{gameRanking.rank}</div>
      <div>{gameRanking.user.name}</div>
      <div>{millisecondsToHms(gameRanking.clearTime)}</div>
      <div>{gameRanking.logs.filter((log) => log.result === 'LOSE').length}</div>
    </div>
  );
};
