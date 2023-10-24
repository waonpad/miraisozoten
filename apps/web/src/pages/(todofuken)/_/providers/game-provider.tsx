import { SetGameProvider, useGameCtx } from '../hooks/use-game';

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useGameCtx();
  return <SetGameProvider value={auth}>{children}</SetGameProvider>;
};
