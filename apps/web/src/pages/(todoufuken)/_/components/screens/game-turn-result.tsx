import { Button } from 'ui/components/ui/button';

import { usePrefectures } from '@/pages/(prefectures)/_/api/get-prefectures';
import { assert } from '@/utils/asset';

import { LabeledTurnResult } from '../../config/game';
import { useGame } from '../../hooks/use-game';
import { getTurnAllyFactor } from '../../utils/get-turn-ally-factor';
import { getTurnOpponentFactor } from '../../utils/get-turn-opponent-factor';
import { GameBattleDisplay } from '../game-battle-display';

/**
 * @description
 * ターンの結果を表示する画面 \
 * 勝敗結果と、自分と相手のデータを表示する
 */
export const GameTurnResult = () => {
  const { game, changeScreenNextTurn, changeScreenResult } = useGame();
  assert(game);

  // 都道府県のデータを取得
  const prefecturesQuery = usePrefectures();
  const prefectures = prefecturesQuery.data!;

  /**
   * @description
   * 現在のターンの情報 \
   * ターンの行動を送信した後にゲームの状態が更新されるため、最後のログは現在のターンの情報
   */
  const currentTurn = game.logs[game.logs.length - 1];

  /**
   * @description
   * 現在のターンに自分が使用した都道府県
   */
  const currentTurnAllyPrefecture = prefectures.find(
    (prefecture) => prefecture.id === currentTurn.factorPrefectureId
  )!;

  const handleClickNextTurn = () => changeScreenNextTurn();

  const handleClickChangeScreenResult = () => changeScreenResult();

  /**
   * @description
   * 現在のターンに自分が使用した統計データ
   */
  const allyFactor = getTurnAllyFactor(prefectures, game, currentTurn.factorName);

  /**
   * @description
   * 現在のターンに使用した統計データの相手県側のデータ
   */
  const opponentFactor = getTurnOpponentFactor({
    factorName: currentTurn.factorName,
    prefectures,
    prefectureId: currentTurn.opponentId, // 相手の都道府県ID
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
