import { Location } from 'react-svg-map';

import { relocationCoords } from '../config';
import { RelocationType } from '../types';

import { shiftPath } from './shift-path';

export const relocationByType = ({
  locations,
  relocationType,
}: {
  locations: Location[];
  relocationType: RelocationType;
}) => {
  if (relocationType === 'okinawa') {
    return locations.map((location) => {
      if (location.id === 'okinawa') {
        return {
          ...location,
          path: shiftPath({ d: location.path, ...relocationCoords.okinawa }),
        };
      }
      return location;
    });
  }

  if (relocationType === 'hokkaido') {
    locations = locations.map((location) => {
      if (location.id === 'hokkaido') {
        return {
          ...location,
          path: shiftPath({ d: location.path, ...relocationCoords.hokkaido }),
        };
      }
      return location;
    });
  }

  if (relocationType === 'okinawaAndHokkaido') {
    locations = locations.map((location) => {
      if (location.id === 'okinawa') {
        return {
          ...location,
          path: shiftPath({ d: location.path, ...relocationCoords.okinawa }),
        };
      }
      if (location.id === 'hokkaido') {
        return {
          ...location,
          path: shiftPath({ d: location.path, ...relocationCoords.hokkaido }),
        };
      }
      return location;
    });
  }

  return locations;
};
