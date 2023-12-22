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
    <div className="flex">
      <div className="flex items-center justify-center text-center">{gameRanking.rank}</div>
      <div
        /**
         * rankname is custom css class
         */
        className="rankname flex items-center justify-start text-center"
      >
        <div className="overflow-x-auto whitespace-nowrap">{gameRanking.user.name}</div>
      </div>
      <div className="flex items-center justify-center text-center">
        {millisecondsToHms(gameRanking.clearTime)}
      </div>
      <div className="flex items-center justify-center text-center">
        {gameRanking.logs.filter((log) => log.result === 'LOSE').length}
      </div>
    </div>
  );
};
