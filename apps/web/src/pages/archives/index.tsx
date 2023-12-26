import { useEffect } from 'react';

import { Logo } from '@/components/elements/logo';
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

      <div className="pagetitle">
        <Logo />
        <p>成績</p>
      </div>

      <div className="archwrap">
        <div className="archdata">
          <p className="archday">2023/11/10</p>
          <div>
            <div className="archmode">
              <p>地方制覇</p>
              <p>easy</p>
            </div>
            <div className="archvalue">
              <p>タイム 00:03:24</p>
              <p>制覇数:2</p>
              <p>ミス数:5</p>
            </div>
          </div>
        </div>

        <div className="archdata">
          <p className="archday">2000/00/00</p>
          <div>
            <div className="archmode">
              <p>※モード名</p>
              <p>※難易度名</p>
            </div>
            <div className="archvalue">
              <p>タイム 00:00:00</p>
              <p>制覇数:0</p>
              <p>ミス数:0</p>
            </div>
          </div>
        </div>
      </div>

      <InfiniteGameArchiveList />
    </>
  );
}
