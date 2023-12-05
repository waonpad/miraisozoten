import { useEffect, useState } from 'react';

import ClickSound from '@/assets/sounds/click.mp3';
import NegativeClickSound from '@/assets/sounds/click.mp3';
import DisabledClickSound from '@/assets/sounds/click.mp3';
import OpenDialogSound from '@/assets/sounds/click.mp3';
import GameTurnWinSound from '@/assets/sounds/click.mp3';
import GameTurnLoseSound from '@/assets/sounds/click.mp3';
import GameTurnDrawSound from '@/assets/sounds/click.mp3';
import GameClearSound from '@/assets/sounds/click.mp3';
import PageMoveSound from '@/assets/sounds/click.mp3';
import BGM from '@/assets/sounds/click.mp3';
import { createCtx } from '@/utils/create-ctx';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports-ts
import { useSoundOrigin, HookOptions, PlayOptions } from '.';

const [createdUseSound, SetSoundProvider] = createCtx<ReturnType<typeof useSoundCtx>>();

export { SetSoundProvider };

export const useSound = createdUseSound;

export const useSoundCtx = () => {
  const [options, setOptions] = useState<HookOptions>({
    soundEnabled: false,
  });

  const [playClick] = useSoundOrigin(ClickSound, options);

  const [playNegativeClick] = useSoundOrigin(NegativeClickSound, options);

  const [playDisabledClick] = useSoundOrigin(DisabledClickSound, options);

  const [playOpenDialog] = useSoundOrigin(OpenDialogSound, options);

  const [playGameTurnWin] = useSoundOrigin(GameTurnWinSound, options);

  const [playGameTurnLose] = useSoundOrigin(GameTurnLoseSound, options);

  const [playGameTurnDraw] = useSoundOrigin(GameTurnDrawSound, options);

  const [playGameClear] = useSoundOrigin(GameClearSound, options);

  const [playPageMove] = useSoundOrigin(PageMoveSound, options);

  const [playBGM, { stop: stopBGM }] = useSoundOrigin(BGM, {
    ...options,
    loop: true,
  });

  /**
   * @description
   * サイトにアクセスして直後はブラウザが音声再生を許可していない \
   * この関数を実行(ユーザーが何かのアクションを起こす)する必要がある
   */
  const toggleSoundEnabled = () => {
    setOptions((prev) => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  };

  useEffect(() => {
    // NOTICE: とりあえずBGMの再生はここで制御している
    options.soundEnabled ? playBGM() : stopBGM();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.soundEnabled]);

  return {
    options,
    playClick,
    playNegativeClick,
    playDisabledClick,
    playOpenDialog,
    playGameTurnWin,
    playGameTurnLose,
    playGameTurnDraw,
    playGameClear,
    playPageMove,
    playBGM,
    stopBGM,
    toggleSoundEnabled,
  };
};
