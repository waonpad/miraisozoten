import { db, persistDb } from '@/__mocks__/server/db';

import { Regions } from '../../../../../packages/database/seed-data/regions';

export const seedingRegions = (database: typeof db) => {
  Object.values(Regions).forEach((region) => {
    const exists = database.region.findFirst({
      where: { id: { equals: region.id } },
    });

    if (!exists) {
      database.region.create({
        id: region.id,
        name: region.name,
      });
    }

    persistDb('region');
  });

  const regions = database.region.findMany({});

  return regions;
};
