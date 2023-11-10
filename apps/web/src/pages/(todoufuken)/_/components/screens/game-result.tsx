import { useGame } from '../../hooks/use-game';

export const GameResult = () => {
  const game = useGame();

  console.log('render GameResult', game);

  return <div>GameResult</div>;
};
