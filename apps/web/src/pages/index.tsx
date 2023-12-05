import { Button } from 'ui/components/ui/button';

import { Head } from '@/components/head';
import { soundAttirbuteObject } from '@/lib/use-sound/constants';
import { useSound } from '@/lib/use-sound/use-sound';
import { Link } from '@/router';

export default function Page() {
  const { toggleSoundEnabled, stopBGM } = useSound();

  return (
    <>
      <Head description="新感覚！ 都道府県統計バトル！" />

      <div>タイトル</div>
      <Button asChild {...soundAttirbuteObject('PAGE_MOVE')}>
        <Link to="/menu">開始</Link>
      </Button>
      <div>タイトル画像を配置</div>
      <div>キャッチコピー</div>

      <button onClick={toggleSoundEnabled}>音声ON/OFF</button>

      <button onClick={() => stopBGM()}>BGM停止</button>
    </>
  );
}
