import { useGameSettingsCtx, SetGameSettingsProvider } from '../hooks/use-game-settings';

export const GameSettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const gameSettings = useGameSettingsCtx();

  return <SetGameSettingsProvider value={gameSettings}>{children}</SetGameSettingsProvider>;
};
