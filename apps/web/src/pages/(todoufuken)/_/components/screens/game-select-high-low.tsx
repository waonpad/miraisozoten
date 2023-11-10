import { Button } from 'ui/components/ui/button';

import { useGame } from '../../hooks/use-game';

export const GameSelectHighLow = () => {
  const { turnAct, setTurnAct, changeScreenNext } = useGame();

  const handleClickRandom = () => {
    const random = Math.random();
    setTurnAct((prev) => ({
      ...prev,
      highLow: random > 0.5 ? 'HIGH' : 'LOW',
    }));
  };

  const handlClickChnageScreenNext = () => {
    changeScreenNext();
  };

  return (
    <>
      <div>Game Select High Low</div>
      <Button onClick={handleClickRandom}>多い方か少ない方か抽選</Button>
      {turnAct.highLow && <div>多い方か少ない方か抽選結果: {turnAct.highLow}</div>}
      <Button onClick={handlClickChnageScreenNext} disabled={!turnAct.highLow}>
        次へ
      </Button>
    </>
  );
};
