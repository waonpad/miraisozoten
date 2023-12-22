import { useCallback, useEffect, useState } from 'react';

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

  const [playBGM, { stop: stopBGM }] = useSoundOrigin(BGM, {
    ...options,
    loop: true,
  });

  // TODO: ゲームBGMの制御 #322
  const [playGameBGM, { stop: stopGameBGM }] = useSoundOrigin(GameBGM, {
    ...options,
    loop: true,
  });

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
    // NOTICE: とりあえずBGMの再生はここで制御している
    if (options.soundEnabled) {
      playBGM();
    } else {
      stopBGM();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.soundEnabled]);

  /**
   * @description
   * ブラウザが自動再生を許可していないので、ユーザーがアクションを起こすまで \
   * 再生を試行することで、何かしらのアクションがあったらすぐにBGMを再生できるようにするための処理
   */
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const intervalFn = useCallback(() => {
    if (options.soundEnabled && isFirstRender) {
      playBGM();

      if (intervalId) clearInterval(intervalId);
    }

    setIsFirstRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstRender, options.soundEnabled, playBGM]);

  useEffect(() => {
    if (!isFirstRender) return;

    const _intervalId = setInterval(intervalFn, 1000);

    setIntervalId(_intervalId);

    return () => clearInterval(_intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalFn]);
  /** ここまで  */

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
