import { useEffect, useState } from 'react';

import { RETURN_TO } from '@/auth/auth-guard';
import { useAuth } from '@/auth/use-auth';
import { AuthIconButton } from '@/components/elements/auth-icon-button';
import { LoginAlerttDialog } from '@/components/elements/login-alert-dialog';
import { Logo } from '@/components/elements/logo';
import { Head } from '@/components/head';
import { Link } from '@/router';

export default function Page() {
  const { login } = useAuth();

  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const handleConfirmLogin = () => login('google');

  const handleCloseLoginDialog = (open: boolean) => setIsLoginDialogOpen(open);

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

      <Link to="/game">プレイ</Link>
      <Link to="/game/explain">ゲーム説明</Link>
      <Link to="/archives">成績</Link>
      <Link to="/ranking">ランキング</Link>

      <Link to="/attribution">使用データの出典</Link>

      <LoginAlerttDialog
        open={isLoginDialogOpen}
        handleOpenChange={handleCloseLoginDialog}
        handleConfirm={handleConfirmLogin}
      />
    </>
  );
}
