import { useEffect } from 'react';

import { Logo } from '@/components/elements/logo';
import { Head } from '@/components/head';
import { useFadeTransition } from '@/components/transitions/fade-transition/use-fade-transition';

import { InfiniteGameArchiveList } from './_/components/infinite-game-archive-list';

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

      <Logo />

      <InfiniteGameArchiveList />
    </>
  );
}
