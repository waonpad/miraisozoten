import { PrefectureResponse } from 'schema/dist/prefecture';
import { GameResponse } from 'schema/dist/todoufuken/game';
import { Button } from 'ui/components/ui/button';

import NotchedPaperBurlywood from '@/assets/notched-paper-burlywood.png';
import { ImageBgContainer } from '@/components/containers/image-bg-container';
import { PrefectureSVG } from '@/components/maps/prefecture-svg';

export type GameBattleDisplayWithOpponentSelectProps = {
  prefecture: PrefectureResponse;
  neighbors: GameResponse['neighbors'];
  disabled: boolean;
  handleClickSelectOpponent: (opponentId: number) => void;
};

/**
 * @description
 * 選択された見方側の都道府県と、 \
 * ターンの相手となる都道府県を選択するエリアを表示するコンポーネント
 */
export const GameBattleDisplayWithOpponentSelect = ({
  prefecture,
  neighbors,
  disabled,
  handleClickSelectOpponent,
}: GameBattleDisplayWithOpponentSelectProps) => {
  return (
    <>
      <ImageBgContainer imagePath={NotchedPaperBurlywood}>{prefecture.name}</ImageBgContainer>
      <PrefectureSVG prefectureNameEn={prefecture.en} />
      <div>VS</div>
      {/* 相手県を選択するエリア */}
      {/* リストで表示する */}
      {neighbors.map((neighbor) => (
        <Button
          key={neighbor.id}
          onClick={() => handleClickSelectOpponent(neighbor.id)}
          disabled={disabled}
        >
          {neighbor.name}
        </Button>
      ))}
    </>
  );
};
