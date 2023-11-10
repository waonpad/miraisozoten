import { GameMode } from 'schema/dist/todoufuken/game';
import { Button } from 'ui/components/ui/button';

import { strictEntries } from '@/utils/strict-entries';

import { LabeledGameMode } from '../config/game';
import { useGame } from '../hooks/use-game';

export const GameModeSelect = () => {
  const { gameSettings, setGameSettings } = useGame();

  const handleClickGameMode = (mode: GameMode) => {
    setGameSettings({ ...gameSettings, mode });
  };

  return (
    <>
      {strictEntries(LabeledGameMode).map(([mode, label]) => (
        <Button
          key={mode}
          onClick={() => handleClickGameMode(mode)}
          {...(gameSettings.mode === mode && { variant: 'destructive' })}
        >
          {label}
        </Button>
      ))}
    </>
  );
};
