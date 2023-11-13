import { usePrefectures } from '@/pages/(prefectures)/_/api/get-prefectures';
import { assert } from '@/utils/asset';

import { useGame } from '../../hooks/use-game';
import { useGameTurnAction } from '../../hooks/use-game-turn-action';
import { getAllFactors } from '../../utils/gat-all-factors';
import { GameBattleDisplayWithOpponentSelect } from '../game-battle-display-with-opponent-select';
import { GameTurnFactorSelect } from '../game-turn-factor-select';
import { GameTurnQuestion } from '../game-turn-question';

/**
 * @description
 * ターンの行動を決める画面 \
 * ランダムでhigh-lowが決まっており、ユーザーは対戦相手県と使用データを選択する
 */
export const GameTurnAction = () => {
  const { game } = useGame();
  assert(game);

  const { turnAction, setTurnAction, submitTurnAction } = useGameTurnAction();

  // 都道府県のデータを取得
  const prefecturesQuery = usePrefectures();
  const prefectures = prefecturesQuery.data!;

  /**
   * @description
   * 選択肢一覧に表示できるデータを計算した結果
   */
  const factors = getAllFactors(prefectures, game);

  /**
   * @description
   * 使用するデータを選択したら、ステートに反映する関数
   */
  const handleClcikSelectFactor = (factor: ReturnType<typeof getAllFactors>[number]) => {
    setTurnAction((prev) => ({
      ...prev,
      factorPrefectureId: factor.prefecture.id,
      factorName: factor.name,
    }));
  };

  /**
   * @description
   * 対戦相手の都道府県を選択したら、ターンの行動を決定して送信する関数
   */
  const handleClickSelectOpponent = (opponentId: number) => {
    submitTurnAction({
      ...turnAction,
      opponentId,
    });
  };

  return (
    <>
      {/* 見方都道府県と、ターンの相手を選択するエリアのまとまり */}
      <GameBattleDisplayWithOpponentSelect
        prefecture={findById(prefectures, turnAction.factorPrefectureId ?? game.prefectureId)!}
        neighbors={game.neighbors}
        disabled={turnAction.factorPrefectureId === undefined}
        handleClickSelectOpponent={handleClickSelectOpponent}
      />
      {/* 問題文 */}
      <GameTurnQuestion highLow={turnAction.highLow!} />
      {/* 要素を選択するエリア */}
      <GameTurnFactorSelect factors={factors} handleClickSelectFactor={handleClcikSelectFactor} />
    </>
  );
};

/**
 * コードが見にくかったので分けた
 */
const findById = <T extends { id: number }>(array: T[], id: number) =>
  array.find((item) => item.id === id);
