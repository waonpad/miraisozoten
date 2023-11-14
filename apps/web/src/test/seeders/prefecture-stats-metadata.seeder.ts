import { db, persistDb } from '@/__mocks__/server/db';
import { strictEntries } from '@/utils/strict-entries';

import { PrefectureStatsIndex } from '../../../../../packages/database/seed-data/prefecture-stats';

export const seedingPrefectureStatsMetadata = (database: typeof db) => {
  let count = 1;

  strictEntries(PrefectureStatsIndex).forEach(([key, value]) => {
    const exists = database.prefectureStatsMetadata.findFirst({
      where: { name: { equals: toUpperSnakeCase(key) } },
    });

    if (!exists) {
      const year = value.attribution.retrievedAt.year;
      const month = value.attribution.retrievedAt.month;
      const day = value.attribution.retrievedAt.day;

      database.prefectureStatsMetadata.create({
        id: count,
        name: toUpperSnakeCase(key),
        label: value.label,
        unit: value.unit,
        sourceSiteName: value.attribution.sourceSiteName,
        sourceUrlTitle: value.attribution.sourceUrlTitle,
        sourceUrl: value.attribution.sourceUrl,
        retrievedAt: new Date(year, month, day).toString(),
      });

      count++;
    }

    persistDb('prefectureStatsMetadata');
  });

  const prefectureStatsMetadata = database.prefectureStatsMetadata.findMany({});

  return prefectureStatsMetadata;
};

const toUpperSnakeCase = (str: string) => {
  return str
    .replace(/([A-Z])/g, '_$1')
    .replace(/^_/, '')
    .toUpperCase();
};
