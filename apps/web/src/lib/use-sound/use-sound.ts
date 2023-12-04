import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports-ts
import useSoundOrigin, { HookOptions, PlayOptions } from 'use-sound';

import ClickSound from '@/assets/sounds/click.mp3';
import NegativeClickSound from '@/assets/sounds/click.mp3';
import DisabledClickSound from '@/assets/sounds/click.mp3';
import OpenDialogSound from '@/assets/sounds/click.mp3';
import GameTurnWinSound from '@/assets/sounds/click.mp3';
import GameTurnLoseSound from '@/assets/sounds/click.mp3';
import GameTurnDrawSound from '@/assets/sounds/click.mp3';
import GameClearSound from '@/assets/sounds/click.mp3';
import { createCtx } from '@/utils/create-ctx';

const [createdUseSound, SetSoundProvider] = createCtx<ReturnType<typeof useSoundCtx>>();

export { SetSoundProvider };

export const useSound = createdUseSound;

export const useSoundCtx = () => {
  const [options, setOptions] = useState<HookOptions>({
    soundEnabled: true,
    volume: 1,
    playbackRate: 1,
    interrupt: false,
  });

  const [playClick] = useSoundOrigin(ClickSound, options);

  const [playNegativeClick] = useSoundOrigin(NegativeClickSound, options);

  const [playDisabledClick] = useSoundOrigin(DisabledClickSound, options);

  const [playOpenDialog] = useSoundOrigin(OpenDialogSound, options);

  const [playGameTurnWin] = useSoundOrigin(GameTurnWinSound, options);

  const [playGameTurnLose] = useSoundOrigin(GameTurnLoseSound, options);

  const [playGameTurnDraw] = useSoundOrigin(GameTurnDrawSound, options);

  const [playGameClear] = useSoundOrigin(GameClearSound, options);

  const toggleSoundEnabled = () => {
    setOptions((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

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
    toggleSoundEnabled,
  };
};
