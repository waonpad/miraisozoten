import { useState, useEffect } from 'react';

import { cn } from 'ui/lib/utils';

import { useFadeTransition } from './use-fade-transition';

const isCloseStyle = 'opacity-100';

const isOpenStyle = 'opacity-0';

export const FadeTransition = () => {
  const { isOpen, duration } = useFadeTransition();

  const [classNames, setClassNames] = useState<string>(isOpenStyle);

  useEffect(() => {
    setClassNames(isOpen ? isOpenStyle : isCloseStyle);
  }, [isOpen]);

  return (
    <div
      className={cn(
        `pointer-events-none absolute left-0 top-0 z-[9999] h-screen w-screen transition-all ease-in-out bg-white ${classNames} duration-${duration}`
      )}
    />
  );
};
