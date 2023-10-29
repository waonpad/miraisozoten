import { Prefecture } from 'database';
import { PrefectureStatsConf, PrefectureStatsName } from 'schema/dist/prefecture';
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
  const prefectureStats = game?.hideData ? null : prefectureStatsQuery.data;

  // データを表示しなくてもどんなデータがあるかは必要なので、
  // 別で定義したオブジェクトに対して実際のデータをマッピングする
  // データを表示しない場合はnullのままで問題ない
  const factors = Object.values(PrefectureStatsConf)
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
