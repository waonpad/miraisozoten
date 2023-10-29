/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import Japan from '@svg-maps/japan';
import { Prefecture } from 'database';
import { SVGMap, SVGMapProps } from 'react-svg-map';
import 'react-svg-map/lib/index.css';

export type JapanRadioSVGMapProps = Omit<SVGMapProps, 'map'> & {
  selected?: Prefecture['en'] | null;
  disabled?: boolean;
};

export const JapanRadioSVGMap = (props: JapanRadioSVGMapProps) => {
  // 選択された県だけ色を変える
  const handleSelect = (select: Prefecture['en']) => {
    const locations = document.querySelectorAll('.svg-map__location');
    locations.forEach((location) => {
      location.setAttribute('aria-checked', 'false');
    });

    const target = document.getElementById(select);

    target && target.setAttribute('aria-checked', 'true');
  };

  // props.selectedが変更されたら色を変える
  useEffect(() => {
    if (props.selected) {
      handleSelect(props.selected);
    }
  }, [props.selected]);

  return (
    <SVGMap
      {...props}
      map={Japan}
      onLocationClick={props.disabled ? undefined : props.onLocationClick}
    />
  );
};
