import { JapanRadioSVGMapProps } from '../japan-radio-svg-map';
import { RelocationType } from '../types';

export const getRelocationType = (
  relocation: JapanRadioSVGMapProps['relocation']
): RelocationType | null => {
  return relocation?.okinawa && relocation?.hokkaido
    ? 'okinawaAndHokkaido'
    : relocation?.okinawa
    ? 'okinawa'
    : relocation?.hokkaido
    ? 'hokkaido'
    : null;
};
