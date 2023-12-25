import { render, screen } from '@/test/utils';

import { GameTurnFactorSelect } from './game-turn-factor-select';

vi.mock('../hooks/use-game', () => ({
  useGame: () => ({
    game: {
      hideData: false,
    },
  }),
}));

describe('GameTurnFactorSelect', async () => {
  it('should display the correct data for each turn, and branch the display of data based on the difficulty of the game', () => {
    const mockFactors = [
      {
        prefecture: { name: '東京都' },
        label: '人口',
        value: '1000万人',
        unit: '人',
      },
      {
        prefecture: { name: '大阪府' },
        label: '面積',
        value: '2000平方キロメートル',
        unit: '平方キロメートル',
      },
    ];

    const mockHandleClickSelectFactor = vi.fn();

    render(
      <GameTurnFactorSelect
        factors={mockFactors}
        handleClickSelectFactor={mockHandleClickSelectFactor}
      />
    );

    // 各ターンに使用するデータが正しく表示されていることを確認
    expect(screen.getByText('東京都人口')).toBeInTheDocument();
    expect(screen.getByText('1000万人')).toBeInTheDocument();
    expect(screen.getByText('大阪府面積')).toBeInTheDocument();
    expect(screen.getByText('2000平方キロメートル')).toBeInTheDocument();

    // ゲームの難易度によってデータの表示が分岐していることを確認
    // ここでは、hideDataがfalseなので、データが表示されていることを確認
    expect(screen.queryByText('1000万人')).not.toBeNull();
    expect(screen.queryByText('2000平方キロメートル')).not.toBeNull();
  });
});
