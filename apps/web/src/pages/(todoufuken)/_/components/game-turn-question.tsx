import { useMemo } from 'react';

import { HighLow } from 'schema/dist/todoufuken/game';

export type GameTurnQuestionProps = {
  highLow: HighLow;
};

const MESSAGES = {
  HIGH: ['HIGHテキスト1', 'HIGHテキスト2', 'HIGHテキスト3'],
  LOW: ['LOWテキスト1', 'LOWテキスト2', 'LOWテキスト3'],
} satisfies {
  [key in HighLow]: [string, ...string[]];
};

const randomMessage = <T extends keyof typeof MESSAGES>(
  hishLow: T
): (typeof MESSAGES)[T][number] => {
  // どちらかの配列からランダムに一つ取得する
  return MESSAGES[hishLow][Math.floor(Math.random() * MESSAGES[hishLow].length)];
};

/**
 * @description
 * 問題文を表示するコンポーネント
 */
export const GameTurnQuestion = ({ highLow }: GameTurnQuestionProps) => {
  const message = useMemo(() => randomMessage(highLow), [highLow]);

  return <div className="text-xl sm:text-2xl lg:text-3xl">{message}</div>;
};
