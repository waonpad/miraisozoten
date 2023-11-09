import J from '@svg-maps/japan';
import { Map } from 'react-svg-map';

import { RelocationType } from '../types';
export const Japan = J as Map;

export const relocatedViewBox = {
  okinawa: '0 0 438 385',
  hokkaido: '0 107 438 411',
  okinawaAndHokkaido: '0 107 438 277',
} as const satisfies Record<RelocationType, string>;

export const relocationCoords = {
  okinawa: { dx: 300, dy: -135 },
  hokkaido: { dx: -220, dy: 120 },
} as const;

export const reactSvgMapDispatchTargetEvents = [
  'click',
  'keydown',
  'mouseover',
  'mouseout',
  'mousemove',
  'focus',
  'blur',
  'change',
] as const;
