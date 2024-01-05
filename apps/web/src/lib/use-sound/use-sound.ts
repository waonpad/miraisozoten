import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ClickSound from '@/assets/sounds/click.mp3';
import BGM from '@/assets/sounds/common-bgm.mp3';
import DisabledClickSound from '@/assets/sounds/disabled-click.mp3';
import GameBGM from '@/assets/sounds/game-bgm.mp3';
import GameClearSound from '@/assets/sounds/game-clear.mp3';
import GameTurnLoseSound from '@/assets/sounds/game-turn-lose.mp3';
import GameTurnDrawSound from '@/assets/sounds/game-turn-lose.mp3';
import GameTurnWinSound from '@/assets/sounds/game-turn-win.mp3';
import NegativeClickSound from '@/assets/sounds/negative-click.mp3';
import OpenDialogSound from '@/assets/sounds/open-dialog.mp3';
import CloseDialogSound from '@/assets/sounds/open-dialog.mp3';
import PageMoveSound from '@/assets/sounds/page-move.mp3';
import { COOKIE_NAMES } from '@/constants/cookie-names';
import { getCookie } from '@/utils/cookie/get-cookie';
import { setCookie } from '@/utils/cookie/set-cookie';
import { createCtx } from '@/utils/create-ctx';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports-ts
import { useSoundOrigin, HookOptions, PlayOptions } from '.';

const [createdUseSound, SetSoundProvider] = createCtx<ReturnType<typeof useSoundCtx>>();

export { SetSoundProvider };

export const useSound = createdUseSound;

export const useSoundCtx = () => {
  const soundEnabledCookie = getCookie(COOKIE_NAMES.SOUND_ENABLED) === 'true';

  const [options, setOptions] = useState<HookOptions>({
    soundEnabled: soundEnabledCookie ?? false,
  });

  const [playClick] = useSoundOrigin(ClickSound, options);

  const [playNegativeClick] = useSoundOrigin(NegativeClickSound, options);

  const [playDisabledClick] = useSoundOrigin(DisabledClickSound, options);

  const [playOpenDialog] = useSoundOrigin(OpenDialogSound, options);

  const [playCloseDialog] = useSoundOrigin(CloseDialogSound, options);

  const [playGameTurnWin] = useSoundOrigin(GameTurnWinSound, {
    ...options,
    volume: 0.5,
  });

  const [playGameTurnLose] = useSoundOrigin(GameTurnLoseSound, {
    ...options,
    volume: 0.5,
  });

  const [playGameTurnDraw] = useSoundOrigin(GameTurnDrawSound, {
    ...options,
    volume: 0.5,
  });

  const [playGameClear] = useSoundOrigin(GameClearSound, {
    ...options,
    volume: 0.5,
  });

  const [playPageMove] = useSoundOrigin(PageMoveSound, options);

  const [playBGM, { stop: stopBGM, sound: BGMSound }] = useSoundOrigin(BGM, {
    ...options,
    loop: true,
    volume: 0.5,
  });

  const [isPlayingBGM, setIsPlayingBGM] = useState(false);

  const [playGameBGM, { stop: stopGameBGM, sound: gameBGMSound }] = useSoundOrigin(GameBGM, {
    ...options,
    loop: true,
    volume: 0.2,
  });

  const [isPlayingGameBGM, setIsPlayingGameBGM] = useState(false);

  const location = useLocation();

  /**
   * @description
   * サイトにアクセスして直後はブラウザが音声再生を許可していない \
   * この関数を実行(ユーザーが何かのアクションを起こす)する必要がある
   */
  const toggleSoundEnabled = () => {
    setCookie(COOKIE_NAMES.SOUND_ENABLED, !options.soundEnabled ? 'true' : 'false');

    setOptions((prev) => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  };

  useEffect(() => {
    if (options.soundEnabled) {
      if (location.pathname === '/game') {
        stopBGM();
        setIsPlayingBGM(false);

        playGameBGM();
        setIsPlayingGameBGM(true);
      } else {
        stopGameBGM();
        setIsPlayingGameBGM(false);

        playBGM();
        setIsPlayingBGM(true);
      }
    } else {
      stopBGM();
      setIsPlayingBGM(false);

      stopGameBGM();
      setIsPlayingGameBGM(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.soundEnabled]);

  useEffect(() => {
    // console.log('useEffect', {
    //   isPlayingBGM,
    //   isPlayingGameBGM,
    //   locationPathname: location.pathname,
    //   BGMSound,
    //   gameBGMSound,
    // });

    if (!BGMSound || !gameBGMSound) {
      console.log('sound is not loaded');

      return;
    }

    const intervalId = setInterval(() => {
      if (options.soundEnabled) {
        const isInGame = location.pathname === '/game';

        if (isInGame && !isPlayingGameBGM) {
          console.log('playGameBGM');

          stopBGM();
          setIsPlayingBGM(false);

          playGameBGM();
          setIsPlayingGameBGM(true);
        }

        if (!isInGame && !isPlayingBGM) {
          console.log('playBGM');

          stopGameBGM();
          setIsPlayingGameBGM(false);

          playBGM();
          setIsPlayingBGM(true);
        }
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isPlayingBGM,
    isPlayingGameBGM,
    location.pathname,
    options.soundEnabled,
    BGMSound,
    gameBGMSound,
  ]);

  return {
    options,
    playClick,
    playNegativeClick,
    playDisabledClick,
    playOpenDialog,
    playCloseDialog,
    playGameTurnWin,
    playGameTurnLose,
    playGameTurnDraw,
    playGameClear,
    playPageMove,
    playBGM,
    stopBGM,
    playGameBGM,
    stopGameBGM,
    toggleSoundEnabled,
  };
};
