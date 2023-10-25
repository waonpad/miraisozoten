import { Button } from 'ui/components/ui/button';

import { Game, GameDifficulties } from '../config/game';

export type GameDifficultySelectProps = {
  game: Game;
  handleSelectDifficulty: (gameDifficulty: Game['difficulty']) => void;
};

export const GameDifficultySelect = ({
  game,
  handleSelectDifficulty,
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
    </>
  );
};
