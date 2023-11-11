import { PrefectureResponse } from 'schema/dist/prefecture';
import { HighLow } from 'schema/dist/todoufuken/game';

// 問題文に表示するために勝敗条件をマッピング
const LabeledHighLow = {
  HIGH: '多い',
  LOW: '少ない',
} satisfies Record<(typeof HighLow)[number], string>;

export const GameTurnQuestion = ({
  highLow,
  opponentPrefecture,
}: {
  highLow: HighLow;
  opponentPrefecture: PrefectureResponse;
}) => {
  return (
    <div>
      {opponentPrefecture.name}
      より {LabeledHighLow[highLow]}のはどれ？
    </div>
  );
};
