import { useEffect } from 'react';

import { Button } from 'ui/components/ui/button';

import { useGame } from '../../hooks/use-game';

export const GameSelectOpponent = () => {
  const { game, turnAct, setTurnAct, submitTurnAct } = useGame();

  if (!game) throw new Error('game is not found');

  const handleClickSelectOpponent = (opponentId: number) => {
    setTurnAct((prev) => ({
      ...prev,
      opponentId,
    }));
  };

  // 一旦雑にturnAct.opponentIdが変わったらsubmitTurnActする
  // stateの更新とそのstateの利用は同時にはできないため
  useEffect(() => {
    if (turnAct.opponentId) {
      submitTurnAct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turnAct.opponentId]);

  return (
    <>
      <div>{JSON.stringify(turnAct)}</div>
      {/*　マップを使うか、何かしらの方法で対戦相手候補を表示する */}
      {game.neighbors.map((neighbor) => (
        <Button key={neighbor.id} onClick={() => handleClickSelectOpponent(neighbor.id)}>
          {neighbor.name}
        </Button>
      ))}
    </>
  );
};
