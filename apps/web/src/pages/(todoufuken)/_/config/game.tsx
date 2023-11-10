import { GameDifficulty, GameMode } from 'schema/dist/todoufuken/game';

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

export const LabeledGameDifficulty = {
  EASY: 'easy',
  NORMAL: 'normal',
  HARD: 'hard',
  VERY_HARD: 'very hard',
} as const satisfies Record<GameDifficulty, string>;

export const LabeledGameMode = {
  REGIONAL: '地方制覇',
  NATIONWIDE: '全国制覇',
} as const satisfies Record<GameMode, string>;

export const PickCount = {
  EASY: 3,
  NORMAL: 4,
  HARD: 4,
  VERY_HARD: 6,
};
