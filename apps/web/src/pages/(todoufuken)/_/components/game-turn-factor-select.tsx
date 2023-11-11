import { Button } from 'ui/components/ui/button';

import { useGame } from '../hooks/use-game';
import { getAllFactors } from '../utils/gat-all-factors';

export const GameTurnFactorSelect = ({
  factors,
  handleClcikSelectFactor,
}: {
  factors: ReturnType<typeof getAllFactors>;
  handleClcikSelectFactor: (factor: ReturnType<typeof getAllFactors>[number]) => void;
}) => {
  const { game } = useGame();

  if (!game) throw new Error('game is not found');

  return (
    <div>
      {factors.map((factor, index) => (
        <Button key={index} onClick={() => handleClcikSelectFactor(factor)}>
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
