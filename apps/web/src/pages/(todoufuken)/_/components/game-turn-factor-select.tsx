import { Button } from 'ui/components/ui/button';

import { assert } from '@/utils/asset';

import { useGame } from '../hooks/use-game';
import { getAllFactors } from '../utils/gat-all-factors';

export type GameTurnFactorSelectProps = {
  factors: ReturnType<typeof getAllFactors>;
  handleClickSelectFactor: (factor: ReturnType<typeof getAllFactors>[number]) => void;
};

export const GameTurnFactorSelect = ({
  factors,
  handleClickSelectFactor,
}: GameTurnFactorSelectProps) => {
  const { game } = useGame();
  assert(game);

  return (
    <div>
      {factors.map((factor, index) => (
        <Button key={index} onClick={() => handleClickSelectFactor(factor)}>
          {factor.prefecture.name}
          {factor.label}
          {!game.hideData && (
            <div>
              {factor.value}
              {factor.unit}
            </div>
          )}
        </Button>
      ))}
    </div>
  );
};
