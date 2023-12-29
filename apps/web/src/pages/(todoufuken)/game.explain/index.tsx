import { useEffect } from 'react';

import { Logo } from '@/components/elements/logo';
import { SoundToggleIconButton } from '@/components/elements/sound-toggle-icon-button';
import { Head } from '@/components/head';
import { useFadeTransition } from '@/components/transitions/fade-transition/use-fade-transition';

import './css/explain.css'; // css読み込み

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
      <Head title="ゲーム説明" description="闘道賦県ゲームの説明ページです。" />

      <div className="p-2 lg:p-4">
        <div className="pagetitle">
          <Logo />
          <p>闘道賦県について</p>
        </div>
        <p className="explaintext">
          このゲームでは、難易度とモードを選択後に
          <span>お題で相手より勝てそうなものを選んで対戦</span>します。
          <br />
          対戦で勝つと相手のその要素を吸収し、より有利に闘えるようになります。※吸収した要素は制覇数から確認できます。
        </p>
        <div className="battleimages">{/* バトル画像(画面幅で切り替え) */}</div>
      </div>

      <SoundToggleIconButton className="absolute right-2 top-2" />
    </>
  );
}
