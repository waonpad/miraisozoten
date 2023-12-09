import { useState } from 'react';

import { createCtx } from '@/utils/create-ctx';

const [createdUseFusumaTransition, SetFusumaTransitionProvider] =
  createCtx<ReturnType<typeof useFusumaTransitionCtx>>();
export { SetFusumaTransitionProvider };

export const useFusumaTransition = createdUseFusumaTransition;

type DurationPoint = 0 | 75 | 100 | 150 | 200 | 300 | 500 | 700 | 1000;

export const useFusumaTransitionCtx = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [duration, setDuration] = useState<DurationPoint>(1000);

  const closeFusuma = (onClose?: () => void) => {
    setIsOpen(false);

    onClose && setTimeout(onClose, duration);
  };

  const openFusuma = (onOpen?: () => void) => {
    setIsOpen(true);

    onOpen && setTimeout(onOpen, duration);
  };

  const changeDuration = (duration: DurationPoint) => {
    setDuration(duration);
  };

  return {
    isOpen,
    duration,
    closeFusuma,
    openFusuma,
    changeDuration,
  };
};
