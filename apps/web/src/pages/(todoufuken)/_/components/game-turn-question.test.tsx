import { HighLow } from 'schema/dist/todoufuken/game';

import { render, screen } from '@/test/utils';

import { LabeledHighLow } from '../config/game';

import { GameTurnQuestion, GameTurnQuestionProps } from './game-turn-question';

describe('GameTurnQuestion', () => {
  it('should render the correct question for each highLow value', () => {
    Object.entries(LabeledHighLow).forEach(([highLow, label]) => {
      const mockProps: GameTurnQuestionProps = {
        highLow: highLow as HighLow,
      };

      render(<GameTurnQuestion {...mockProps} />);

      // 期待する問題文が表示されていることを確認
      expect(screen.getByText(`他の都道府県より${label}そうなのはどれ？`)).toBeInTheDocument();
    });
  });
});
