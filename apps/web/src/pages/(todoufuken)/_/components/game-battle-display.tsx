import { PrefectureResponse } from 'schema/dist/prefecture';
import { GameResponse } from 'schema/dist/todoufuken/game';

import NotchedPaperBurlywood from '@/assets/notched-paper-burlywood.png';
import { ImageBgContainer } from '@/components/containers/image-bg-container';
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
      <div>
        <div>
          <ImageBgContainer imagePath={NotchedPaperBurlywood}>{prefecture.name}</ImageBgContainer>
          <PrefectureSVG prefectureNameEn={prefecture.en} />
        </div>

        <div>VS</div>

        <div>
          <ImageBgContainer imagePath={NotchedPaperBurlywood}>{opponent.name}</ImageBgContainer>
          <PrefectureSVG prefectureNameEn={opponent.en} />
        </div>
      </div>
    </>
  );
};
