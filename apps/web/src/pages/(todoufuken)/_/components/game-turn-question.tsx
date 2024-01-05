import { HighLow } from 'schema/dist/todoufuken/game';

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
      {highLow === 'HIGH' ? '隣接する県より多いのはどれ？' : '隣接する県より少ないのはどれ？'}
    </div>
  );
};
