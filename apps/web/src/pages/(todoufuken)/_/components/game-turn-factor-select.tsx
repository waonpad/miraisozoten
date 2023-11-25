import { PrefectureStatsName } from 'schema/dist/prefecture/stats';

import NotchedPaperOrange from '@/assets/notched-paper-orange.png';
import { ImageBgButton } from '@/components/elements/image-bg-button';
import { assert } from '@/utils/asset';

import { useGame } from '../hooks/use-game';
import { getAllFactors } from '../utils/gat-all-factors';

export type GameTurnFactorSelectProps = {
  factors: ReturnType<typeof getAllFactors>;
  handleClickSelectFactor: (factor: ReturnType<typeof getAllFactors>[number]) => void;
  selectedFactorName?: PrefectureStatsName;
};

/**
 * @description
 * ターンに使用する統計データ一覧を表示するコンポーネント \
 * ゲームの難易度によって、データの中身を表示するかを分岐している
 */
export const GameTurnFactorSelect = ({
  factors,
  selectedFactorName,
  handleClickSelectFactor,
}: GameTurnFactorSelectProps) => {
  const { game } = useGame();
  assert(game);

  return (
    <div>
      {factors.map((factor, index) => (
        <ImageBgButton
          imagePath={NotchedPaperOrange}
          active={factor.name === selectedFactorName}
          key={index}
          onClick={() => handleClickSelectFactor(factor)}
        >
          {/* {factor.prefecture.name} */}
          {factor.label}
          {!game.hideData ? factor.totalValue : '〇〇'}
          {factor.unit}
          {/* TODO: 吸収した県が複数になると表示できなくなってしまう */}
          {/* {factor.absorbedFactors.map((absorbedFactor) => (
            <div key={absorbedFactor.prefecture.id}>
              {`+ ${!game.hideData ? `${absorbedFactor.value} ${absorbedFactor.unit}` : ''} (${
                absorbedFactor.prefecture.name
              })`}
            </div>
          ))} */}

          {/* NOTICE: ここではどれだけプラスされたかのみを表示し、
          ステータスの制覇数からどの県のどのデータを吸収したかを確認できるようにする */}

          {/* ここに選択した都道府県以外の吸収したデータの合計を表示 */}
          {!game.hideData && factor.absorbedFactors.length > 0 && (
            <div>{`+ ${factor.totalValue - factor.value!} ${factor.unit}`}</div>
          )}
        </ImageBgButton>
      ))}
    </div>
  );
};
