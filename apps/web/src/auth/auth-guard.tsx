import { matchPath, Navigate, useLocation, useMatches } from 'react-router-dom';

import { useAuth } from '@/auth/use-auth';
import type { Path } from '@/router';

const PRIVATE: Path[] = ['/private', '/about'];
const PUBLIC: Path[] = [];

export const RETURN_TO = 'returnTo';

/**
 * 現在、未ログインの場合Firebaseで自動的に匿名ログインされるため、
 * このコンポーネントは実際には動作しない
 *
 * 匿名ログインとソーシャルログインを区別する意味が現状ではないため、判別する処理は書いていない
 */
export const AuthGuard = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  const { user } = useAuth();
  const location = useLocation();
  const marches = useMatches();

  const authedOnPublicPath = user && PUBLIC.includes(location.pathname as Path);
  const unAuthedOnPrivatePath =
    !user && PRIVATE.some((path) => marches.some((match) => matchPath(path, match.pathname)));

  if (authedOnPublicPath) return <Navigate to="/" replace />;
  if (unAuthedOnPrivatePath)
    // ログイン用のページは個別で設けていない
    // 未ログインの場合、menuにリダイレクトする
    // menuで、ログインを促すダイアログを表示する
    return <Navigate to={`/menu?${RETURN_TO}=${encodeURIComponent(location.pathname)}`} replace />;

  return <>{children}</>;
};
