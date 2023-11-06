import { DependencyList, useEffect, useCallback } from 'react';

export const useWindowEvent = <K extends keyof WindowEventMap>(
  type: K,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  deps: DependencyList,
  options?: boolean | AddEventListenerOptions
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedListener = useCallback(listener, deps);

  useEffect(() => {
    if (window) {
      window.addEventListener(type, memoizedListener, options);
      return () => {
        window.removeEventListener(type, memoizedListener, options);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deps]);
};
