import { Button } from 'ui/components/ui/button';

import LoginIcon from '@/assets/icons/login.svg?react';
import LogoutIcon from '@/assets/icons/logout.svg?react';
import { useAuth } from '@/auth/use-auth';

// TODO: アイコンボタンにして、propsも受け取れるようにする
export const AuthIconButton = () => {
  const { user, login, logout } = useAuth();

  const isLoggedIn = !!user;

  const isAnonymous = user?.email?.endsWith('@example.com');

  return (
    <>
      {isLoggedIn && !isAnonymous && (
        // ログインしていて、かつ匿名ユーザーでなければログアウトできる
        <Button onClick={logout} asChild size={'icon'} variant={'ghost'}>
          <LogoutIcon />
        </Button>
      )}
      {((isLoggedIn && isAnonymous) || !isLoggedIn) && (
        // ログインされていていも、匿名ユーザーなら実際のアカウントでログインできる
        // ログインされていなければログインできる(自動で匿名ログインされるため、起こらないはず)
        <Button onClick={() => login('google')} asChild size={'icon'} variant={'ghost'}>
          <LoginIcon />
        </Button>
      )}
    </>
  );
};
