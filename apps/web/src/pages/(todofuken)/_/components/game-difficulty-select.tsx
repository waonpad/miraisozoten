import { Button } from 'ui/components/ui/button';

import { Game } from '../config/game';
import { GameDifficulties } from '../config/game-difficulty';

import type { GameDifficulty } from '../config/game-difficulty';

export type GameDifficultySelectProps = {
  game: Game;
  handleSelectDifficulty: (gameDifficulty: GameDifficulty) => void;
  handleSelectDataVisibility: (dataVisibility: boolean) => void;
};

export const GameDifficultySelect = ({
  game,
  handleSelectDifficulty,
  handleSelectDataVisibility,
}: GameDifficultySelectProps) => {
  return (
    <>
      {GameDifficulties.map((mode) => (
        <Button
          key={mode}
          onClick={() => handleSelectDifficulty(mode)}
          {...(game.difficulty === mode && { variant: 'destructive' })}
        >
          {mode}
        </Button>
      ))}
      <Button
        onClick={() => handleSelectDataVisibility(true)}
        {...(!game.hideData && { variant: 'destructive' })}
      >
        データ表示
      </Button>
      <Button
        onClick={() => handleSelectDataVisibility(false)}
        {...(game.hideData && { variant: 'destructive' })}
      >
        データ非表示
      </Button>
    </>
  );
};
