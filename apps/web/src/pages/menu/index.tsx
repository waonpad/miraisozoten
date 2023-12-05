import { useEffect, useState } from 'react';

import { RETURN_TO } from '@/auth/auth-guard';
import { useAuth } from '@/auth/use-auth';
import { AuthIconButton } from '@/components/elements/auth-icon-button';
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

      <Logo />

      {/* ログインボタン */}
      <AuthIconButton />

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
        ランキング
      </Link>

      <Link to="/attribution" onClick={handleClickLink}>
        使用データの出典
      </Link>

      <LoginAlerttDialog
        open={isLoginDialogOpen}
        handleOpenChange={handleOpenChangeLoginDialog}
        // handleConfirmLoginはクリック音を再生する
        handleConfirm={handleConfirmLogin}
      />
    </>
  );
}
