import { useRef } from 'react';

import { useDispatchSvgMapLocationEvent } from './hooks/use-dispatch-svg-map-location-event';

export const DispatchSvgMapLocationElement = ({
  d,
  locationId,
  ...props
}: {
  locationId: string;
} & React.SVGProps<SVGPathElement> & { d: string }) => {
  const dispatchElementRef = useRef(null);
  useDispatchSvgMapLocationEvent({
    locationId,
    dispatchElementRef,
  });

  return (
    <path
      opacity={0.3}
      cursor="pointer"
      style={{ outline: 'none' }}
      {...props}
      ref={dispatchElementRef}
      d={d}
    ></path>
  );
};
