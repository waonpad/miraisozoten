import { matchPath, Navigate, useLocation, useMatches } from 'react-router-dom';

import { useAuth } from '@/auth/use-auth';
import type { Path } from '@/router';

const PRIVATE: Path[] = ['/private', '/about'];
const PUBLIC: Path[] = ['/login'];

export const AuthGuard = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const { user } = useAuth();
  const location = useLocation();
  const marches = useMatches();

  const authedOnPublicPath = user && PUBLIC.includes(location.pathname as Path);
  const unAuthedOnPrivatePath =
    !user && PRIVATE.some((path) => marches.some((match) => matchPath(path, match.pathname)));

  if (authedOnPublicPath) return <Navigate to="/" replace />;
  if (unAuthedOnPrivatePath)
    return <Navigate to={`/login?returnTo=${encodeURIComponent(location.pathname)}`} replace />;

  return <>{children}</>;
};
