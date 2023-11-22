import NotchedPaperOrangeHovered from '@/assets/notched-paper-orange-hovered.png';
import NotchedPaperOrange from '@/assets/notched-paper-orange.png';
import { ImageBgButton } from '@/components/elements/image-bg-button';
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
      <ImageBgButton imagePath={NotchedPaperOrange} hoverImagePath={NotchedPaperOrangeHovered}>
        <Link to={'/menu'}>トップへ</Link>
      </ImageBgButton>
    </>
  );
};
