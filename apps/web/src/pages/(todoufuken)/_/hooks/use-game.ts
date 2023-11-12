import { useEffect, useState } from 'react';

import { COOKIE_NAMES } from '@/constants/cookie-names';
import { getCookie } from '@/utils/cookie/get-cookie';
import { removeCookie } from '@/utils/cookie/remove-cookie';
import { createCtx } from '@/utils/create-ctx';

import { useGame as useGameQuery } from '../api/get-game';
import { GameScreenKey } from '../config/game';

const [createdUseGame, SetGameProvider] = createCtx<ReturnType<typeof useGameCtx>>();

export { SetGameProvider };

export const useGame = createdUseGame;

export const useGameCtx = () => {
  const [gameId, setGameId] = useState<string | null>(
    getCookie(COOKIE_NAMES.CURRENT_TODOUFUKEN_GAME_ID)
  );

  // ゲームを1度でも取得したか判別するフラグ
  const [isFetched, setIsFetched] = useState(false);

  const gameQuery = useGameQuery({
    id: gameId as string,
    // ゲームを作成してIDが返ってきたらクエリを有効化する
    config: { enabled: !!gameId },
  });

  const [screen, setScreen] = useState<GameScreenKey | null>(!gameId ? 'lobby' : null);

  const changeScreen = (screen: GameScreenKey) => {
    setScreen(screen);
  };

  const changeScreenNext = () => {
    setScreen((screen) => {
      if (!screen) throw new Error();

      return GameScreenKey[GameScreenKey.indexOf(screen) + 1];
    });
  };

  const changeScreenNextTurn = () => {
    setScreen('turnAction');
  };

  const changeScreenResult = () => {
    // cookieから削除する
    removeCookie(COOKIE_NAMES.CURRENT_TODOUFUKEN_GAME_ID);

    setScreen('result');
  };

  useEffect(() => {
    // フェッチは成功したが、ゲームが存在しない場合
    // cookieをクライアントが触るか、一度ログアウトしないといけないため、ここで削除する
    if (gameQuery.isSuccess && !gameQuery.data) {
      removeCookie(COOKIE_NAMES.CURRENT_TODOUFUKEN_GAME_ID);

      throw new Error('Game not found');
    }

    // 初めてゲームを取得したとき
    if (gameQuery.data && !isFetched) {
      setScreen(
        // 終了していたら結果画面に飛ばす
        gameQuery.data.state === 'FINISHED'
          ? 'result'
          : // 途中だったらそこから
          gameQuery.data.state === 'PLAYING'
          ? 'turnAction'
          : // どれでもなければロビー(どれでも無い場合は今のところ起こらない)
            'lobby'
      );

      // ゲームを1度でも取得したことを記録
      setIsFetched(true);
    }
  }, [gameQuery.data, gameQuery.isSuccess, isFetched]);

  return {
    enabled: !!screen, // プロバイダを有効化するフラグ
    game: gameQuery.data
      ? {
          ...gameQuery.data,
          conqueredsCount: gameQuery.data.conquereds.length,
          missCount: gameQuery.data.logs.filter((log) => log.result === 'LOSE').length,
          startTime: new Date(gameQuery.data.createdAt).getTime(),
          latestLogTime:
            gameQuery.data.logs.length > 0
              ? new Date(gameQuery.data.logs[gameQuery.data.logs.length - 1].createdAt).getTime()
              : new Date(gameQuery.data.createdAt).getTime(),
          playTime:
            gameQuery.data.logs.length > 0
              ? (new Date(gameQuery.data.logs[gameQuery.data.logs.length - 1].createdAt).getTime() -
                  new Date(gameQuery.data.createdAt).getTime()) /
                1000
              : 0,
        }
      : undefined,
    screen,
    setGameId,
    changeScreen,
    changeScreenNext,
    changeScreenNextTurn,
    changeScreenResult,
  };
};
