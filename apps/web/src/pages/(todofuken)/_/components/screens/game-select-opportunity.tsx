import { Prefecture } from 'prefecture/dist';
import { getPrefectureNeighbors } from 'prefecture/dist/utils';
import { Button } from 'ui/components/ui/button';

import { useGame } from '../../hooks/use-game';

export const GameSelectOpportunity = () => {
  const game = useGame();

  const neighbors = game.data.neighboringPrefectures;

  const handleClickChangeState = (neighbor: Prefecture) => {
    game.turn.setOpportunity(getPrefectureNeighbors([neighbor])[0]);

    game.changeStateNext();
  };

  return (
    <>
      {/*　マップを使うか、何かしらの方法で対戦相手候補を表示する */}
      {neighbors.map((neighbor) => (
        <Button key={neighbor.id} onClick={() => handleClickChangeState(neighbor)}>
          {neighbor.name}
        </Button>
      ))}
    </>
  );
};
