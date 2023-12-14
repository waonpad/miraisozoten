import { useState } from 'react';

import { createCtx } from '@/utils/create-ctx';

const [createdUseFadeTransition, SetFadeTransitionProvider] =
  createCtx<ReturnType<typeof useFadeTransitionCtx>>();
export { SetFadeTransitionProvider };

export const useFadeTransition = createdUseFadeTransition;

type DurationPoint = 0 | 75 | 100 | 150 | 200 | 300 | 500 | 700 | 1000;

export const useFadeTransitionCtx = () => {
  const [isRender, setIsRender] = useState(false);

  const [isOpen, setIsOpen] = useState(true);

  const [duration, setDuration] = useState<DurationPoint>(150);

  const closeFade = (onClose?: () => void) => {
    setIsRender(true);
    setIsOpen(false);

    onClose && setTimeout(onClose, duration);
  };

  const openFade = (onOpen?: () => void) => {
    setIsOpen(true);

    setTimeout(() => {
      setIsRender(false);
      onOpen && onOpen();
    }, duration);
  };

  const changeDuration = (duration: DurationPoint) => {
    setDuration(duration);
  };

  return {
    isRender,
    isOpen,
    duration,
    closeFade,
    openFade,
    changeDuration,
  };
};
