import { Logo } from '@/components/elements/logo';
import { Head } from '@/components/head';

import { InfiniteGameArchiveList } from './_/components/infinite-game-archive-list';

export default function Page() {
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
