import { useEffect, useState } from 'react';

import { cn } from 'ui/lib/utils';

import FusumaLeft from '@/assets/fusuma-left.png';
import FusumaRight from '@/assets/fusuma-right.png';

import { useFusumaTransition } from './use-fusuma-transition';

const fusumaStyle = {
  wrapper: `absolute top-0 z-[9999] h-screen min-h-screen min-w-[50vw] transition-all ease-in-out`,
  img: `h-full w-full object-cover`,
};

const isCloseStyle = {
  left: 'right-1/2',
  right: 'left-1/2',
};

const isOpenStyle = {
  left: 'right-[150vw]',
  right: 'left-[150vw]',
};

export const FusumaTransition = () => {
  const { isOpen, duration } = useFusumaTransition();

  const [classNames, setClassNames] = useState<{
    left: string;
    right: string;
  }>(isOpenStyle);

  useEffect(() => {
    setClassNames(isOpen ? isOpenStyle : isCloseStyle);
  }, [isOpen]);

  return (
    // とりあえず動くだけ
    <div className="pointer-events-none absolute">
      <div className="relative min-h-screen min-w-[100vw] overflow-hidden">
        <div className={cn(`${fusumaStyle.wrapper} ${classNames.left} duration-${duration}`)}>
          <img
            src={FusumaLeft}
            alt="ふすま画像左"
            className={`${fusumaStyle.img} object-right-top`}
          />
        </div>
        <div className={cn(`${fusumaStyle.wrapper} ${classNames.right} duration-${duration}`)}>
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
