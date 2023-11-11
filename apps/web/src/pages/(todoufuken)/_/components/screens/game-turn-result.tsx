import { GameResponse, GameResult } from 'schema/dist/todoufuken/game';
import { Button } from 'ui/components/ui/button';

import { usePrefectures } from '@/pages/(prefectures)/_/api/get-prefectures';

import { useGame } from '../../hooks/use-game';
import { computeFactors } from '../../utils/compute-factors';
import { GameBattleDisplay } from '../game-battle-display';

const LabeledTurnResult = {
  WIN: 'WIN',
  LOSE: 'LOSE',
  DRAW: 'DRAW',
} satisfies { [key in GameResult]: string };

export const GameTurnResult = () => {
  const { game, changeScreenNextTurn, changeScreenResult } = useGame();

  if (!game) throw new Error('game is not found');

  const prefecturesQuery = usePrefectures();

  const prefectures = prefecturesQuery.data;

  if (!prefectures) return <div>Loading...</div>;

  const currentTurn: GameResponse['logs'][number] = game.logs[game.logs.length - 1];

  const currentTurnAllyPrefecture = prefectures.find(
    (prefecture) => prefecture.id === currentTurn.factorPrefectureId
  ) as (typeof prefectures)[number];

  const handleClickNextTurn = () => {
    changeScreenNextTurn();
  };

  const handleClickChangeScreenResult = () => {
    changeScreenResult();
  };

  const allyFactor = computeFactors(
    prefectures.find((prefecture) => prefecture.id === currentTurn.factorPrefectureId)!,
    {
      difficulty: 'VERY_HARD',
      hideData: false,
    } as GameResponse, // 関数をハックしているため、リファクタリングが必要
    {
      selectFactorNames: [currentTurn.factorName],
    }
  )[0];

  const opponentFactor = computeFactors(
    prefectures.find((prefecture) => prefecture.id === currentTurn.opponentId)!,
    {
      difficulty: 'VERY_HARD',
      hideData: false,
    } as GameResponse, // 関数をハックしているため、リファクタリングが必要
    {
      selectFactorNames: [currentTurn.factorName],
    }
  )[0];

  return (
    <>
      <GameBattleDisplay prefecture={currentTurnAllyPrefecture} opponent={currentTurn.opponent} />
      {/* ターンの結果 */}
      {/* あとからモーダルにする */}
      {game.state === 'FINISHED' ? (
        <>
          <div>おめでとう！</div>
          <Button onClick={handleClickChangeScreenResult}>結果を見る！</Button>
        </>
      ) : (
        <>
          <div>{LabeledTurnResult[currentTurn.result]}</div>
          <Button onClick={handleClickNextTurn}>次へ</Button>
        </>
      )}
      {/* 自分が利用したデータと相手のデータを表示する */}
      <div>
        <div>自分の回答</div>
        {/* 都道府県名 */}
        {prefectures.find((prefecture) => prefecture.id === currentTurn.factorPrefectureId)?.name}
        {/* 都道府県のデータ */}
        {JSON.stringify(allyFactor)}
      </div>
      <div>
        <div>相手の回答</div>
        {/* 都道府県名 */}
        {prefectures.find((prefecture) => prefecture.id === currentTurn.opponentId)?.name}
        {/* 都道府県のデータ */}
        {JSON.stringify(opponentFactor)}
      </div>
    </>
  );
};
