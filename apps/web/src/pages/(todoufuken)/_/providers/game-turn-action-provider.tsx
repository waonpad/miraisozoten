import { useGameTurnActionCtx, SetGameTurnActionProvider } from '../hooks/use-game-turn-action';

export const GameTurnActionProvider = ({ children }: { children: React.ReactNode }) => {
  const gameTurnAction = useGameTurnActionCtx();

  return <SetGameTurnActionProvider value={gameTurnAction}>{children}</SetGameTurnActionProvider>;
};
