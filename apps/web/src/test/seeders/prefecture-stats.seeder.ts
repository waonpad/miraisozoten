import { db, persistDb } from '@/__mocks__/server/db';
import { strictEntries } from '@/utils/strict-entries';

import { PrefectureStatsIndex } from '../../../../../packages/database/seed-data/prefecture-stats';
import { Prefectures } from '../../../../../packages/database/seed-data/prefectures';

export const seedingPrefectureStats = (database: typeof db) => {
  Object.values(Prefectures).forEach((prefecture) => {
    const exists = database.prefectureStats.findFirst({
      where: { id: { equals: prefecture.id } },
    });

    if (!exists) {
      const arrStats = strictEntries(PrefectureStatsIndex).map(([key, value]) => ({
        [camelize(key)]: value.prefectures[prefecture.id].value,
      }));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const objStats = arrayToObject(arrStats) as any;

      database.prefectureStats.create({
        id: prefecture.id,
        ...objStats,
      });
    }

    persistDb('prefectureStats');
  });

  const prefectureStats = database.prefectureStats.findMany({});

  return prefectureStats;
};

function camelize(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

const arrayToObject = <T extends Record<string, unknown>[]>(
  array: T
): { [K in keyof T[number]]: T[number][K] } => {
  return array.reduce((acc, cur) => {
    return { ...acc, ...cur };
  }, {}) as { [K in keyof T[number]]: T[number][K] };
};
