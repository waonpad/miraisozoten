import { SetFadeTransitionProvider, useFadeTransitionCtx } from './use-fade-transition';

import { FadeTransition } from '.';

export const FadeTransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const fadeTransition = useFadeTransitionCtx();

  return (
    <SetFadeTransitionProvider value={fadeTransition}>
      <>
        <FadeTransition />
        {children}
      </>
    </SetFadeTransitionProvider>
  );
};
