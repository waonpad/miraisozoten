import { getPrefectures } from '@/pages/(prefectures)/_/api/get-prefectures';
import { render, screen } from '@/test/utils';

import { GameBattleDisplayWithOpponentSelect } from './game-battle-display-with-opponent-select';

describe('GameBattleDisplayWithOpponentSelect', async () => {
  // 内部に非同期関数があるので async をつける
  it('このコンポーネントを利用して対戦相手の都道府県を表示するテスト', async () => {
    // usePrefecturesはここでは使えないため、getPrefecturesで直接データを取得する
    const prefectures = await getPrefectures();

    const targetPrefecture = prefectures[12];
    const targetPrefectureNeighbors = targetPrefecture.neighbors;

    // @/test/utils のrenderは非同期関数なので await が必要
    await render(
      <GameBattleDisplayWithOpponentSelect
        prefecture={targetPrefecture}
        neighbors={targetPrefectureNeighbors}
        disabled={false}
        handleClickSelectOpponent={() => {}}
      />
    );

    targetPrefectureNeighbors.forEach((neighbor) => {
      const button = screen.getByText(neighbor.name);
      expect(button).toBeInTheDocument();
    });
  });
});
