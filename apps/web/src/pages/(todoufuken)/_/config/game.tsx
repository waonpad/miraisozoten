import {
  GameDifficulty,
  GameMode,
  HighLow,
  GameResult as GameResultType,
} from 'schema/dist/todoufuken/game';

import { GameHeader } from '../components/game-header';
import { GameLobby } from '../components/screens/game-lobby';
import { GameResult } from '../components/screens/game-result';
import { GameTurnAction } from '../components/screens/game-turn-action';
import { GameTurnResult } from '../components/screens/game-turn-result';

export const GameScreenKey = ['lobby', 'turnAction', 'turnResult', 'result'] as const;

export type GameScreenKey = (typeof GameScreenKey)[number];

export const GameScreen = {
  lobby: <GameLobby />,
  turnAction: (
    <>
      <GameHeader />
      <GameTurnAction />
    </>
  ),
  turnResult: (
    <>
      <GameHeader />
      <GameTurnResult />
    </>
  ),
  result: <GameResult />,
} satisfies { [key in GameScreenKey]: JSX.Element };

export const PickCount = {
  EASY: 3,
  NORMAL: 4,
  HARD: 4,
  VERY_HARD: 6,
};

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

// 問題文に表示するために勝敗条件をマッピング
export const LabeledHighLow = {
  HIGH: '多い',
  LOW: '少ない',
} satisfies Record<(typeof HighLow)[number], string>;

export const LabeledTurnResult = {
  WIN: 'WIN',
  LOSE: 'LOSE',
  DRAW: 'DRAW',
} satisfies { [key in GameResultType]: string };
