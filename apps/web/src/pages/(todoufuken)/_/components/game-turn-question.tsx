import { PrefectureResponse } from 'schema/dist/prefecture';
import { HighLow } from 'schema/dist/todoufuken/game';

import { LabeledHighLow } from '../config/game';

export type GameTurnQuestionProps = {
  highLow: HighLow;
  opponentPrefecture: PrefectureResponse;
};

/**
 * @description
 * 問題文を表示するコンポーネント
 */
export const GameTurnQuestion = ({ highLow, opponentPrefecture }: GameTurnQuestionProps) => {
  return (
    <div>
      {opponentPrefecture.name}
      より {LabeledHighLow[highLow]}のはどれ？
    </div>
  );
};
