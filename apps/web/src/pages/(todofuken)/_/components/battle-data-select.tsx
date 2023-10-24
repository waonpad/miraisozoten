import { Button } from 'ui/components/ui/button';

import { Game } from '../config/game';

type BattleData = string;

export type BattleDataSelectProps = {
  game: Game;
  battleDataArray: BattleData[];
  handleSelect: (battleData: BattleData) => void;
};

export const BattleDataSelect = ({
  game,
  battleDataArray,
  handleSelect,
}: BattleDataSelectProps) => {
  return (
    <div>
      {battleDataArray.map((battleData) => (
        <Button
          key={battleData}
          onClick={() => handleSelect(battleData)}
          {...(game.difficulty === battleData && { variant: 'destructive' })}
        >
          {battleData}
        </Button>
      ))}
    </div>
  );
};
