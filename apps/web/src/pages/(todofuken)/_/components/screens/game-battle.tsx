import { useEffect } from 'react';

import { Prefecture, PrefectureWithNeighbors } from 'prefecture/dist';
import { Button } from 'ui/components/ui/button';

import { usePrefectureStats } from '../../api/get-prefecture-stats';
import { GameBattleResult } from '../../config/game';
import { useGame } from '../../hooks/use-game';
import { GameBattleDisplay } from '../game-battle-display';

export const GameBattle = () => {
  const game = useGame();

  const prefectureStatsQuery = usePrefectureStats({
    id: game.data.prefecture?.id as Prefecture['id'],
  });

  const opportunityStatsQuery = usePrefectureStats({
    id: game.data.turn.opportunity?.id as Prefecture['id'],
  });

  const battleTragetStatName = game.data.turn.factor?.name as string;

  const prefectureStat = Object.values(prefectureStatsQuery.data ?? {}).find(
    (stat) => stat.name === battleTragetStatName
  );
  const opportunityStat = Object.values(opportunityStatsQuery.data ?? {}).find(
    (stat) => stat.name === battleTragetStatName
  );

  useEffect(() => {
    console.log(prefectureStat, opportunityStat);

    // データの取得を待つ
    if (!prefectureStat || !opportunityStat) return;

    const result =
      prefectureStat?.value === opportunityStat?.value
        ? 'draw'
        : prefectureStat?.value > opportunityStat?.value
        ? 'win'
        : 'lose';

    game.turn.setResult(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefectureStat, opportunityStat]);

  const resultSwitcher = {
    win: {
      label: '勝利 次の対戦へ',
      fun: game.changeStateNextTurn,
    },
    lose: {
      label: '敗北 結果を見る',
      fun: game.changeStateResult,
    },
    draw: {
      label: '引き分け！？！？！？',
      fun: () => console.log('引き分け時にどうするのか決める'),
    },
  } satisfies { [key in GameBattleResult]: unknown };

  const handleClickChangeState = () => {
    if (!game.data.turn.result) return;

    resultSwitcher[game.data.turn.result].fun();
  };

  return (
    <>
      <GameBattleDisplay
        prefecture={game.data.prefecture as PrefectureWithNeighbors}
        opportunity={game.data.turn.opportunity as PrefectureWithNeighbors}
      />
      {game.data.turn.result && (
        <Button onClick={handleClickChangeState}>
          {resultSwitcher[game.data.turn.result].label}
        </Button>
      )}
      {/* Factorの選択と対戦相手の選択は同じ画面で行う？ */}
    </>
  );
};
