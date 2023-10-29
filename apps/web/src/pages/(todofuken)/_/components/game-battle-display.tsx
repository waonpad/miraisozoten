import { GameResponse } from 'schema/dist/todofuken/game';

export type GameBattleVSProps = {
  prefecture: GameResponse['prefecture'];
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
