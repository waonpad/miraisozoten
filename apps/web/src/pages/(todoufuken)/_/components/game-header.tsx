import { useState } from 'react';

import { SoundToggleIconButton } from '@/components/elements/sound-toggle-icon-button';
import { COOKIE_NAMES } from '@/constants/cookie-names';
import { useSound } from '@/lib/use-sound/use-sound';
import { useNavigate } from '@/router';
import { assert } from '@/utils/asset';
import { removeCookie } from '@/utils/cookie/remove-cookie';

import { useGiveUpGame } from '../api/give-up-game';
import { useGame } from '../hooks/use-game';

import { ConfirmGiveUpDialog } from './confirm-give-up-dialog';
import { GameStatus } from './game-status';
import { GiveUpIconButton } from './give-up-icon-button';

/**
 * @description
 * ゲーム中。画面上部に表示されるコンポーネント
 */
export const GameHeader = () => {
  const { game } = useGame();
  assert(game);

  const { playOpenDialog, playCloseDialog, playClick } = useSound();

  const navigate = useNavigate();

  const giveUpGameMutaiton = useGiveUpGame();

  const [isGiveUpDialogOpen, setIsGiveUpDialogOpen] = useState(false);

  const handleClickGiveUpDialogOpen = () => {
    playOpenDialog();

    setIsGiveUpDialogOpen(true);
  };

  const handleOpenChangeGiveUpDialog = (open: boolean) => {
    if (!open) {
      playCloseDialog();

      setIsGiveUpDialogOpen(open);
    }
  };

  /**
   * @description
   * ギブアップする関数 \
   * cookieを削除して、メニュー画面に遷移する
   */
  const handleGiveUp = async () => {
    playClick();

    await giveUpGameMutaiton.mutateAsync({ id: game.id });

    removeCookie(COOKIE_NAMES.CURRENT_TODOUFUKEN_GAME_ID);

    navigate('/menu');
  };

  return (
    <>
      {/* TODO: 文字とアイコンが重なったりあふれたりしないようにする */}
      <div className="relative flex h-16 items-center justify-start bg-[#333333] text-white sm:text-xl lg:justify-center">
        <div className="ml-4 lg:ml-0">
          <GameStatus />
        </div>
        <div className="absolute right-4 top-4 space-x-6">
          <GiveUpIconButton onClick={handleClickGiveUpDialogOpen} />
          <SoundToggleIconButton svgProps={{ className: 'fill-white' }} />
        </div>
      </div>

      <ConfirmGiveUpDialog
        open={isGiveUpDialogOpen}
        handleOpenChange={handleOpenChangeGiveUpDialog}
        handleGiveUp={handleGiveUp}
      />
    </>
  );
};
