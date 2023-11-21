import { PrefectureResponse } from 'schema/dist/prefecture';
import { GameResponse } from 'schema/dist/todoufuken/game';

import { PrefectureSVG } from '@/components/maps/prefecture-svg';

export type GameBattleVSProps = {
  prefecture: PrefectureResponse;
  opponent: GameResponse['logs'][number]['opponent'];
};

/**
 * @description
 * 自分側の都道府県と、対戦相手の都道府県を表示するコンポーネント
 */
export const GameBattleDisplay = ({ prefecture, opponent }: GameBattleVSProps) => {
  return (
    <>
      <div>{prefecture.name}</div>
      <PrefectureSVG prefectureNameEn={prefecture.en} />
      <div>VS</div>
      <div>{opponent.name}</div>
      <PrefectureSVG prefectureNameEn={opponent.en} />
    </>
  );
};
