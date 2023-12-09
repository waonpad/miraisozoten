import { cn } from 'ui/lib/utils';

import FusumaLeft from '@/assets/fusuma-left.png';
import FusumaRight from '@/assets/fusuma-right.png';

import { useFusumaTransition } from './use-fusuma-transition';

const fusumaStyle = {
  wrapper: `absolute top-0 z-[9999] h-screen min-h-screen min-w-[50vw] transition-all ease-in-out`,
  img: `h-full w-full object-cover`,
};

export const FusumaTransition = () => {
  const { isOpen, duration } = useFusumaTransition();

  return (
    // とりあえず動くだけ
    <div className="pointer-events-none absolute">
      <div className="relative min-h-screen min-w-[100vw] overflow-hidden">
        <div
          className={cn(
            `${fusumaStyle.wrapper} ${!isOpen ? 'right-1/2' : 'right-[150vw]'} duration-${duration}`
          )}
        >
          <img
            src={FusumaLeft}
            alt="ふすま画像左"
            className={`${fusumaStyle.img} object-right-top`}
          />
        </div>
        <div
          className={cn(
            `${fusumaStyle.wrapper} ${!isOpen ? 'left-1/2' : 'left-[150vw]'} duration-${duration}`
          )}
        >
          <img
            src={FusumaRight}
            alt="ふすま画像右"
            className={`${fusumaStyle.img} object-left-top`}
          />
        </div>
      </div>
    </div>
  );
};
