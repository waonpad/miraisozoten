import { GameDifficulty } from 'schema/dist/todoufuken/game';
import { Button } from 'ui/components/ui/button';

import { strictEntries } from '@/utils/strict-entries';

import { LabeledGameDifficulty } from '../config/game';
import { useGame } from '../hooks/use-game';

export const GameDifficultySelect = () => {
  const { gameSettings, setGameSettings } = useGame();

  const handleClickGameDifficulty = (difficulty: GameDifficulty) => {
    setGameSettings({ ...gameSettings, difficulty });
  };

  return (
    <>
      {strictEntries(LabeledGameDifficulty).map(([difficulty, label]) => (
        <Button
          key={difficulty}
          onClick={() => handleClickGameDifficulty(difficulty)}
          {...(gameSettings.difficulty === difficulty && { variant: 'destructive' })}
        >
          {label}
        </Button>
      ))}
    </>
  );
};
