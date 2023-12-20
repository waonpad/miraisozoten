import { SetFadeTransitionProvider, useFadeTransitionCtx } from './use-fade-transition';

import { FadeTransition } from '.';

export const FadeTransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const fadeTransition = useFadeTransitionCtx();

  return (
    <SetFadeTransitionProvider value={fadeTransition}>
      <>
        {fadeTransition.isRender && <FadeTransition />}
        {children}
      </>
    </SetFadeTransitionProvider>
  );
};
