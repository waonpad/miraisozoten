import { SetFusumaTransitionProvider, useFusumaTransitionCtx } from './use-fusuma-transition';

import { FusumaTransition } from '.';

export const FusumaTransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const fusumaTransition = useFusumaTransitionCtx();

  return (
    <SetFusumaTransitionProvider value={fusumaTransition}>
      <>
        <FusumaTransition />
        {children}
      </>
    </SetFusumaTransitionProvider>
  );
};
