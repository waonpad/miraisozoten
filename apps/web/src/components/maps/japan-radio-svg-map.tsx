/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import Japan from '@svg-maps/japan';
import { Prefecture } from 'database';
import { SVGMap, SVGMapProps } from 'react-svg-map';
import 'react-svg-map/lib/index.css';

export type JapanRadioSVGMapProps = Omit<SVGMapProps, 'map'> & {
  selected?: Prefecture['en'] | null;
  disabled?: boolean;
  relocation?: {
    okinawa?: boolean;
    hokkaido?: boolean;
  };
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

  useEffect(() => {
    if (props.relocation?.okinawa && !props.relocation?.hokkaido) {
      relocationOnlyOkinawa();
    } else if (!props.relocation?.okinawa && props.relocation?.hokkaido) {
      relocationOnlyHokkaido();
    } else if (props.relocation?.okinawa && props.relocation?.hokkaido) {
      relocationOkinawaAndHokkaido();
    }
  }, [props.relocation]);

  return (
    <SVGMap
      {...props}
      map={Japan}
      onLocationClick={props.disabled ? undefined : props.onLocationClick}
    />
  );
};

/**
 * 沖縄県だけ位置を変更する
 */
const relocationOnlyOkinawa = () => {
  // svgタグを取得
  const japanSvg = document.getElementsByClassName('svg-map')[0];

  // viewboxを変更
  japanSvg?.setAttribute('viewBox', '0 0 438 385');

  const okinawa = document.getElementById('okinawa');

  // 右上に移動
  okinawa?.setAttribute('transform', 'translate(300, -135)');
};

/**
 * 北海道だけ位置を変更する
 */
const relocationOnlyHokkaido = () => {
  // svgタグを取得
  const japanSvg = document.getElementsByClassName('svg-map')[0];

  // viewboxを変更
  japanSvg?.setAttribute('viewBox', '0 107 438 411');

  const hokkaido = document.getElementById('hokkaido');

  // 左下に移動
  hokkaido?.setAttribute('transform', 'translate(-220, 120)');
};

/**
 * 沖縄県と北海道の位置を変更する
 */
const relocationOkinawaAndHokkaido = () => {
  // svgタグを取得
  const japanSvg = document.getElementsByClassName('svg-map')[0];

  // viewboxを変更
  japanSvg?.setAttribute('viewBox', '0 107 438 277');

  const hokkaido = document.getElementById('hokkaido');
  const okinawa = document.getElementById('okinawa');

  // 移動
  hokkaido?.setAttribute('transform', 'translate(-220, 120)');
  okinawa?.setAttribute('transform', 'translate(300, -135)');
};
