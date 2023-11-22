import { Head } from '@/components/head';

import { GameScreen } from '../_/config/game';
import { useGame } from '../_/hooks/use-game';

export default function Page() {
  const { screen } = useGame();

  // screenがnullの場合はローディング画面を表示しているので、確実にscreenはnullではない
  return (
    <>
      <Head
        title="ゲーム"
        description="ゲームページです。都道府県の統計データを駆使して全国制覇を目指そう！"
      />

      {GameScreen[screen!]}
    </>
  );
}
