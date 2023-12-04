import { useWindowEvent } from '@/utils/hooks/use-window-event';

import { soundAttributeString, SOUND_ATTRIBUTE, SOUND_ATTRIBUTE_VALUE } from './constants';
import { useSound } from './use-sound';

export type SoundEffectHandlerProps = {
  children: React.ReactNode;
};

export const SoundEffectHandler = ({ children }: SoundEffectHandlerProps) => {
  const { playDisabledClick, playClick, playNegativeClick, playOpenDialog, playPageMove } =
    useSound();

  useWindowEvent(
    'click',
    (event) => {
      console.log('click');

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      // ON/OFFが指定されている直近の祖先を探索し、OFFなら何もせず終了
      const onOffEl = target.closest(
        `${soundAttributeString('ON')}, ${soundAttributeString('OFF')}`
      );

      if (onOffEl && onOffEl.getAttribute(SOUND_ATTRIBUTE) === SOUND_ATTRIBUTE_VALUE.OFF) {
        return;
      }

      // 無効なクリック音を要求している要素が祖先に存在していたら、何もせず終了
      const disabledClickEl = target.closest(soundAttributeString('DISABLED_CLICK'));

      if (disabledClickEl) {
        playDisabledClick();

        return;
      }

      // クリック音を要求している直近の祖先を探索し、対応する音を再生
      const searchedEl = target.closest(
        `${soundAttributeString('CLICK')}, ${soundAttributeString(
          'NEGATIVE_CLICK'
        )}, ${soundAttributeString('OPEN_DIALOG')}, ${soundAttributeString(
          'CLOSE_DIALOG'
        )} ${soundAttributeString('PAGE_MOVE')}`
      );

      if (searchedEl) {
        if (searchedEl.getAttribute(SOUND_ATTRIBUTE) === SOUND_ATTRIBUTE_VALUE.PAGE_MOVE) {
          playPageMove();

          return;
        }

        if (searchedEl.getAttribute(SOUND_ATTRIBUTE) === SOUND_ATTRIBUTE_VALUE.OPEN_DIALOG) {
          playOpenDialog();

          return;
        }

        if (searchedEl.getAttribute(SOUND_ATTRIBUTE) === SOUND_ATTRIBUTE_VALUE.CLOSE_DIALOG) {
          playOpenDialog(); // playCloseDialogは未定義

          return;
        }

        if (searchedEl.getAttribute(SOUND_ATTRIBUTE) === SOUND_ATTRIBUTE_VALUE.NEGATIVE_CLICK) {
          playNegativeClick();

          return;
        }

        if (searchedEl.getAttribute(SOUND_ATTRIBUTE) === SOUND_ATTRIBUTE_VALUE.CLICK) {
          playClick();

          return;
        }
      }
    },
    []
  );

  return children;
};
