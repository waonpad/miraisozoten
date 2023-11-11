import { GameResponse } from 'schema/dist/todoufuken/game';

export const InfiniteGameArchiveListItem = ({ gameArchive }: { gameArchive: GameResponse }) => {
  return <div>{JSON.stringify(gameArchive)}</div>;
};
