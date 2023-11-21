import { useEffect, useState } from 'react';

import { Button } from 'ui/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from 'ui/components/ui/dialog';

import { RETURN_TO } from '@/auth/auth-guard';
import { useAuth } from '@/auth/use-auth';
import { AuthIconButton } from '@/components/elements/auth-icon-button';
import { Link } from '@/router';

export default function Page() {
  const { login } = useAuth();

  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const handleClickLogin = () => login('google');

  const handleClickCloseLoginDialog = () => setIsLoginDialogOpen(false);

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
      {/* TODO: プロダクトのロゴを用意して配置する */}

      {/* ログインボタン */}
      <AuthIconButton />

      {/* 外側をクリックしても閉じない */}
      <Dialog open={isLoginDialogOpen}>
        <DialogContent>
          <div>ログインしてください</div>
          <DialogFooter>
            <Button onClick={handleClickLogin}>ログイン</Button>
            <Button onClick={handleClickCloseLoginDialog}>キャンセル</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Link to="/game">プレイ</Link>
      <Link to="/archives">成績</Link>
      <Link to="/ranking">ランキング</Link>

      <Link to="/attribution">使用データの出典</Link>
    </>
  );
}
