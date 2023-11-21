import { useState } from 'react';

import { HighLow } from 'schema/dist/todoufuken/game';
import { CreateGameLogInput, CreateGameLogInputSchema } from 'schema/dist/todoufuken/game/log';

import { queryClient, QUERY_KEYS } from '@/lib/react-query';
import { randomElement } from '@/utils/random';

import { useSubmitGameTurnAction } from '../api/submit-game-turn-action';

import { useGame } from './use-game';

/**
 * @description
 * ターンの行動を管理するフック
 */
export const useGameTurnAction = () => {
  const { game, changeScreen } = useGame();

  const submitGameTurnActionMutation = useSubmitGameTurnAction();

  /**
   * 初期値に勝敗条件をランダムで設定して、ターンの行動を記録するステートを作成
   */
  const [turnAction, setTurnAction] = useState<Partial<CreateGameLogInput>>({
    highLow: randomElement([...HighLow]),
  });

  /**
   * @description
   * ターンの行動を送信する関数
   */
  const submitTurnAction = async (turnAction: Partial<CreateGameLogInput>) => {
    // バリデーション
    const data = CreateGameLogInputSchema.parse(turnAction);

    // ターンのアクションを送信
    const res = await submitGameTurnActionMutation.mutateAsync({
      id: game!.id,
      data,
    });

    if (res) {
      // ゲームのデータ取得を明示的に行い、待機する
      await queryClient.invalidateQueries([QUERY_KEYS.TODOUFUKEN_GAMES, res.gameId]);

      // ゲームのデータが取得できたら画面を遷移する
      changeScreen('turnResult');
    } else {
      throw new Error();
    }
  };

  return {
    turnAction,
    setTurnAction,
    submitTurnAction,
  };
};
