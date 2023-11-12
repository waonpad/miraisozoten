import { GameDifficulty } from 'schema/dist/todoufuken/game';
import { Button } from 'ui/components/ui/button';

import { strictEntries } from '@/utils/strict-entries';

import { LabeledGameDifficulty } from '../config/game';

export type GameDifficultySelectProps = {
  difficulty?: GameDifficulty;
  handleClickGameDifficulty: (difficulty: GameDifficulty) => void;
};

export const GameDifficultySelect = ({
  difficulty: currentDifficulty,
  handleClickGameDifficulty,
}: GameDifficultySelectProps) => {
  return (
    <>
      {strictEntries(LabeledGameDifficulty).map(([difficulty, label]) => (
        <Button
          key={difficulty}
          onClick={() => handleClickGameDifficulty(difficulty)}
          {...(difficulty === currentDifficulty && { variant: 'destructive' })}
        >
          {label}
        </Button>
      ))}
    </>
  );
};
