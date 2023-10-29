import { useState } from 'react';

import { CreateGameInput, CreateGameInputSchema } from 'schema/dist/todofuken/game';
import { CreateGameLogInput, CreateGameLogInputSchema } from 'schema/dist/todofuken/game/log';

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
  const gameIdCookie = getCookie(COOKIE_NAMES.CURRENT_TODOFUKEN_GAME_ID);

  const [gameId, setGameId] = useState<string | null>(gameIdCookie);

  const gameQuery = useGameQuery({
    id: gameId as string,
    // ゲームを作成してIDが返ってきたらクエリを有効化する
    config: { enabled: !!gameId },
  });

  const startGameMutation = useStartGame();

  const submitGameTurnActMutation = useSubmitGameTurnAct();

  // TODO: stateがFINISHEDでcookieから取得したゲームを開いた場合、結果画面に飛ばさないといけない
  const [screen, setScreen] = useState<GameScreenKey>(!!gameIdCookie ? 'highLow' : 'lobby');

  // ゲーム開始前の設定
  const [gameSettings, setGameSettings] = useState<Partial<CreateGameInput>>({});

  // ターンのアクション
  // 毎ターン初期化する
  const [turnAct, setTurnAct] = useState<Partial<CreateGameLogInput>>({});

  const changeScreen = (screen: GameScreenKey) => {
    setScreen(screen);
  };

  const changeScreenNext = () => {
    setScreen((screen) => GameScreenKey[GameScreenKey.indexOf(screen) + 1]);
  };

  // ゲームのstateを変えないといけない！
  const changeScreenNextTurn = () => {
    // 初期化
    setTurnAct({});

    setScreen('highLow');
  };

  // ゲームのstateを変えないといけない！
  const changeScreenResult = () => {
    // リザルトに行ったらもうゲームに戻ることはないが、一応初期化
    setTurnAct({});
    // cookieから削除する
    removeCookie(COOKIE_NAMES.CURRENT_TODOFUKEN_GAME_ID);

    setScreen('result');
  };

  // ログインしていない場合どうする？
  const startGame = async () => {
    // バリデーション
    const data = CreateGameInputSchema.parse(gameSettings);

    // ゲームを作成
    const res = await startGameMutation.mutateAsync({ data });

    if (res) {
      // ゲームIDを保存して、ゲームを取得するクエリを有効化する
      setGameId(res.id);
      // ここで初めてゲームIDが発行されるので、cookieに保存する
      // ゲームの設定段階では、状態を保存していない(バックエンドに何も送っていないので)
      setCookie(COOKIE_NAMES.CURRENT_TODOFUKEN_GAME_ID, res.id);

      // ゲームのデータ取得を明示的に行い、待機する
      await queryClient.invalidateQueries([QUERY_KEYS.TODOFUKEN_GAMES, res.id]);

      // ゲームのデータが取得できたら画面を遷移する
      changeScreen('highLow');
    } else {
      throw new Error('ゲームの作成に失敗しました');
    }
  };

  const submitTurnAct = async () => {
    // バリデーション
    const data = CreateGameLogInputSchema.parse(turnAct);

    // ターンのアクションを送信
    const res = await submitGameTurnActMutation.mutateAsync({
      id: gameQuery.data?.id as string,
      data,
    });

    if (res) {
      // ゲームのデータ取得を明示的に行い、待機する
      await queryClient.invalidateQueries([QUERY_KEYS.TODOFUKEN_GAMES, res.gameId]);

      // ゲームのデータが取得できたら画面を遷移する
      changeScreen('battle');
    } else {
      throw new Error('ターンのアクションの送信に失敗しました');
    }
  };

  return {
    game: gameQuery.data,
    screen,
    gameSettings,
    turnAct,
    changeScreen,
    changeScreenNext,
    changeScreenNextTurn,
    changeScreenResult,
    setGameSettings,
    startGame,
    setTurnAct,
    submitTurnAct,
  };
};
