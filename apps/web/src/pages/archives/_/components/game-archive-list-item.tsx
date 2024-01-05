import { default as dayjs } from 'dayjs';
import { GameResponse } from 'schema/dist/todoufuken/game';

import { LabeledGameDifficulty } from '@/pages/(todoufuken)/_/config/game';
import { Regions } from '@/pages/ranking/_/constants/regions';
import { millisecondsToHms } from '@/utils/format';

export const InfiniteGameArchiveListItem = ({ gameArchive }: { gameArchive: GameResponse }) => {
  return (
    <div className="archdata">
      <p className="archday">{dayjs(gameArchive.createdAt).format('YYYY/MM/DD')}</p>
      <div>
        <div className="archmode">
          <p>
            {gameArchive.mode === 'NATIONWIDE'
              ? '全国制覇'
              : Regions[gameArchive.prefecture.regionId as keyof typeof Regions].name}
          </p>
          <p>{LabeledGameDifficulty[gameArchive.difficulty]}</p>
        </div>
        <div className="archvalue">
          <p>タイム: {gameArchive.clearTime ? millisecondsToHms(gameArchive.clearTime) : '-'}</p>
          <p>ミス数: {gameArchive.logs.filter((log) => log.result === 'LOSE').length}</p>
        </div>
      </div>
    </div>
  );
};
