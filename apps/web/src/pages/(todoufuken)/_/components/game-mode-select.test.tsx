import { GameMode } from 'schema/dist/todoufuken/game';

import { render, screen, fireEvent } from '@/test/utils';

import { LabeledGameMode } from '../config/game';

import { GameModeSelect, GameModeSelectProps } from './game-mode-select';

describe('GameModeSelect', () => {
  it('should render buttons for each mode', () => {
    const mockProps: GameModeSelectProps = {
      handleClickGameMode: vi.fn(),
    };

    render(<GameModeSelect {...mockProps} />);

    // 各モードのボタンが表示されていることを確認
    Object.values(LabeledGameMode).forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('should call handleClickGameMode with the correct mode when a button is clicked', async () => {
    const handleClickGameMode = vi.fn();
    const mockProps: GameModeSelectProps = {
      handleClickGameMode,
    };

    render(<GameModeSelect {...mockProps} />);

    // 各モードのボタンがクリックされたときに、handleClickGameModeが正しいモードで呼び出されることを確認
    Object.entries(LabeledGameMode).forEach(([mode, label]) => {
      fireEvent.click(screen.getByText(label));
      expect(handleClickGameMode).toHaveBeenCalledWith(mode as GameMode);
    });
  });
});
