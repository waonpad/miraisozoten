import { render, screen } from '@/test/utils';

import { GameSettingSubmit, GameSettingSubmitProps } from './game-setting-submit';

describe('GameSettingSubmit', () => {
  it('難易度とモードを選んでいない時の動作を確認するテスト', async () => {
    const mockProps: GameSettingSubmitProps = {
      settings: { difficulty: null, mode: null },
      handleSubmit: vi.fn(),
    };

    render(<GameSettingSubmit {...mockProps} />);

    // 難易度とモードの選択メッセージが表示されていることを確認
    expect(screen.getByText('難易度を選択してください')).toBeInTheDocument();
    expect(screen.getByText('モードを選択してください')).toBeInTheDocument();
  });

  it('should enable the button when difficulty and mode are selected', async () => {
    const mockProps: GameSettingSubmitProps = {
      settings: { difficulty: 'easy', mode: 'mode1' },
      handleSubmit: vi.fn(),
    };

    render(<GameSettingSubmit {...mockProps} />);

    // ボタンが有効になっていることを確認
    expect(screen.getByText('都道府県選択へ')).not.toBeDisabled();
  });
});
