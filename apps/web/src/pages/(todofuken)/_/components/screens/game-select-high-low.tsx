import { Button } from 'ui/components/ui/button';

import { useGame } from '../../hooks/use-game';

export const GameSelectHighLow = () => {
  const game = useGame();

  const handleClickRandom = () => {
    const random = Math.random();
    if (random < 0.5) {
      game.turn.setHighLow('high');
    } else {
      game.turn.setHighLow('low');
    }
  };

  const handleClickChangeState = () => {
    game.changeStateNext();
  };

  return (
    <>
      <div>Game Select High Low</div>
      <Button onClick={handleClickRandom}>多い方か少ない方か抽選</Button>
      {game.data.turn.highLow && <div>多い方か少ない方か抽選結果: {game.data.turn.highLow}</div>}
      <Button onClick={handleClickChangeState} disabled={!game.data.turn.highLow}>
        次へ
      </Button>
    </>
  );
};
