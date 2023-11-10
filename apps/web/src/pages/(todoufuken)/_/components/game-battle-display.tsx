import { PrefectureResponse } from 'schema/dist/prefecture';
import { GameResponse } from 'schema/dist/todoufuken/game';

export type GameBattleVSProps = {
  prefecture: PrefectureResponse;
  opponent: GameResponse['logs'][number]['opponent'];
};

export const GameBattleDisplay = ({ prefecture, opponent }: GameBattleVSProps) => {
  return (
    <>
      <div>{prefecture.name}</div>
      <div>svgを表示</div>
      <div>VS</div>
      <div>{opponent.name}</div>
      <div>svgを表示</div>
    </>
  );
};
