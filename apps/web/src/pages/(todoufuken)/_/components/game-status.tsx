import { useEffect, useState } from 'react';

import { useGame } from '../hooks/use-game';

export const GameStatus = () => {
  const { game } = useGame();

  if (!game) throw new Error('game is not defined');

  const [playTime, setPlayTime] = useState(0);

  const conqueredsCount = game.conquereds.length;

  const missCount = game.logs.filter((log) => log.result === 'LOSE').length;

  const startTime = new Date(game.createdAt).getTime();

  useEffect(() => {
    setPlayTime((new Date().getTime() - startTime) / 1000);

    const interval = setInterval(() => {
      setPlayTime((new Date().getTime() - startTime) / 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    if (playTime === 0) return;

    const latestLogTime =
      game.logs.length > 0
        ? new Date(game.logs[game.logs.length - 1].createdAt).getTime()
        : startTime;

    setPlayTime((latestLogTime - startTime) / 1000);
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
