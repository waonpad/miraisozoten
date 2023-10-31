import { Prefecture } from 'database';
import { PrefectureStatsName, PrefectureStatsConfig } from 'schema/dist/prefecture/stats';
import { GameDifficulty, GameDifficultyConfig } from 'schema/dist/todofuken/game';
import { Button } from 'ui/components/ui/button';

import { usePrefectureStats } from '../../api/get-prefecture-stats';
import { PickCount } from '../../config/game';
import { useGame } from '../../hooks/use-game';

export const GameSelectFactor = () => {
  const { game, changeScreenNext, setTurnAct } = useGame();

  if (!game) throw new Error('game is not found');

  // 都道府県のデータを取得
  const prefectureStatsQuery = usePrefectureStats({
    id: game?.prefecture?.id as Prefecture['id'],
    config: {
      // hideDataがtrueの場合データを取得する必要がない
      enabled: game?.hideData === false,
    },
  });

  // データを隠す目的はセキュリティのためではないため、JSで簡易的に隠してしまう
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const prefectureStats = game.hideData ? null : prefectureStatsQuery.data;

  // データを表示しなくてもどんなデータがあるかは必要なので、
  // 別で定義したオブジェクトに対して実際のデータをマッピングする
  // データを表示しない場合はnullのままで問題ない
  const factors = Object.values(PrefectureStatsConfig)
    .filter((conf) => {
      // そのデータを表示する最低難易度が、設定配列のどのindexにあるかを取得
      const prefectureStatsLowestEnableDifficultyIndex = GameDifficulty.indexOf(
        GameDifficultyConfig.prefectureStatsLowestEnableDifficulty[conf.name]
      );

      // ゲームの難易度が、設定配列のどのindexにあるかを取得
      const gameDifficultyIndex = GameDifficulty.indexOf(game.difficulty);

      // 表示する最低難易度が、ゲームの難易度以下なら表示する
      return prefectureStatsLowestEnableDifficultyIndex <= gameDifficultyIndex;
    })
    .map((conf) => {
      const stats = prefectureStats?.[conf.camel];

      return {
        name: conf.name,
        label: conf.label,
        value: stats,
        unit: conf.unit,
      };
    })
    // シャッフルしてから必要な数だけ取得
    .sort(() => Math.random() - 0.5)
    .slice(0, PickCount[game.difficulty]);

  const handleClcikSelectFactor = (factorName: PrefectureStatsName) => {
    setTurnAct((prev) => ({
      ...prev,
      factorName,
    }));

    changeScreenNext();
  };

  return (
    <div>
      {factors.map((factor, index) => (
        <Button key={index} onClick={() => handleClcikSelectFactor(factor.name)}>
          {factor.label}
          {!game.hideData && (
            <div>
              {factor.value}
              {factor.unit}
            </div>
          )}
        </Button>
      ))}
    </div>
  );
};
