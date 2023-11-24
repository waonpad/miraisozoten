import NotchedPaperOrangeHovered from '@/assets/notched-paper-orange-hovered.png';
import NotchedPaperOrange from '@/assets/notched-paper-orange.png';
import { ImageBgButton } from '@/components/elements/image-bg-button';
import { Link } from '@/router';
import { assert } from '@/utils/asset';
import { millisecondsToHms } from '@/utils/format';

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
      <div>タイム: {millisecondsToHms(playTime)}</div>
      <ImageBgButton imagePath={NotchedPaperOrange} hoverImagePath={NotchedPaperOrangeHovered}>
        <Link to={'/menu'}>トップへ</Link>
      </ImageBgButton>
    </>
  );
};
