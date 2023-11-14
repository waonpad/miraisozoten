import { db, persistDb } from '@/__mocks__/server/db';

import { Prefectures } from '../../../../../packages/database/seed-data/prefectures';

export const seedingPrefectures = (database: typeof db) => {
  Object.values(Prefectures).forEach((prefecture) => {
    const exists = database.prefecture.findFirst({
      where: { id: { equals: prefecture.id } },
    });

    if (!exists) {
      database.prefecture.create({
        id: prefecture.id,
        name: prefecture.name,
        short: prefecture.short,
        kana: prefecture.kana,
        en: prefecture.en,
        regionId: prefecture.region.id,
      });
    }

    persistDb('prefecture');
  });

  const prefectures = database.prefecture.findMany({});

  return prefectures;
};
