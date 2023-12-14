import { SetFusumaTransitionProvider, useFusumaTransitionCtx } from './use-fusuma-transition';

import { FusumaTransition } from '.';

export const FusumaTransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const fusumaTransition = useFusumaTransitionCtx();

  return (
    <SetFusumaTransitionProvider value={fusumaTransition}>
      <>
        {fusumaTransition.isRender && <FusumaTransition />}
        {children}
      </>
    </SetFusumaTransitionProvider>
  );
};
