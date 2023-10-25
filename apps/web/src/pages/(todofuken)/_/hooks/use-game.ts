import { useEffect, useState } from 'react';

import { Prefectures } from 'prefecture/dist';
import { getPrefectureNeighbors } from 'prefecture/dist/utils';

import { createCtx } from '@/utils/create-ctx';

import { Game, GameLog, GameStates } from '../config/game';

const [createdUseGame, SetGameProvider] = createCtx<ReturnType<typeof useGameCtx>>();

export { SetGameProvider };

export const useGame = createdUseGame;

export const useGameCtx = () => {
  const [game, setGame] = useState<Game>({
    prefecture: null,
    conqueredPrefectures: [],
    state: 'lobby',
    difficulty: null,
    mode: null,
    isSettingCompleted: false,
    turn: {},
    logs: [],
    factors: [],
  });

  const hideData = ['hiddenNormal', 'hard'].includes(game.difficulty || '');

  // prefectureとconqueredPrefecturesの全ての隣接県を取得し、マージする
  // 同じ県が含まれている場合は、重複を削除する
  // prefectureとconqueredPrefecturesの県を除外する
  // モードがareaの場合は、areaがprefectureと同じもの以外を除外する
  const neighboringPrefectures = [
    ...(game.prefecture?.neighbors || []),
    ...game.conqueredPrefectures.flatMap((prefecture) => {
      return prefecture ? prefecture.neighbors : [];
    }),
  ].filter((prefecture, index, array) => {
    return (
      (game.mode === 'area'
        ? prefecture.area.id === game.prefecture?.area.id
          ? true
          : false
        : true) &&
      array.indexOf(prefecture) === index &&
      prefecture?.id !== game.prefecture?.id &&
      !game.conqueredPrefectures.some(
        (conqueredPrefecture) => conqueredPrefecture?.id === prefecture?.id
      )
    );
  });

  // 都道府県の設定
  const changePrefecture = (id: NonNullable<Game['prefecture']>['id'] | null) => {
    !id
      ? setGame((prev) => ({ ...prev, prefecture: null }))
      : setGame((prev) => ({ ...prev, prefecture: getPrefectureNeighbors([Prefectures[id]])[0] }));
  };

  // ゲームの状態の変更
  const changeState = (state: Game['state']) => {
    setGame((prev) => ({ ...prev, state }));
  };

  // ゲームの状態を次に進める
  const changeStateNext = () => {
    setGame((prev) => ({ ...prev, state: GameStates[GameStates.indexOf(prev.state) + 1] }));
  };

  /**
   * そのターンのログを記録して、次のターンに進める
   */
  const changeStateNextTurn = () => {
    turn.logging();
    turn.init();

    setGame((prev) => ({ ...prev, state: 'highLow' }));
  };

  /**
   * そのターンのログを記録して、結果画面に進める
   */
  const changeStateResult = () => {
    turn.logging();
    turn.init();

    setGame((prev) => ({ ...prev, state: 'result' }));
  };

  // 難易度の変更
  const changeDifficulty = (difficulty: Game['difficulty']) => {
    setGame((prev) => ({ ...prev, difficulty }));
  };

  // モードの変更
  const changeMode = (mode: Game['mode']) => {
    setGame((prev) => ({ ...prev, mode }));
  };

  // 設定の完了
  const settingCompolete = () => {
    setGame((prev) => ({ ...prev, isSettingCompleted: true }));
  };

  /**
   * ターンの情報を記録するための関数一覧
   */
  const turn = {
    init: () => {
      setGame((prev) => ({ ...prev, turn: {} }));
    },
    logging: () => {
      // 完全に情報が入っていることを確認する xod

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setGame((prev) => ({ ...prev, logs: [...prev.logs, prev.turn] }));
    },
    setHighLow: (highLow: GameLog['highLow']) => {
      setGame((prev) => ({ ...prev, turn: { ...prev.turn, highLow } }));
    },
    setFactor: (factor: GameLog['factor']) => {
      setGame((prev) => ({ ...prev, turn: { ...prev.turn, factor } }));
    },
    setOpportunity: (opportunity: GameLog['opportunity']) => {
      setGame((prev) => ({ ...prev, turn: { ...prev.turn, opportunity } }));
    },
    setResult: (result: GameLog['result']) => {
      setGame((prev) => ({
        ...prev,
        turn: { ...prev.turn, result },
        // 勝利していたら、征服した都道府県配列に追加する
        ...(result === 'win' && {
          conqueredPrefectures: Array.from(
            new Map(
              [
                ...prev.conqueredPrefectures,
                prev.turn.opportunity as Game['conqueredPrefectures'][number],
              ].map((prefecture) => [prefecture?.id, prefecture])
            ).values()
          ),
          // 勝利していたら、自分がこのターンで利用した要素を記録する
          // TODO: 相手の要素も取り込むが、ここの処理は後で考える
          factors: Array.from(
            new Map(
              [...prev.factors, prev.turn.factor as Game['factors'][number]].map((factor) => [
                factor,
                factor,
              ])
            ).values()
          ),
        }),
      }));
    },
  };

  // デバッグ用
  useEffect(
    () => {
      console.log({
        ...game,
        hideData,
        neighboringPrefectures,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [game]
  );

  return {
    data: {
      ...game,
      hideData,
      neighboringPrefectures,
    },
    turn,
    changePrefecture,
    changeState,
    changeStateNext,
    changeStateNextTurn,
    changeStateResult,
    changeDifficulty,
    changeMode,
    settingCompolete,
  };
};
