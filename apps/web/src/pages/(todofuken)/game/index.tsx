import { GameScreens } from '../_/config/game';
import { useGame } from '../_/hooks/use-game';

export default function Page() {
  const game = useGame();

  return GameScreens[game.data.state];
}
