import { Button } from 'ui/components/ui/button';

import { Game } from '../config/game';
import { GameModes } from '../config/game-mode';

import type { GameMode } from '../config/game-mode';

export type GameModeSelectProps = {
  game: Game;
  handleSelect: (gameMode: GameMode) => void;
};

export const GameModeSelect = ({ game, handleSelect }: GameModeSelectProps) => {
  return (
    <div>
      {GameModes.map((mode) => (
        <Button
          key={mode}
          onClick={() => handleSelect(mode)}
          {...(game.mode === mode && { variant: 'destructive' })}
        >
          {mode}
        </Button>
      ))}
    </div>
  );
};
