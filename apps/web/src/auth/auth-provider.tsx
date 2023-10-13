import { SetAuthProvider, useAuthCtx } from './use-auth';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuthCtx();

  if (auth.isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  } else {
    return <SetAuthProvider value={auth}>{children}</SetAuthProvider>;
  }
};
