import { useState } from 'react';

import { ConfirmGiveUpDialog } from './confirm-give-up-dialog';
import { GameStatus } from './game-status';
import { GiveUpIconButton } from './give-up-icon-button';

export const GameHeader = () => {
  const [isGiveUpDialogOpen, setIsGiveUpDialogOpen] = useState(false);

  const handleClickGiveUpDialogOpen = () => {
    setIsGiveUpDialogOpen(true);
  };

  const handleGiveUp = () => {
    // TODO: どうギブアップするか決めて、処理を追加する
    console.log('ギブアップ');
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
