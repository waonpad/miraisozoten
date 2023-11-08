import { useState, useEffect, MutableRefObject, useCallback } from 'react';

import { useWindowDimensions } from './use-window-dimensions';

export type ClientRect = {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export const useElementClientRect = (ref: MutableRefObject<HTMLElement | null>) => {
  const { width, height } = useWindowDimensions();
  const [domLoading, setDOMLoading] = useState<boolean>(true);
  const [clientRect, setClientRect] = useState<ClientRect>();

  const getClientRect = useCallback(() => {
    if (ref.current !== null) {
      const clientRect = ref.current.getBoundingClientRect();
      setClientRect(clientRect);
    }
  }, [ref]);

  useEffect(() => {
    const handleScroll = () => {
      getClientRect();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [getClientRect]);

  useEffect(() => {
    getClientRect();
  }, [domLoading, ref, width, height, getClientRect]);

  return {
    clientRect,
    setDOMLoading,
  };
};
