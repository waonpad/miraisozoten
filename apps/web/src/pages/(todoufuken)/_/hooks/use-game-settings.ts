import { useState } from 'react';

import { CreateGameInput, CreateGameInputSchema } from 'schema/dist/todoufuken/game';

import { COOKIE_NAMES } from '@/constants/cookie-names';
import { queryClient, QUERY_KEYS } from '@/lib/react-query';
import { setCookie } from '@/utils/cookie/set-cookie';

import { useStartGame } from '../api/start-game';

import { useGame } from './use-game';

export const useGameSettings = () => {
  const { setGameId, changeScreen } = useGame();

  const startGameMutation = useStartGame();

  const [gameSettings, setGameSettings] = useState<Partial<CreateGameInput>>({});

  // ログインしていない場合どうする？
  const startGame = async (gameSettings: Partial<CreateGameInput>) => {
    // バリデーション
    const data = CreateGameInputSchema.parse(gameSettings);

    // ゲームを作成
    const res = await startGameMutation.mutateAsync({ data });

    if (res) {
      // ゲームIDを保存して、ゲームを取得するクエリを有効化する
      setGameId(res.id);
      // ここで初めてゲームIDが発行されるので、cookieに保存する
      // ゲームの設定段階では、状態を保存していない(バックエンドに何も送っていないので)
      setCookie(COOKIE_NAMES.CURRENT_TODOUFUKEN_GAME_ID, res.id);

      // ゲームのデータ取得を明示的に行い、待機する
      await queryClient.invalidateQueries([QUERY_KEYS.TODOUFUKEN_GAMES, res.id]);

      // ゲームのデータが取得できたら画面を遷移する
      changeScreen('turnAction');
    } else {
      throw new Error('ゲームの作成に失敗しました');
    }
  };

  return {
    gameSettings,
    setGameSettings,
    startGame,
  };
};
