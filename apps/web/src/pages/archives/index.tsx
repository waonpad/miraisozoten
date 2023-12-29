import { useEffect } from 'react';

import { Logo } from '@/components/elements/logo';
import { SoundToggleIconButton } from '@/components/elements/sound-toggle-icon-button';
import { Head } from '@/components/head';
import { useFadeTransition } from '@/components/transitions/fade-transition/use-fade-transition';

import { InfiniteGameArchiveList } from './_/components/infinite-game-archive-list';

import './_/css/archives.css'; // css読み込み

export default function Page() {
  const fadeTransition = useFadeTransition();

  useEffect(() => {
    if (!fadeTransition.isOpen) {
      fadeTransition.openFade();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head
        title="成績"
        description="あなたが過去にプレイしたゲームの成績一覧です。どれだけ成長したか確認してみよう！"
      />

      <div className="p-2 lg:p-4">
        <div className="pagetitle">
          <Logo />
          <p>成績</p>
        </div>

        <InfiniteGameArchiveList />
      </div>
      
      <SoundToggleIconButton className="absolute right-2 top-2" />
    </>
  );
}
