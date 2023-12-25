import { render, screen } from '@/test/utils';

import { GameDifficultyInfo } from './game-difficulty-info';

describe('GameDifficultyInfo', () => {
  it('難易度のTipsを表示するテスト', async () => {
    render(<GameDifficultyInfo />);

    const button = screen.getByText('難易度の説明');
    expect(button).toBeInTheDocument();

    // ボタンをクリックしてツールチップを表示
    button.click();

    const tooltipContent = screen.getByText('難易度についての説明');
    expect(tooltipContent).toBeInTheDocument();
  });
});
