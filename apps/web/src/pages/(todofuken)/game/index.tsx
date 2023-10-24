import { GameLobby } from '../_/components/screens/game-lobby';
import { useGame } from '../_/hooks/use-game';

export default function Page() {
  const game = useGame();

  return game.data.state === 'lobby' ? (
    <GameLobby />
  ) : game.data.state === 'battle' ? (
    <div>バトル</div>
  ) : (
    <div>リザルト</div>
  );
}
