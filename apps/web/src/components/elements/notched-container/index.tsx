import { useEffect, useMemo, useRef, useState } from 'react';

import _ from 'lodash';

import { ClientRect, useElementClientRect } from '@/utils/hooks/use-element-client-rect';

import { defaultNotchOptions } from './config';
import { generateCoords } from './logics/generate-coords';
import { updateGeneratedCoords } from './logics/update-generated-coords';
import { Coord, Range, Percent, Px, Side } from './types';
import { generatePolygonCoords } from './utils/generate-polygon-coords';

// TODO: 端に切り込みがあると縦横で干渉して変になるので、端には切り込みを作らないようにする

// TODO: リサイズしても、切り込みの形は変えず、間隔だけ変えるようにする

// TODO: リサイズしたとき縦横比が変わって潰れると切り込みの間隔がきつくなったり広くなってしまったりする問題

// TODO: インターバルや切り込みの大きさが想定から外れていると見た目がおかしくなってしまう問題

export type NotchedContainerProps = {
  notchOptions?: {
    depth: Range<Px>;
    width: Range<Px>;
    interval: Range<Percent>;
  };
} & React.HTMLAttributes<HTMLDivElement>;

export const NotchedContainer = ({ children, notchOptions, ...props }: NotchedContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [prevClientRect, setPrevClientRect] = useState<ClientRect>();
  const { clientRect } = useElementClientRect(ref);

  const mergedNotchOptions = useMemo(
    () => _.merge({}, defaultNotchOptions, notchOptions),
    [notchOptions]
  );

  const [coords, setCoords] = useState<(Coord & { role: Side })[]>([]);

  useEffect(() => {
    if (!clientRect) return;

    if (coords.length > 0 && prevClientRect) {
      // リサイズ時に再計算する

      const updatedCoords = updateGeneratedCoords({
        prevClientRect,
        clientRect,
        coords,
        sides: [...Side],
      });

      setCoords(updatedCoords);
    } else {
      // 初回表示

      const { width, height } = clientRect;

      const allSideCoords = Side.map((side) =>
        generateCoords({
          notchOptions: mergedNotchOptions,
          containerDimensions: { width, height },
          side,
        })
      );

      const flatCoords = _.flatten(allSideCoords);

      setCoords(flatCoords);
    }

    // 保存する
    setPrevClientRect(clientRect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientRect, mergedNotchOptions]);

  return (
    <>
      <div
        {...props}
        ref={ref}
        style={{
          ...props.style,
          clipPath: generatePolygonCoords(coords),
        }}
      >
        {children}
      </div>
    </>
  );
};
