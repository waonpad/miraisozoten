import { useEffect, useState } from 'react';

import { Game } from 'database';

import { COOKIE_NAMES } from '@/constants/cookie-names';
import { getCookie } from '@/utils/cookie/get-cookie';
import { removeCookie } from '@/utils/cookie/remove-cookie';
import { createCtx } from '@/utils/create-ctx';

import { useGame as useGameQuery } from '../api/get-game';
import { GameScreenKey } from '../config/game';

const [createdUseGame, SetGameProvider] = createCtx<ReturnType<typeof useGameCtx>>();
export { SetGameProvider };

/**
 * @description
 * ゲームの情報と、画面遷移を管理するコンテキスト
 */
export const useGame = createdUseGame;

/**
 * @description
 * useGameの実態
 */
export const useGameCtx = () => {
  /**
   * @description
   * ゲームのID, cookieに保存されていればそれが初期値になる
   */
  const [gameId, setGameId] = useState<string | null>(
    getCookie(COOKIE_NAMES.CURRENT_TODOUFUKEN_GAME_ID)
  );

  /**
   * @description
   * ゲームを1度でも取得したか判別するフラグ
   * これ自体に意味はない
   */
  const [isFetched, setIsFetched] = useState(false);

  /**
   * @description
   * ゲームの情報を取得するクエリ \
   * ゲームIDがステートに入るまで待機する
   */
  const gameQuery = useGameQuery({
    id: gameId as string,
    // ゲームを作成してIDが返ってきたらクエリを有効化する
    config: { enabled: !!gameId },
  });

  /**
   * @description
   * 表示する画面を管理するステート \
   * ゲームIDが初期表示の時点で存在しない場合はロビー画面を表示する \
   * そうでない場合、ゲームの取得後にstateを参照して表示する画面を決定する
   */
  const [screen, setScreen] = useState<GameScreenKey | null>(!gameId ? 'lobby' : null);

  const changeScreen = (screen: GameScreenKey) => {
    setScreen(screen);
  };

  /**
   * @description
   * 次の画面に遷移する関数 \
   * 画面遷移の順番はGameScreenKeyに定義されている順番に従う
   */
  const changeScreenNext = () => {
    setScreen((screen) => {
      if (!screen) throw new Error();

      return GameScreenKey[GameScreenKey.indexOf(screen) + 1];
    });
  };

  const changeScreenNextTurn = () => {
    setScreen('turnAction');
  };

  /**
   * @description
   * 結果画面に遷移する関数 \
   * cookieからゲームIDを削除する
   */
  const changeScreenResult = () => {
    removeCookie(COOKIE_NAMES.CURRENT_TODOUFUKEN_GAME_ID);

    setScreen('result');
  };

  useEffect(() => {
    // フェッチは成功したが、ゲームが存在しない場合
    // cookieをクライアントが触るか、一度ログアウトしないといけないため、ここで削除する
    if (gameQuery.isSuccess && !gameQuery.data) {
      removeCookie(COOKIE_NAMES.CURRENT_TODOUFUKEN_GAME_ID);
      throw new Error();
    }

    // 初めてゲームを取得したとき
    if (gameQuery.data && !isFetched) {
      /**
       * @description
       * ゲームのstateに応じて表示する画面を決定する
       */
      const targetScreen = (
        {
          PLAYING: 'turnAction',
          FINISHED: 'result',
          GIVEN_UP: null,
        } as const satisfies Record<Game['state'], GameScreenKey | null>
      )[gameQuery.data.state];

      // ギブアップされている場合、エラーを投げる
      // 別端末でギブアップされた場合などを想定し、cookieを削除する
      if (!targetScreen) {
        removeCookie(COOKIE_NAMES.CURRENT_TODOUFUKEN_GAME_ID);
        throw new Error();
      }

      setScreen(targetScreen);

      // ゲームを1度でも取得したことを記録
      setIsFetched(true);
    }
  }, [gameQuery.data, gameQuery.isSuccess, isFetched]);

  const gameData = gameQuery.data;

  /**
   * @description
   * ゲームで参照されるデータの実態 \
   * 複数箇所で必要な値を事前に計算しておく
   */
  const game = !gameData
    ? undefined
    : (() => {
        const { conquereds, logs, createdAt } = gameData;
        const missCount = logs.filter((log) => log.result === 'LOSE').length;
        const startTime = new Date(createdAt).getTime();
        const latestLog = logs[logs.length - 1];
        const latestLogTime = latestLog ? new Date(latestLog.createdAt).getTime() : startTime;
        const playTime = latestLog ? latestLogTime - startTime : 0;

        return {
          ...gameData,
          conqueredsCount: conquereds.length,
          missCount,
          startTime,
          latestLogTime,
          playTime,
        };
      })();

  return {
    enabled: !!screen, // プロバイダを有効化するフラグ
    game,
    screen,
    setGameId,
    changeScreen,
    changeScreenNext,
    changeScreenNextTurn,
    changeScreenResult,
  };
};
