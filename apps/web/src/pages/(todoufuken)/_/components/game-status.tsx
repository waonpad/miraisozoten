import { useEffect, useState } from 'react';

import { assert } from '@/utils/asset';

import { useGame } from '../hooks/use-game';

/**
 * @description
 * ゲーム中。ゲームの状態を表示するコンポーネント
 */
export const GameStatus = () => {
  const { game } = useGame();
  assert(game);

  const { startTime, conqueredsCount, missCount, playTime: loggedPlayTime } = game;

  /**
   * @description
   * 画面に表示するゲームのプレイ時間
   */
  const [playTime, setPlayTime] = useState(0);

  /**
   * @description
   * ゲームの開始時間から現在の時間を計算して、ゲームのプレイ時間を更新する \
   * これは、ユーザーが見るための非正規なタイム
   */
  useEffect(() => {
    setPlayTime((new Date().getTime() - startTime) / 1000);

    const interval = setInterval(() => {
      setPlayTime((new Date().getTime() - startTime) / 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  /**
   * @description
   * ゲームのログが更新されたら、表示されているタイムをログのタイムに同期する
   */
  useEffect(() => {
    if (playTime === 0) return;

    setPlayTime(loggedPlayTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.logs]);

  return (
    <>
      <div>制覇数: {conqueredsCount} / 47</div>
      <div>ミス: {missCount}</div>
      {/* 秒ミリ秒を、分秒に変換 */}
      <div>
        タイム: {Math.floor(playTime / 60)}分{Math.floor(playTime % 60)}秒
      </div>
    </>
  );
};
