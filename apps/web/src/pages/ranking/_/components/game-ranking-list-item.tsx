import { GameResponse } from 'schema/dist/todoufuken/game';

// TODO: ランキングの順位を取得する方法が今のところないので、後で実装する
export const InfiniteGameRankingListItem = ({}: { gameRanking: GameResponse }) => {
  return (
    <div>
      <div>順位</div>
      <div>名前</div>
      <div>タイム</div>
      <div>ミス数</div>
    </div>
  );
};
