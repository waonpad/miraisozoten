import { SuspenseFallback } from '@/components/elements/suspense-fallback';

import { SetGameProvider, useGameCtx } from '../hooks/use-game';

/**
 * @description
 * ゲームの状態を管理するコンテキストを提供する
 */
export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const game = useGameCtx();

  // ゲームが有効でない場合は、ローディング画面を表示する
  if (!game.enabled) {
    return <SuspenseFallback />;
  }

  return <SetGameProvider value={game}>{children}</SetGameProvider>;
};
