import { useEffect, useState } from 'react';

import { RETURN_TO } from '@/auth/auth-guard';
import { useAuth } from '@/auth/use-auth';
import { AuthButton } from '@/components/elements/auth-button';
import { LoginAlerttDialog } from '@/components/elements/login-alert-dialog';
import { Logo } from '@/components/elements/logo';
import { SoundToggleIconButton } from '@/components/elements/sound-toggle-icon-button';
import { Head } from '@/components/head';
import { useFadeTransition } from '@/components/transitions/fade-transition/use-fade-transition';
import { useFusumaTransition } from '@/components/transitions/fusuma-transition/use-fusuma-transition';
import { useSound } from '@/lib/use-sound/use-sound';
import { Link, Path, useNavigate } from '@/router';

export default function Page() {
  const fusumaTransition = useFusumaTransition();

  const fadeTransition = useFadeTransition();

  const navigate = useNavigate();

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

  const handleClickLink = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();

    fadeTransition.closeFade();

    playPageMove();

    const path = event.currentTarget.getAttribute('href') as Path;

    setTimeout(() => {
      console.log('navigate', path);

      navigate(path);
    }, fadeTransition.duration);
  };

  useEffect(() => {
    // もしauthguardによってリダイレクトされてきた場合、ログインを促すダイアログを表示する
    const returnTo = new URLSearchParams(location.search).get(RETURN_TO);

    if (returnTo) {
      setIsLoginDialogOpen(true);
    }

    // ゲームの終了時にふすまを閉じてここに遷移するため、開く
    if (!fusumaTransition.isOpen) {
      fusumaTransition.openFusuma();
    }

    // トップ画面からの遷移でフェードしてくるため、開く
    if (!fadeTransition.isOpen) {
      fadeTransition.openFade();
    }
    // ここの依存にfadeTransitionを入れると、fadeTransitionが変更されるたびにuseEffectが呼ばれてしまう
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

      <SoundToggleIconButton className="absolute right-2 top-2" />

      <LoginAlerttDialog
        open={isLoginDialogOpen}
        handleOpenChange={handleOpenChangeLoginDialog}
        // handleConfirmLoginはクリック音を再生する
        handleConfirm={handleConfirmLogin}
      />
    </>
  );
}
