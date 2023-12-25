import { render, screen, fireEvent } from '@/test/utils';

import { GameModeInfo } from './game-mode-info';

describe('GameModeInfo', async () => {
  it('ツールチップの表示とそれに伴って期待されるContent内のテキスト表示のテスト', async () => {
    await render(<GameModeInfo />);

    // ボタンをクリック
    fireEvent.click(screen.getByText('モードの説明'));

    // ツールチップが表示されるのを待つ
    await new Promise((r) => setTimeout(r, 1000));

    // ツールチップが表示され、期待するテキストが含まれていることを確認
    const tooltipText = screen.getByText('モードについての説明');
    expect(tooltipText).toBeInTheDocument();
  });
});

// うまく修正出来なかった、ツールチップの表示とそれに伴って期待されるContent内のテキストを読み込む動作が出来なかった
