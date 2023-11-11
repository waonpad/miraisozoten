import { useState } from 'react';

import { COOKIE_NAMES } from '@/constants/cookie-names';
import { useNavigate } from '@/router';
import { removeCookie } from '@/utils/cookie/remove-cookie';

import { useGiveUpGame } from '../api/give-up-game';
import { useGame } from '../hooks/use-game';

import { ConfirmGiveUpDialog } from './confirm-give-up-dialog';
import { GameStatus } from './game-status';
import { GiveUpIconButton } from './give-up-icon-button';

export const GameHeader = () => {
  const { game } = useGame();

  const navigate = useNavigate();

  if (!game) throw new Error('ゲームが存在しません');

  const giveUpGameMutaiton = useGiveUpGame();

  const [isGiveUpDialogOpen, setIsGiveUpDialogOpen] = useState(false);

  const handleClickGiveUpDialogOpen = () => {
    setIsGiveUpDialogOpen(true);
  };

  const handleGiveUp = async () => {
    await giveUpGameMutaiton.mutateAsync({ id: game.id });

    // cookieを削除して、次アクセスした時別のゲームを始められるようにする
    removeCookie(COOKIE_NAMES.CURRENT_TODOUFUKEN_GAME_ID);

    // TODO: ギブアップしたら、メニューに戻る
    navigate('/');
  };

  return (
    <>
      <GameStatus />
      <GiveUpIconButton onClick={handleClickGiveUpDialogOpen} />
      <ConfirmGiveUpDialog
        open={isGiveUpDialogOpen}
        handleOpenChange={setIsGiveUpDialogOpen}
        handleGiveUp={handleGiveUp}
      />
    </>
  );
};
