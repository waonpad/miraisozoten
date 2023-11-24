import { useEffect, useState } from 'react';

import { Prefecture } from 'database';
import { Map, SVGMap, SVGMapProps } from 'react-svg-map';

// import 'react-svg-map/lib/index.css';
import './styles/index.css';
import { Japan, relocatedViewBox } from './config';
import { DispatchSvgMapLocationElement } from './dispatch-svg-map-location-element';
import { MapSeparator } from './map-separator';
import { getRelocationType } from './utils/get-relocation-type';
import { relocationByType } from './utils/relocation-by-type';

export type JapanRadioSVGMapProps = Omit<SVGMapProps, 'map'> & {
  selected?: Prefecture['en'] | null;
  disabled?: boolean;
  relocation?: {
    okinawa?: boolean;
    hokkaido?: boolean;
  };
};

export const JapanRadioSVGMap = ({
  selected,
  disabled,
  relocation,
  ...props
}: JapanRadioSVGMapProps) => {
  const [JapanMap, setJapanMap] = useState<Map>(Japan);

  // 選択された県だけ色を変える
  const handleSelect = (select: Prefecture['en']) => {
    const locations = document.querySelectorAll('.svg-map__location');
    locations.forEach((location) => {
      location.setAttribute('aria-checked', 'false');
    });

    const target = document.getElementById(select);

    target && target.setAttribute('aria-checked', 'true');
  };

  // selectedが変更されたら色を変える
  useEffect(() => {
    if (selected) {
      handleSelect(selected);
    }
  }, [selected]);

  // relocationが変更されたら日本地図を再描画する
  useEffect(() => {
    const updatedJapanMap = { ...Japan }; // デフォルト値をコピー

    const relocationType = getRelocationType(relocation);

    if (relocationType) {
      updatedJapanMap.viewBox = relocatedViewBox[relocationType];
      updatedJapanMap.locations = relocationByType({
        relocationType,
        locations: updatedJapanMap.locations,
      });
    }

    setJapanMap(updatedJapanMap);
  }, [relocation]);

  return (
    <SVGMap
      {...props}
      map={JapanMap}
      childrenAfter={
        <>
          {/* NOTICE: 北海道も位置を変える場合のことを考えていない */}
          {/* NOTICE: 北海道の位置も変える場合また調整する */}
          <MapSeparator
            d="M 290 360 L 380 285 Z"
            isVisibled={relocation?.okinawa ?? false}
            aria-label="okinawa-separator"
          />
          {/* イベントの反応範囲を広げるための要素 */}
          <DispatchSvgMapLocationElement
            locationId="okinawa"
            d={
              relocation?.okinawa
                ? 'M 290 360 L 380 285 L 500 285 L 500 500 L 290 500 Z'
                : 'M 0 410 L 150 410 L 150 550 L 0 550 Z'
            }
          />
          <DispatchSvgMapLocationElement
            locationId="nagasaki"
            d="M 90 275 L 122 275 L 122 330 L 90 330 Z"
          />
        </>
      }
      onLocationClick={disabled ? undefined : props.onLocationClick}
      onLocationBlur={disabled ? undefined : props.onLocationBlur}
      onLocationFocus={disabled ? undefined : props.onLocationFocus}
      onLocationKeyDown={disabled ? undefined : props.onLocationKeyDown}
      onLocationMouseMove={disabled ? undefined : props.onLocationMouseMove}
      onLocationMouseOut={disabled ? undefined : props.onLocationMouseOut}
      onLocationMouseOver={disabled ? undefined : props.onLocationMouseOver}
    />
  );
};
