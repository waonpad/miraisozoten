import { SuspenseFallback } from '@/components/elements/suspense-fallback';

import { SetAuthProvider, useAuthCtx } from './use-auth';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuthCtx();

  if (auth.isLoading) {
    return <SuspenseFallback />;
  } else {
    return <SetAuthProvider value={auth}>{children}</SetAuthProvider>;
  }
};
