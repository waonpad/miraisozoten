import { GameMode } from 'schema/dist/todoufuken/game';
import { Button } from 'ui/components/ui/button';

import { useGame } from '../hooks/use-game';

export const GameModeSelect = () => {
  const { gameSettings, setGameSettings } = useGame();

  return (
    <div>
      {GameMode.map((mode) => (
        <Button
          key={mode}
          onClick={() => {
            setGameSettings({ ...gameSettings, mode });
          }}
          {...(gameSettings.mode === mode && { variant: 'destructive' })}
        >
          {mode}
        </Button>
      ))}
    </div>
  );
};
