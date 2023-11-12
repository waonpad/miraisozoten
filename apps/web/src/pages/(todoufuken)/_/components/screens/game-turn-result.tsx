import { PrefectureResponse } from 'schema/dist/prefecture';
import { PrefectureStatsName } from 'schema/dist/prefecture/stats';
import { GameResponse } from 'schema/dist/todoufuken/game';
import { Button } from 'ui/components/ui/button';

import { usePrefectures } from '@/pages/(prefectures)/_/api/get-prefectures';
import { assert } from '@/utils/asset';

import { LabeledTurnResult } from '../../config/game';
import { useGame } from '../../hooks/use-game';
import { computeFactors } from '../../utils/compute-factors';
import { GameBattleDisplay } from '../game-battle-display';

export const GameTurnResult = () => {
  const { game, changeScreenNextTurn, changeScreenResult } = useGame();
  assert(game);

  const prefecturesQuery = usePrefectures();
  const prefectures = prefecturesQuery.data!;

  const currentTurn: GameResponse['logs'][number] = game.logs[game.logs.length - 1];

  const currentTurnAllyPrefecture = prefectures.find(
    (prefecture) => prefecture.id === currentTurn.factorPrefectureId
  )!;

  const handleClickNextTurn = () => changeScreenNextTurn();

  const handleClickChangeScreenResult = () => changeScreenResult();

  const allyFactor = getTurnFactor({
    factorName: currentTurn.factorName,
    prefectures,
    prefectureId: currentTurn.factorPrefectureId,
  });

  const opponentFactor = getTurnFactor({
    factorName: currentTurn.factorName,
    prefectures,
    prefectureId: currentTurn.opponentId,
  });

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

const getTurnFactor = ({
  factorName,
  prefectures,
  prefectureId,
}: {
  factorName: PrefectureStatsName;
  prefectures: PrefectureResponse[];
  prefectureId: PrefectureResponse['id'];
}) => {
  return computeFactors(
    prefectures.find((prefecture) => prefecture.id === prefectureId)!,
    {
      difficulty: 'VERY_HARD',
      hideData: false,
    } as GameResponse, // HACK: 関数をハックしている
    {
      selectFactorNames: [factorName],
    }
  )[0];
};
