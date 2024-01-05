import { useEffect } from 'react';

import NotchedPaperOrange from '@/assets/notched-paper-orange.png';
import { ImageBgButton } from '@/components/elements/image-bg-button';
import { SoundToggleIconButton } from '@/components/elements/sound-toggle-icon-button';
import { useFadeTransition } from '@/components/transitions/fade-transition/use-fade-transition';
import { useFusumaTransition } from '@/components/transitions/fusuma-transition/use-fusuma-transition';
import { useSound } from '@/lib/use-sound/use-sound';
import { Link, useNavigate } from '@/router';
import { assert } from '@/utils/asset';
import { millisecondsToHms } from '@/utils/format';

import { useGame } from '../../hooks/use-game';

/**
 * @description
 * ゲームの結果を表示する画面
 */
export const GameResult = () => {
  const fusumaTransition = useFusumaTransition();

  const fadeTransition = useFadeTransition();

  const navigate = useNavigate();

  const { game } = useGame();
  assert(game);

  const { missCount, playTime } = game;

  const { playPageMove } = useSound();

  const handleClickNavigateToMenu = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();

    fusumaTransition.closeFusuma();

    playPageMove();

    setTimeout(() => {
      navigate('/menu');
    }, fusumaTransition.duration);
  };

  useEffect(() => {
    if (!fadeTransition.isOpen) {
      fadeTransition.openFade();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="mx-auto grid min-h-screen grid-cols-1 gap-10 p-10 lg:p-20">
        <div className="flex flex-col items-center justify-end">
          <table className="table-auto border-separate border-spacing-2 text-3xl">
            <tbody>
              <tr>
                <td>タイム</td>
                <td>{millisecondsToHms(playTime)}</td>
              </tr>
              <tr>
                <td>ミス数</td>
                <td>{missCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center justify-start lg:justify-end">
          <Link to={'/menu'} onClick={handleClickNavigateToMenu}>
            <ImageBgButton
              imagePath={NotchedPaperOrange}
              className="px-16 py-2 text-2xl lg:py-5 lg:text-3xl"
            >
              トップへ
            </ImageBgButton>
          </Link>
        </div>
      </div>

      <SoundToggleIconButton className="absolute right-2 top-2" />
    </>
  );
};
