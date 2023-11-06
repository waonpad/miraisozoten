import { GameResult } from 'schema/dist/todofuken/game';
import { Button } from 'ui/components/ui/button';

import { usePrefectures } from '@/pages/(prefectures)/_/api/get-prefectures';

import { useGame } from '../../hooks/use-game';
import { GameBattleDisplay } from '../game-battle-display';

export const GameBattle = () => {
  const { game, changeScreenNextTurn, changeScreenResult } = useGame();

  if (!game) throw new Error('game is not found');

  const prefecturesQuery = usePrefectures();

  if (!prefecturesQuery.data) return <div>Loading...</div>;

  const currentTurn = game.logs[game.logs.length - 1];

  const currentTurnAllyPrefecture = prefecturesQuery.data.find(
    (prefecture) => prefecture.id === currentTurn.factorPrefectureId
  ) as (typeof prefecturesQuery.data)[number];

  const resultSwitcher = {
    WIN: {
      label: '勝利 次の対戦へ',
      fn: changeScreenNextTurn,
    },
    LOSE: {
      label: '敗北 次の対戦へ',
      fn: changeScreenNextTurn,
    },
    DRAW: {
      label: '引き分け 次の対戦へ',
      fn: changeScreenNextTurn,
    },
  } satisfies { [key in GameResult]: unknown };

  const handleClickChangeScreen = () => {
    resultSwitcher[currentTurn.result].fn();
  };

  return (
    <>
      <GameBattleDisplay prefecture={currentTurnAllyPrefecture} opponent={currentTurn.opponent} />
      {game.state === 'FINISHED' ? (
        <Button onClick={changeScreenResult}>おめでとう！結果を見る！</Button>
      ) : (
        <Button onClick={handleClickChangeScreen}>
          {resultSwitcher[currentTurn.result].label}
        </Button>
      )}
    </>
  );
};
