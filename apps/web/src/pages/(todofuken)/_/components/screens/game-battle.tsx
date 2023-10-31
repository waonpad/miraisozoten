import { GameResult } from 'schema/dist/todofuken/game';
import { Button } from 'ui/components/ui/button';

import { usePrefectures } from '../../api/get-prefectures';
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
      fun: changeScreenNextTurn,
    },
    LOSE: {
      label: '敗北 結果を見る',
      fun: changeScreenResult,
    },
    DRAW: {
      label: '引き分け 次の対戦へ',
      fun: changeScreenNextTurn,
    },
  } satisfies { [key in GameResult]: unknown };

  const handleClickChangeScreen = () => {
    resultSwitcher[currentTurn.result].fun();
  };

  return (
    <>
      <GameBattleDisplay prefecture={currentTurnAllyPrefecture} opponent={currentTurn.opponent} />
      {currentTurn.result && (
        <Button onClick={handleClickChangeScreen}>
          {resultSwitcher[currentTurn.result].label}
        </Button>
      )}
      {/* Factorの選択と対戦相手の選択は同じ画面で行う？ */}
    </>
  );
};
