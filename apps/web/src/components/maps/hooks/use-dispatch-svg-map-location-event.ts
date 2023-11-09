import { MutableRefObject, useCallback, useEffect } from 'react';

import { reactSvgMapDispatchTargetEvents } from '../config';

export const useDispatchSvgMapLocationEvent = ({
  locationId,
  dispatchElementRef,
}: {
  locationId: string;
  dispatchElementRef: MutableRefObject<HTMLElement | null>;
}) => {
  const dispatchFn = useCallback(
    (e: Event) => {
      // イベントを対象の要素に受け渡す
      const location = document.getElementById(locationId);

      if (!location) {
        console.warn(`locationId: ${locationId} is not found`);
        return;
      }

      location.dispatchEvent(new Event(e.type, e));
    },
    [locationId]
  );

  useEffect(() => {
    const currentElement = dispatchElementRef.current;
    if (!currentElement) {
      return;
    }

    // react-svg-mapが指定している全てのイベントに対してリスナーを登録する
    reactSvgMapDispatchTargetEvents.forEach((event) => {
      currentElement.addEventListener(event, dispatchFn);
    });

    // リスナーの削除
    return () => {
      reactSvgMapDispatchTargetEvents.forEach((event) => {
        currentElement.removeEventListener(event, dispatchFn);
      });
    };
  }, [dispatchElementRef, dispatchFn]);
};
