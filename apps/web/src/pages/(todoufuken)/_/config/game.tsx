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

/**
 * @description
 * どの画面を表示するかを、このキーを利用してコントロールする
 */
export const GameScreenKey = ['lobby', 'turnAction', 'turnResult', 'result'] as const;

export type GameScreenKey = (typeof GameScreenKey)[number];

/**
 * @description
 * キーに対して、どのような画面を表示するかが定義されている
 */
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
} satisfies Record<GameScreenKey, JSX.Element>;

/**
 * @description
 * ゲームの難易度に応じて、選択肢をどれだけ表示するかの設定
 */
export const FactorPickCount = {
  EASY: 3,
  NORMAL: 4,
  HARD: 4,
  VERY_HARD: 6,
} as const satisfies Record<GameDifficulty, number>;

/**
 * @description
 * ゲームの難易度を画面に表示する際、どのような文字列にするかの設定
 */
export const LabeledGameDifficulty = {
  EASY: 'easy',
  NORMAL: 'normal',
  HARD: 'hard',
  VERY_HARD: 'very hard',
} as const satisfies Record<GameDifficulty, string>;

/**
 * @description
 * ゲームのモードを画面に表示する際、どのような文字列にするかの設定
 */
export const LabeledGameMode = {
  REGIONAL: '地方制覇',
  NATIONWIDE: '全国制覇',
} as const satisfies Record<GameMode, string>;

/**
 * @description
 * 問題文に表示する際、どのような文字列にするかの設定
 */
export const LabeledHighLow = {
  HIGH: '多',
  LOW: '少な',
} satisfies Record<(typeof HighLow)[number], string>;

/**
 * @description
 * ゲームの結果を画面に表示する際、どのような文字列にするかの設定
 */
export const LabeledTurnResult = {
  WIN: 'WIN',
  LOSE: 'LOSE',
  DRAW: 'DRAW',
} satisfies Record<GameResultType, string>;
