import { SuspenseFallback } from '@/components/elements/suspense-fallback';

import { SetGameProvider, useGameCtx } from '../hooks/use-game';

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const game = useGameCtx();

  // とりあえずローディング画面を表示
  if (!game.enabled) {
    return <SuspenseFallback />;
  }

  return <SetGameProvider value={game}>{children}</SetGameProvider>;
};
