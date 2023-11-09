/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';

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
    // 要素の初期化
    resetJapanSvg();

    if (props.relocation?.okinawa && !props.relocation?.hokkaido) {
      relocationOnlyOkinawa();
    } else if (!props.relocation?.okinawa && props.relocation?.hokkaido) {
      relocationOnlyHokkaido();
    } else if (props.relocation?.okinawa && props.relocation?.hokkaido) {
      relocationOkinawaAndHokkaido();
    }

    // NOTICE: 北海道の位置を変えることは想定していない
    // NOTICE: 北海道の位置も変える場合はまた調整する
    if (props.relocation?.okinawa && !props.relocation?.hokkaido) {
      addOkinwaSeparator();
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

const japanSvgClassName = 'svg-map';
const japanSvgDefaultViewBox = '0 0 438 516';
const getJapanSvg = () => document.getElementsByClassName(japanSvgClassName)[0];

const prefectureSvgClassName = 'svg-map__location';
const separatorClassName = 'prefcture-separator';
const okinawaSeparatorId = 'okinawa-separator';

/**
 * JSで操作した要素をまとめてリセットする関数
 */
const resetJapanSvg = () => {
  const japanSvg = getJapanSvg();

  // viewboxをデフォルトに戻す
  japanSvg?.setAttribute('viewBox', japanSvgDefaultViewBox);

  const prefectures = document.getElementsByClassName(prefectureSvgClassName);

  // 都道府県の移動をリセット
  Array.from(prefectures).forEach((prefecture) => {
    prefecture.setAttribute('transform', '');
  });

  const separators = document.getElementsByClassName(separatorClassName);

  // セパレーターを削除
  Array.from(separators).forEach((separator) => {
    separator.remove();
  });
};

/**
 * 沖縄県だけ位置を変更する
 */
const relocationOnlyOkinawa = () => {
  // svgタグを取得
  const japanSvg = getJapanSvg();

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
  const japanSvg = getJapanSvg();

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
  const japanSvg = getJapanSvg();

  // viewboxを変更
  japanSvg?.setAttribute('viewBox', '0 107 438 277');

  const hokkaido = document.getElementById('hokkaido');
  const okinawa = document.getElementById('okinawa');

  // 移動
  hokkaido?.setAttribute('transform', 'translate(-220, 120)');
  okinawa?.setAttribute('transform', 'translate(300, -135)');
};

/**
 * 位置を移動させたことをわかりやすくするため、
 * 沖縄県と本州の境界線を引く
 */
const addOkinwaSeparator = () => {
  if (document.getElementById(okinawaSeparatorId)) return;

  const okinawaSeparator = (
    <path
      id={okinawaSeparatorId}
      className={separatorClassName}
      d="M 290 360 L 380 285 Z"
      stroke="gray"
      strokeWidth="2"
    />
  );
  const okinawaSeparatorString = ReactDOMServer.renderToString(okinawaSeparator);

  const japanSvg = getJapanSvg();

  // https://developer.mozilla.org/ja/docs/Web/API/Element/insertAdjacentHTML
  japanSvg?.insertAdjacentHTML('beforeend', okinawaSeparatorString);

  // 通常のjsのように要素を作成する場合、createElemetNSを使う
  // (svgはcreateElemetでは追加できない)
  // https://developer.mozilla.org/ja/docs/Web/API/Document/createElementNS
};
