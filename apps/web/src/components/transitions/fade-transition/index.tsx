import { cn } from 'ui/lib/utils';

import { useFadeTransition } from './use-fade-transition';

export const FadeTransition = () => {
  const { isOpen, duration } = useFadeTransition();

  return (
    <div
      className={cn(
        `pointer-events-none absolute left-0 top-0 z-[9999] h-screen w-screen transition-all ease-in-out bg-white ${
          !isOpen ? 'opacity-100' : 'opacity-0'
        } duration-${duration}`
      )}
    />
  );
};
