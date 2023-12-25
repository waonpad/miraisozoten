// 一時スキップ

import { render, screen } from '@/test/utils';

import { GameHeader } from './game-header';

vi.mock('../hooks/use-game', () => ({
  useGame: () => ({ game: { id: '1' } }),
}));

vi.mock('@/router', () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock('../api/give-up-game', () => ({
  useGiveUpGame: () => ({ mutateAsync: vi.fn() }),
}));

describe('GameHeader', async () => {
  it('各コンポーネントを読み込み、表示するまでテストをする', async () => {
    render(<GameHeader />);

    // GameStatus, GiveUpIconButton, ConfirmGiveUpDialogがレンダリングされていることを確認
    const gameStatusText = '制覇数:\br / 47 ミス:タイム: NaN 分 NaN 秒'; // ここを適切なテキストに変更してください
    const gameStatus = await screen.findByText(gameStatusText);
    expect(gameStatus).toBeInTheDocument();

    const giveUpIconButtonText = 'ギブアップ'; // ここを適切なテキストに変更してください
    const giveUpIconButton = await screen.findByText(giveUpIconButtonText);
    expect(giveUpIconButton).toBeInTheDocument();

    const confirmGiveUpDialogText = 'Expected text from ConfirmGiveUpDialog'; // ここを適切なテキストに変更してください
    const confirmGiveUpDialog = await screen.findByText(confirmGiveUpDialogText);
    expect(confirmGiveUpDialog).toBeInTheDocument();
  });
});
