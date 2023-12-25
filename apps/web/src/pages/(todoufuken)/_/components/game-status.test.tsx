import { render, screen } from '@/test/utils';

import { GameStatus } from './game-status';

vi.mock('../hooks/use-game', () => ({
  useGame: () => ({
    game: {
      startTime: new Date().getTime(),
      conqueredsCount: 10,
      missCount: 2,
      playTime: 120,
      logs: [],
    },
  }),
}));

describe('GameStatus', async () => {
  it('各値を表示できるかをテストする', async () => {
    await render(<GameStatus />);

    // 制覇数、ミス数、プレイ時間が正しく表示されていることを確認
    expect(screen.getByText('制覇数: 10 / 47')).toBeInTheDocument();
    expect(screen.getByText('ミス: 2')).toBeInTheDocument();
    expect(screen.getByText('タイム: 2分0秒')).toBeInTheDocument();
  });
});

// テストOK
