import { GameMode } from 'schema/dist/todoufuken/game';
import { Button } from 'ui/components/ui/button';

import { strictEntries } from '@/utils/strict-entries';

import { LabeledGameMode } from '../config/game';

export type GameModeSelectProps = {
  mode?: GameMode;
  handleClickGameMode: (mode: GameMode) => void;
};

export const GameModeSelect = ({ mode: currentMode, handleClickGameMode }: GameModeSelectProps) => {
  return (
    <>
      {strictEntries(LabeledGameMode).map(([mode, label]) => (
        <Button
          key={mode}
          onClick={() => handleClickGameMode(mode)}
          {...(mode === currentMode && { variant: 'destructive' })}
        >
          {label}
        </Button>
      ))}
    </>
  );
};
