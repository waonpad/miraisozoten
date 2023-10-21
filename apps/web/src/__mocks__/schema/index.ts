import { Weapon } from 'database';

import { getMockData } from '@/__mocks__/utils/get-example-data';

export const mockData = {
  weapon: getMockData<Weapon>('weapons'),
};
