import { HighLow } from 'schema/dist/todoufuken/game';

import { LabeledHighLow } from '../config/game';

export type GameTurnQuestionProps = {
  highLow: HighLow;
};

/**
 * @description
 * 問題文を表示するコンポーネント
 */
export const GameTurnQuestion = ({ highLow }: GameTurnQuestionProps) => {
  return (
    <div className="text-xl sm:text-2xl lg:text-3xl">
      他の都道府県より{LabeledHighLow[highLow]}そうなのはどれ？
    </div>
  );
};
