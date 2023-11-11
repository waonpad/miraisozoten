import { useEffect, useState } from 'react';

import { CreateGameInput, CreateGameInputSchema } from 'schema/dist/todoufuken/game';
import { CreateGameLogInput, CreateGameLogInputSchema } from 'schema/dist/todoufuken/game/log';

import { COOKIE_NAMES } from '@/constants/cookie-names';
import { QUERY_KEYS, queryClient } from '@/lib/react-query';
import { getCookie } from '@/utils/cookie/get-cookie';
import { removeCookie } from '@/utils/cookie/remove-cookie';
import { setCookie } from '@/utils/cookie/set-cookie';
import { createCtx } from '@/utils/create-ctx';

import { useGame as useGameQuery } from '../api/get-game';
import { useStartGame } from '../api/start-game';
import { useSubmitGameTurnAct } from '../api/submit-game-turn-act';
import { GameScreenKey } from '../config/game';

const [createdUseGame, SetGameProvider] = createCtx<ReturnType<typeof useGameCtx>>();

export { SetGameProvider };

export const useGame = createdUseGame;

export const useGameCtx = () => {
  const [gameId, setGameId] = useState<string | null>(
    getCookie(COOKIE_NAMES.CURRENT_todoufuken_GAME_ID)
  );

  // ゲームを1度でも取得したか判別するフラグ
  const [isFetched, setIsFetched] = useState(false);

  const gameQuery = useGameQuery({
    id: gameId as string,
    // ゲームを作成してIDが返ってきたらクエリを有効化する
    config: { enabled: !!gameId },
  });

  const startGameMutation = useStartGame();

  const submitGameTurnActMutation = useSubmitGameTurnAct();

  const [screen, setScreen] = useState<GameScreenKey | null>(!gameId ? 'lobby' : null);

  // ゲーム開始前の設定
  // これもここで持っておく必要はなさそう
  const [gameSettings, setGameSettings] = useState<Partial<CreateGameInput>>({});

  const changeScreen = (screen: GameScreenKey) => {
    setScreen(screen);
  };

  const changeScreenNext = () => {
    setScreen((screen) => {
      if (!screen) throw new Error();

      return GameScreenKey[GameScreenKey.indexOf(screen) + 1];
    });
  };

  // ゲームのstateを変えないといけない！
  const changeScreenNextTurn = () => {
    setScreen('turnAction');
  };

  // ゲームのstateを変えないといけない！
  const changeScreenResult = () => {
    // cookieから削除する
    removeCookie(COOKIE_NAMES.CURRENT_todoufuken_GAME_ID);

    setScreen('result');
  };

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
      setCookie(COOKIE_NAMES.CURRENT_todoufuken_GAME_ID, res.id);

      // ゲームのデータ取得を明示的に行い、待機する
      await queryClient.invalidateQueries([QUERY_KEYS.TODOUFUKEN_GAMES, res.id]);

      // ゲームのデータが取得できたら画面を遷移する
      changeScreen('turnAction');
    } else {
      throw new Error('ゲームの作成に失敗しました');
    }
  };

  const submitTurnAct = async (turnAct: Partial<CreateGameLogInput>) => {
    // バリデーション
    const data = CreateGameLogInputSchema.parse(turnAct);

    // ターンのアクションを送信
    const res = await submitGameTurnActMutation.mutateAsync({
      id: gameQuery.data?.id as string,
      data,
    });

    if (res) {
      // ゲームのデータ取得を明示的に行い、待機する
      await queryClient.invalidateQueries([QUERY_KEYS.TODOUFUKEN_GAMES, res.gameId]);

      // ゲームのデータが取得できたら画面を遷移する
      changeScreen('turnResult');
    } else {
      throw new Error('ターンのアクションの送信に失敗しました');
    }
  };

  useEffect(() => {
    // フェッチは成功したが、ゲームが存在しない場合
    // cookieをクライアントが触るか、一度ログアウトしないといけないため、ここで削除する
    if (gameQuery.isSuccess && !gameQuery.data) {
      removeCookie(COOKIE_NAMES.CURRENT_todoufuken_GAME_ID);

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
    game: gameQuery.data,
    screen,
    gameSettings,
    changeScreen,
    changeScreenNext,
    changeScreenNextTurn,
    changeScreenResult,
    setGameSettings,
    startGame,
    submitTurnAct,
  };
};
