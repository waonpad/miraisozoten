import { useEffect, useState } from 'react';

import { usePrefectures } from '@/pages/(prefectures)/_/api/get-prefectures';
import { assert } from '@/utils/asset';
import { millisecondsToHms } from '@/utils/format';

import { useGame } from '../hooks/use-game';

/**
 * @description
 * ゲーム中。ゲームの状態を表示するコンポーネント
 */
export const GameStatus = () => {
  const { game } = useGame();
  assert(game);

  const {
    prefecture,
    mode,
    startTime,
    conqueredsCount,
    missCount,
    playTime: loggedPlayTime,
  } = game;

  const prefecturesQuery = usePrefectures();
  const prefectures = prefecturesQuery.data!;

  const allCount =
    mode === 'NATIONWIDE'
      ? 46
      : prefectures.filter((p) => p.regionId === prefecture.regionId).length - 1;

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
    setPlayTime(new Date().getTime() - startTime);

    const interval = setInterval(() => {
      setPlayTime(new Date().getTime() - startTime);
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
      <div className="flex gap-4">
        <div className="font-mono">{millisecondsToHms(playTime)}</div>
        <div>
          制覇数: {String(conqueredsCount).padStart(String(allCount).length, '0')} / {allCount}
        </div>
        <div>ミス数: {missCount}</div>
      </div>
    </>
  );
};
