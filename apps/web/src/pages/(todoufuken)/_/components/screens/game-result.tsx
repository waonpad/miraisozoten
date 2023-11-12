import { Button } from 'ui/components/ui/button';

import { Link } from '@/router';
import { assert } from '@/utils/asset';

import { useGame } from '../../hooks/use-game';

export const GameResult = () => {
  const { game } = useGame();
  assert(game);

  const { conqueredsCount, missCount, playTime } = game;

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
