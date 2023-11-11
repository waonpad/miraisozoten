import { Button } from 'ui/components/ui/button';

import { Link } from '@/router';

import { useGame } from '../../hooks/use-game';

export const GameResult = () => {
  const { game } = useGame();

  if (!game) throw new Error('game is not found');

  const conqueredsCount = game.conquereds.length;

  const missCount = game.logs.filter((log) => log.result === 'LOSE').length;

  const startTime = new Date(game.createdAt).getTime();

  const lastLogTime = new Date(game.logs[game.logs.length - 1].createdAt).getTime();

  const playTime = (lastLogTime - startTime) / 1000;

  return (
    <>
      <div>制覇数: {conqueredsCount} / 47</div>
      <div>ミス: {missCount}</div>
      {/* 秒ミリ秒を、分秒に変換 */}
      <div>
        タイム: {Math.floor(playTime / 60)}分{Math.floor(playTime % 60)}秒
      </div>
      <Button asChild>
        <Link to={'/menu'}>トップに戻る</Link>
      </Button>
    </>
  );
};
