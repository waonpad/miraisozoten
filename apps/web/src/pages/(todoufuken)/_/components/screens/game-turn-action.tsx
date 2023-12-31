import { useEffect, useMemo } from 'react';

import { useFadeTransition } from '@/components/transitions/fade-transition/use-fade-transition';
import { useFusumaTransition } from '@/components/transitions/fusuma-transition/use-fusuma-transition';
import { useSound } from '@/lib/use-sound/use-sound';
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
  const fusumaTransition = useFusumaTransition();

  const fadeTransition = useFadeTransition();

  const { game } = useGame();
  assert(game);

  const { playClick } = useSound();

  const { turnAction, setTurnAction, submitTurnAction } = useGameTurnAction();

  // 都道府県のデータを取得
  const prefecturesQuery = usePrefectures();

  useEffect(() => {
    // 都道府県のデータが取得できたら、ふすまを開く
    if (!fusumaTransition.isOpen && !!prefecturesQuery.data) {
      // 実際のAPIだと処理がはやすぎてふすまが見えないので、1秒後に開く
      setTimeout(() => {
        fusumaTransition.openFusuma();
      }, 1000);
    }

    // 都道府県のデータが取得できたら、フェードを開く
    if (!fadeTransition.isOpen && !!prefecturesQuery.data) {
      fadeTransition.openFade();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prefectures = prefecturesQuery.data!;

  /**
   * @description
   * 選択肢一覧に表示できるデータを計算した結果
   */
  const factors = useMemo(() => {
    return getAllFactors(prefectures, game);
  }, [prefectures, game]);

  /**
   * @description
   * 使用するデータを選択したら、ステートに反映する関数
   */
  const handleClcikSelectFactor = (factor: ReturnType<typeof getAllFactors>[number]) => {
    playClick();

    setTurnAction((prev) => ({
      ...prev,
      // factorPrefectureId: factor.prefecture.id,
      factorPrefectureId: game.prefectureId, // WHY: Issue #231 応急処置
      factorName: factor.name,
    }));
  };

  /**
   * @description
   * 対戦相手の都道府県を選択したら、ターンの行動を決定して送信する関数
   */
  const handleClickSelectOpponent = (opponentId: number) => {
    playClick();

    submitTurnAction({
      ...turnAction,
      opponentId,
    });
  };

  return (
    <>
      <div className="flex grow flex-col gap-4 p-2 lg:p-3 lg:px-10">
        <div>
          {/* 見方都道府県と、ターンの相手を選択するエリアのまとまり */}
          <GameBattleDisplayWithOpponentSelect
            prefecture={findById(prefectures, game.prefectureId)!}
            neighbors={game.neighbors}
            // disabled時の音はコンポーネント内部で再生している
            disabled={!turnAction.factorName}
            handleClickSelectOpponent={handleClickSelectOpponent}
          />
        </div>
        <div className="flex justify-center">
          <GameTurnQuestion highLow={turnAction.highLow!} />
        </div>
        {/* 問題文 */}
        <div className="flex grow">
          {/* 要素を選択するエリア */}
          <GameTurnFactorSelect
            factors={factors}
            handleClickSelectFactor={handleClcikSelectFactor}
            selectedFactorName={turnAction.factorName}
          />
        </div>
      </div>
    </>
  );
};

/**
 * コードが見にくかったので分けた
 */
const findById = <T extends { id: number }>(array: T[], id: number) =>
  array.find((item) => item.id === id);
