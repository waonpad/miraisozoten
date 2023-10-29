import { GameDifficulty } from 'schema/dist/todofuken/game';
import { Button } from 'ui/components/ui/button';

import { useGame } from '../hooks/use-game';

export const GameDifficultySelect = () => {
  const { gameSettings, setGameSettings } = useGame();

  return (
    <>
      {GameDifficulty.map((mode) => (
        <Button
          key={mode}
          onClick={() => {
            setGameSettings({ ...gameSettings, difficulty: mode });
          }}
          {...(gameSettings.difficulty === mode && { variant: 'destructive' })}
        >
          {mode}
        </Button>
      ))}
    </>
  );
};
