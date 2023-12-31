import { useState } from 'react';

import { Button } from 'ui/components/ui/button';

import LoginIcon from '@/assets/icons/login.svg?react';
import LogoutIcon from '@/assets/icons/logout.svg?react';
import { useAuth } from '@/auth/use-auth';
import { useSound } from '@/lib/use-sound/use-sound';

import { ConfirmLogoutDialog } from '../confirm-logout-dialog';

// TODO: アイコンボタンにして、propsも受け取れるようにする
export const AuthIconButton = () => {
  const { user, login, logout } = useAuth();
  const { playClick, playOpenDialog, playCloseDialog } = useSound();

  const isLoggedIn = !!user;

  const isAnonymous = user?.email?.endsWith('@example.com');

  const [isConfirmLogoutDialogOpen, setIsConfirmLogoutDialogOpen] = useState(false);

  const handleClickLogout = () => {
    playOpenDialog();

    setIsConfirmLogoutDialogOpen(true);
  };

  const handleConfirmLogout = () => {
    playClick();

    logout();

    setIsConfirmLogoutDialogOpen(false);
  };

  const handleOpenChangeConfirmLogoutDialog = (open: boolean) => {
    if (!open) {
      playCloseDialog();

      setIsConfirmLogoutDialogOpen(false);
    }
  };

  const handleClickLogin = () => {
    playClick();

    login('google');
  };

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
        <Button
          // handleClickLoginはクリック音を再生する
          onClick={handleClickLogin}
          asChild
          size={'icon'}
          variant={'icon'}
        >
          <LoginIcon />
        </Button>
      )}

      <ConfirmLogoutDialog
        open={isConfirmLogoutDialogOpen}
        handleConfirm={handleConfirmLogout}
        handleOpenChange={handleOpenChangeConfirmLogoutDialog}
      />
    </>
  );
};
