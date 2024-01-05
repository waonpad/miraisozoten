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
          <p>{'闘道賦県について (プレイ方法)'}</p>
        </div>
        {/* <p className="explaintext">
          このゲームでは、難易度とモードを選択後に
          <span>お題で相手より勝てそうなものを選んで対戦</span>します。
          <br />
          対戦で勝つと相手のその要素を吸収し、より有利に闘えるようになります。※吸収した要素は制覇数から確認できます。
        </p> */}
        <p className="explaintext">
          <span>①難易度とモードを選択する</span>
          <br />
          <span>②プレイする都道府県を選び、ゲームを開始する</span>
          <br />
          <span>③ランダムに表示された都道府県データの中から、問題文の条件に合うものを選ぶ</span>
          <br />
          <span>④対戦する都道府県を隣接県一覧から選ぶ</span>
          <br />
          <span>
            ⑤勝利すれば、その時に使用したデータを相手の都道府県から吸収・自分のモノにして、次の戦いに向かう※
          </span>
          <br />
          <span>⑥負けるか引き分ければ、そのまま次の戦いに向かう</span>
          <br />
          <br />
          <span>データの吸収を駆使して、全ての都道府県を制覇しよう！</span>
          <br />
          <br />
          <span>※吸収した都道府県は「制覇数」から確認可能</span>
        </p>
        <div className="battleimages">{/* バトル画像(画面幅で切り替え) */}</div>
      </div>

      <SoundToggleIconButton className="absolute right-2 top-2" />
    </>
  );
}
