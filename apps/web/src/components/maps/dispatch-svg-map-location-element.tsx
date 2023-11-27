import { useRef } from 'react';

import { cn } from 'ui/lib/utils';

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
      {...props}
      ref={dispatchElementRef}
      d={d}
      className={cn('cursor-pointer opacity-0 outline-none', props.className)}
    ></path>
  );
};
