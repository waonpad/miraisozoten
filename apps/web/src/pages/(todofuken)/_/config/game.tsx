import { GameStatus } from '../components/game-status';
import { GameBattle } from '../components/screens/game-battle';
import { GameLobby } from '../components/screens/game-lobby';
import { GameResult } from '../components/screens/game-result';
import { GameSelectFactor } from '../components/screens/game-select-factor';
import { GameSelectHighLow } from '../components/screens/game-select-high-low';
import { GameSelectOpponent } from '../components/screens/game-select-opponent';

export const GameScreenKey = [
  'lobby',
  'highLow',
  'selectFactor',
  'selectOppo',
  'battle',
  'result',
] as const;

export type GameScreenKey = (typeof GameScreenKey)[number];

export const GameScreen = {
  lobby: <GameLobby />,
  highLow: (
    <>
      <GameStatus />
      <GameSelectHighLow />
    </>
  ),
  selectFactor: (
    <>
      <GameStatus />
      <GameSelectFactor />
    </>
  ),
  selectOppo: (
    <>
      <GameStatus />
      <GameSelectOpponent />
    </>
  ),
  battle: (
    <>
      <GameStatus />
      <GameBattle />
    </>
  ),
  result: <GameResult />,
} satisfies { [key in GameScreenKey]: JSX.Element };

export const PickCount = {
  EASY: 3,
  NORMAL: 4,
  HIDDEN_NORMAL: 4,
  HARD: 6,
};
