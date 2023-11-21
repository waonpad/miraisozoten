import { Button } from 'ui/components/ui/button';

import { Link } from '@/router';
import { assert } from '@/utils/asset';

import { useGame } from '../../hooks/use-game';

/**
 * @description
 * ゲームの結果を表示する画面
 */
export const GameResult = () => {
  const { game } = useGame();
  assert(game);

  const { missCount, playTime } = game;

  return (
    <>
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
