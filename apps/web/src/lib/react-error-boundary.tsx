import { useErrorBoundary } from 'react-error-boundary';

import { useWindowEvent } from '@/utils/hooks/use-window-event';

/**
 * 拾い忘れたエラー, 非同期処理, イベントハンドラ内のエラーをキャッチする
 */
export const WatchUnhandledError = ({ children }: { children: React.ReactNode }) => {
  const { showBoundary } = useErrorBoundary();

  useWindowEvent('error', (event) => showBoundary(event.error), []);

  useWindowEvent('unhandledrejection', (event) => showBoundary(event.reason), []);

  return <>{children}</>;
};
