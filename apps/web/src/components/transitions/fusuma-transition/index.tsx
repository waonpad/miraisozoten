import { useEffect, useState } from 'react';

import { cn } from 'ui/lib/utils';

import FusumaLeft from '@/assets/fusuma-left.png';
import FusumaRight from '@/assets/fusuma-right.png';

export type FusumaTransitionProps = {
  duration: 0 | 75 | 100 | 150 | 200 | 300 | 500 | 700 | 1000;
  isClosed: boolean;
  onClose?: () => void;
  onOpen?: () => void;
};

const fusumaStyle = {
  wrapper: `absolute top-0 z-[9999] h-screen min-h-screen min-w-[50vw] transition-all ease-in-out`,
  img: `h-full w-full object-cover`,
};

/**
 * @todo
 * 初期状態でisClosedがtrueの場合を想定した実装をまだしていない
 */
export const FusumaTransition = ({
  duration,
  isClosed,
  onClose,
  onOpen,
}: FusumaTransitionProps) => {
  const [closed, setClosed] = useState(false);

  useEffect(
    () => {
      if (isClosed) {
        setTimeout(() => {
          onClose && onClose();

          setClosed(true);
        }, duration);

        return;
      }

      if (!isClosed && closed) {
        setTimeout(() => {
          onOpen && onOpen();

          setClosed(false);
        }, duration);

        return;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isClosed]
  );

  return (
    <>
      <div
        className={cn(
          `${fusumaStyle.wrapper} ${isClosed ? 'right-1/2' : 'right-[150vw]'} duration-${duration}`
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
          `${fusumaStyle.wrapper} ${isClosed ? 'left-1/2' : 'left-[150vw]'} duration-${duration}`
        )}
      >
        <img
          src={FusumaRight}
          alt="ふすま画像右"
          className={`${fusumaStyle.img} object-left-top`}
        />
      </div>
    </>
  );
};
