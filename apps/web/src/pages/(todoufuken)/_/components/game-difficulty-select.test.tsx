import { GameDifficulty } from 'schema/dist/todoufuken/game';

import { render, screen, fireEvent } from '@/test/utils';

import { LabeledGameDifficulty } from '../config/game';

import { GameDifficultySelect, GameDifficultySelectProps } from './game-difficulty-select';

describe('GameDifficultySelect', () => {
  it('should render buttons for each difficulty', async () => {
    const mockProps: GameDifficultySelectProps = {
      handleClickGameDifficulty: vi.fn(),
    };

    render(<GameDifficultySelect {...mockProps} />);

    // 各難易度のボタンが表示されていることを確認
    Object.values(LabeledGameDifficulty).forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('should call handleClickGameDifficulty with the correct difficulty when a button is clicked', () => {
    const handleClickGameDifficulty = vi.fn();
    const mockProps: GameDifficultySelectProps = {
      handleClickGameDifficulty,
    };

    render(<GameDifficultySelect {...mockProps} />);

    // 各難易度のボタンがクリックされたときに、handleClickGameDifficultyが正しい難易度で呼び出されることを確認
    Object.entries(LabeledGameDifficulty).forEach(([difficulty, label]) => {
      fireEvent.click(screen.getByText(label));
      expect(handleClickGameDifficulty).toHaveBeenCalledWith(difficulty as GameDifficulty);
    });
  });
});
