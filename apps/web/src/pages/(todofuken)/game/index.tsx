import { GameScreen } from '../_/config/game';
import { useGame } from '../_/hooks/use-game';

export default function Page() {
  const { screen } = useGame();

  // screenがnullの場合はローディング画面を表示しているので、確実にscreenはnullではない
  return GameScreen[screen!];
}
