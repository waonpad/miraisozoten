import { PrefectureWithNeighbors } from 'prefecture/dist';

export type GameBattleVSProps = {
  prefecture: PrefectureWithNeighbors;
  opportunity: PrefectureWithNeighbors;
};

export const GameBattleDisplay = ({ prefecture, opportunity }: GameBattleVSProps) => {
  return (
    <>
      <div>{prefecture.name}</div>
      <div>svgを表示</div>
      <div>VS</div>
      <div>{opportunity.name}</div>
      <div>svgを表示</div>
    </>
  );
};
