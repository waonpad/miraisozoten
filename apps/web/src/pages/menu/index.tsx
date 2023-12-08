import { useEffect, useState } from 'react';

import { RETURN_TO } from '@/auth/auth-guard';
import { useAuth } from '@/auth/use-auth';
import { AuthButton } from '@/components/elements/auth-button';
import { LoginAlerttDialog } from '@/components/elements/login-alert-dialog';
import { Logo } from '@/components/elements/logo';
import { Head } from '@/components/head';
import { useSound } from '@/lib/use-sound/use-sound';
import { Link } from '@/router';

export default function Page() {
  const { login } = useAuth();
  const { playClick, playCloseDialog, playPageMove } = useSound();

  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const handleConfirmLogin = () => {
    playClick();

    login('google');
  };

  const handleOpenChangeLoginDialog = (open: boolean) => {
    if (!open) {
      playCloseDialog();

      setIsLoginDialogOpen(open);
    }
  };

  const handleClickLink = () => {
    playPageMove();
  };

  useEffect(() => {
    // もしauthguardによってリダイレクトされてきた場合、ログインを促すダイアログを表示する
    const returnTo = new URLSearchParams(location.search).get(RETURN_TO);

    if (returnTo) {
      setIsLoginDialogOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head
        title="メニュー"
        description="メニューページです。ここから様々なページに遷移できます。"
      />

      <div className="relative flex h-screen flex-col items-center justify-center p-2 lg:p-3">
        <Logo wrapperProps={{ className: 'absolute left-2 top-2 h-12 w-12 lg:h-28 lg:w-28' }} />
        <div className="flex flex-col items-center justify-center space-y-14 text-3xl lg:text-4xl">
          <Link to="/game" onClick={handleClickLink}>
            プレイ
          </Link>
          <Link to="/game/explain" onClick={handleClickLink}>
            ゲーム説明
          </Link>
          <Link to="/archives" onClick={handleClickLink}>
            成績
          </Link>
          <Link to="/ranking" onClick={handleClickLink}>
            順位
          </Link>
          <AuthButton />
        </div>

        <Link
          to="/attribution"
          onClick={handleClickLink}
          className="absolute bottom-2 right-2 text-2xl lg:text-3xl"
        >
          使用データの出典
        </Link>
      </div>

      <LoginAlerttDialog
        open={isLoginDialogOpen}
        handleOpenChange={handleOpenChangeLoginDialog}
        // handleConfirmLoginはクリック音を再生する
        handleConfirm={handleConfirmLogin}
      />
    </>
  );
}
