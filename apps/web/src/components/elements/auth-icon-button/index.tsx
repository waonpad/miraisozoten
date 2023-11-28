import { useState } from 'react';

import { Button } from 'ui/components/ui/button';

import LoginIcon from '@/assets/icons/login.svg?react';
import LogoutIcon from '@/assets/icons/logout.svg?react';
import { useAuth } from '@/auth/use-auth';

import { ConfirmLogoutDialog } from '../confirm-logout-dialog';

// TODO: アイコンボタンにして、propsも受け取れるようにする
export const AuthIconButton = () => {
  const { user, login, logout } = useAuth();

  const isLoggedIn = !!user;

  const isAnonymous = user?.email?.endsWith('@example.com');

  const [isConfirmLogoutDialogOpen, setIsConfirmLogoutDialogOpen] = useState(false);

  const handleClickLogout = () => setIsConfirmLogoutDialogOpen(true);

  const handleConfirmLogout = () => {
    logout();

    setIsConfirmLogoutDialogOpen(false);
  };

  const handleCloseConfirmLogoutDialog = () => setIsConfirmLogoutDialogOpen(false);

  const handleClickLogin = () => login('google');

  return (
    <>
      {isLoggedIn && !isAnonymous && (
        // ログインしていて、かつ匿名ユーザーでなければログアウトできる
        <Button onClick={handleClickLogout} asChild size={'icon'} variant={'icon'}>
          <LogoutIcon />
        </Button>
      )}
      {((isLoggedIn && isAnonymous) || !isLoggedIn) && (
        // ログインされていていも、匿名ユーザーなら実際のアカウントでログインできる
        // ログインされていなければログインできる(自動で匿名ログインされるため、起こらないはず)
        <Button onClick={handleClickLogin} asChild size={'icon'} variant={'icon'}>
          <LoginIcon />
        </Button>
      )}

      <ConfirmLogoutDialog
        open={isConfirmLogoutDialogOpen}
        handleConfirm={handleConfirmLogout}
        handleOpenChange={handleCloseConfirmLogoutDialog}
      />
    </>
  );
};
