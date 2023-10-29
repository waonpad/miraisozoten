import { GameResult } from 'schema/dist/todofuken/game';
import { Button } from 'ui/components/ui/button';

import { useGame } from '../../hooks/use-game';
import { GameBattleDisplay } from '../game-battle-display';

export const GameBattle = () => {
  const { game, changeScreenNextTurn, changeScreenResult } = useGame();

  if (!game) throw new Error('game is not found');

  const currentTurn = game.logs[game.logs.length - 1];

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
      label: '引き分け！？！？！？',
      fun: () => console.log('引き分け時にどうするのか決める'),
    },
  } satisfies { [key in GameResult]: unknown };

  const handleClickChangeScreen = () => {
    resultSwitcher[currentTurn.result].fun();
  };

  return (
    <>
      <GameBattleDisplay prefecture={game.prefecture} opponent={currentTurn.opponent} />
      {currentTurn.result && (
        <Button onClick={handleClickChangeScreen}>
          {resultSwitcher[currentTurn.result].label}
        </Button>
      )}
      {/* Factorの選択と対戦相手の選択は同じ画面で行う？ */}
    </>
  );
};
