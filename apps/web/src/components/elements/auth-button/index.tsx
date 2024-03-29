import { useState } from 'react';

import { useAuth } from '@/auth/use-auth';
import { env } from '@/constants/env';
import { useSound } from '@/lib/use-sound/use-sound';

import { ConfirmLogoutDialog } from '../confirm-logout-dialog';

export const AuthButton = () => {
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
      {env.VITE_EXHIBITION === 'true' ? (
        <div className="opacity-50">展示中はログインできません</div>
      ) : isLoggedIn && !isAnonymous ? (
        // ログインしていて、かつ匿名ユーザーでなければログアウトできる
        <div
          onClick={handleClickLogout}
          style={{
            cursor: 'pointer',
          }}
        >
          ログアウト
        </div>
      ) : (
        // ログインされていていも、匿名ユーザーなら実際のアカウントでログインできる
        <div
          onClick={handleClickLogin}
          style={{
            cursor: 'pointer',
          }}
        >
          ログイン
        </div>
      )}

      <ConfirmLogoutDialog
        open={isConfirmLogoutDialogOpen}
        handleConfirm={handleConfirmLogout}
        handleOpenChange={handleOpenChangeConfirmLogoutDialog}
      />
    </>
  );
};
