import { Button } from 'ui/components/ui/button';

import { Head } from '@/components/head';
import { useFadeTransition } from '@/components/transitions/fade-transition/use-fade-transition';
import { useSound } from '@/lib/use-sound/use-sound';
import { Link, useNavigate } from '@/router';

export default function Page() {
  const { playPageMove, toggleSoundEnabled, stopBGM } = useSound();

  const fadeTransition = useFadeTransition();

  const navigate = useNavigate();

  const handleClickNavigateToMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    fadeTransition.closeFade();

    playPageMove();

    setTimeout(() => {
      navigate('/menu');
    }, fadeTransition.duration);
  };

  return (
    <>
      <Head description="新感覚！ 都道府県統計バトル！" />

      <div>タイトル</div>
      <Button asChild onClick={handleClickNavigateToMenu}>
        <Link to="/menu">開始</Link>
      </Button>
      <div>タイトル画像を配置</div>
      <div>キャッチコピー</div>

      {/* テスト用の一時的なボタン */}

      <button onClick={toggleSoundEnabled}>音声ON/OFF</button>

      <button onClick={() => stopBGM()}>BGM停止</button>
    </>
  );
}
