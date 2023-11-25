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
  3: 'grid-cols-1 lg:grid-cols-3',
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
      className={cn(`grow grid gap-2`, gridSwitcher[factors.length as keyof typeof gridSwitcher])}
    >
      {factors.map((factor, index) => (
        <ImageBgButton
          imagePath={NotchedPaperOrange}
          active={factor.name === selectedFactorName}
          key={index}
          onClick={() => handleClickSelectFactor(factor)}
          className="py-2 text-xl lg:py-5 lg:text-2xl"
        >
          {factor.label}　{!game.hideData ? factor.totalValue : '〇〇'}
          {factor.unit}
          {!game.hideData && factor.absorbedFactors.length > 0 && (
            <div>{`+ ${factor.totalValue - factor.value!} ${factor.unit}`}</div>
          )}
        </ImageBgButton>
      ))}
    </div>
  );
};
