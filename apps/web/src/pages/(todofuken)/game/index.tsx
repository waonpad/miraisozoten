import { GameScreen } from '../_/config/game';
import { useGame } from '../_/hooks/use-game';

export default function Page() {
  const { screen } = useGame();

  return GameScreen[screen];
}
