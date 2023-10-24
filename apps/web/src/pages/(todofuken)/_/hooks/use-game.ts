import { useState } from 'react';

import { Prefectures } from 'prefecture/dist';
import { getPrefectureNeighbors } from 'prefecture/dist/utils';

import { createCtx } from '@/utils/create-ctx';

import { Game } from '../config/game';

const [createdUseGame, SetGameProvider] = createCtx<ReturnType<typeof useGameCtx>>();

export { SetGameProvider };

export const useGame = createdUseGame;

export const useGameCtx = () => {
  const [game, setGame] = useState<Game>({
    prefecture: null,
    conqueredPrefectures: [],
    neighboringPrefectures: [],
    state: 'lobby',
    difficulty: null,
    mode: null,
    area: null,
    hideData: false,
  });

  const changePrefecture = (id: NonNullable<Game['prefecture']>['id'] | null) => {
    !id
      ? setGame((prev) => ({ ...prev, prefecture: null }))
      : setGame((prev) => ({ ...prev, prefecture: getPrefectureNeighbors([Prefectures[id]])[0] }));
  };

  const changeState = (state: Game['state']) => {
    setGame((prev) => ({ ...prev, state }));
  };

  const changeDifficulty = (difficulty: Game['difficulty']) => {
    setGame((prev) => ({ ...prev, difficulty }));
  };

  const changeDataVisibility = (hideData: Game['hideData']) => {
    setGame((prev) => ({ ...prev, hideData }));
  };

  const changeMode = (mode: Game['mode']) => {
    setGame((prev) => ({ ...prev, mode }));
  };

  return {
    data: game,
    changePrefecture,
    changeState,
    changeDifficulty,
    changeDataVisibility,
    changeMode,
  };
};
