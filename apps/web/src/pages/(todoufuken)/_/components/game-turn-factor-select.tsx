import { PrefectureStatsName } from 'schema/dist/prefecture/stats';
import { cn } from 'ui/lib/utils';

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

const gridSwitcher = {
  3: 'grid-cols-1 lg:grid-cols-3 lg:py-8',
  4: 'grid-cols-1 lg:grid-cols-2 lg:grid-rows-2',
  6: 'grid-cols-2 grid-rows-3 lg:grid-cols-3 lg:grid-rows-2',
} as const;

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

  // 3, 4, 6はFactorPickCountによるもの
  if ([3, 4, 6].includes(factors.length) === false) {
    throw new Error(`invalid factors length: ${factors.length}`);
  }

  return (
    <div
      // growの指定は親コンポーネントとスタイルが密になっているがとりあえず動かすため妥協
      className={cn(`grow grid gap-2`, gridSwitcher[factors.length as keyof typeof gridSwitcher])}
    >
      {factors.map((factor, index) => (
        <ImageBgButton
          imagePath={NotchedPaperOrange}
          active={factor.name === selectedFactorName}
          key={index}
          onClick={() => handleClickSelectFactor(factor)}
          className="relative"
        >
          <div className="text-xl lg:text-2xl">
            <span>{factor.label}</span>
            <br
              className={`${
                factors.length === 6
                  ? 'inline lg:hidden'
                  : factors.length === 3
                  ? 'hidden lg:inline'
                  : 'hidden'
              }`}
            />
            <span
              className={`${
                factors.length === 6
                  ? 'hidden lg:inline'
                  : factors.length === 3
                  ? 'inline lg:hidden'
                  : 'inline'
              }`}
            >
              {'　'}
            </span>
            <span>
              {!game.hideData ? factor.totalValue : '〇〇'}
              {factor.unit}
            </span>
          </div>
          {!game.hideData && factor.absorbedFactors.length > 0 && (
            <div className="absolute bottom-1 right-3 text-sm lg:bottom-2 lg:right-5 lg:text-base">{`+ ${
              factor.totalValue - factor.value!
            } ${factor.unit}`}</div>
          )}
        </ImageBgButton>
      ))}
    </div>
  );
};
