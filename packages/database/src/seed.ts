import { prisma } from './index';
import { Prefectures } from '../seed-data/prefectures';
import { Regions } from '../seed-data/regions';
import { PrefectureStatsIndex } from '../seed-data/prefecture-stats';

async function main() {
  // Seed your database here

  // Create Regions
  for (const region of Object.values(Regions)) {
    await prisma.region.upsert({
      where: { id: region.id },
      update: {},
      create: region,
    });
  }

  // Create Stats
  for (const prefecture of Object.values(Prefectures)) {
    const arrStats = strictEntries(PrefectureStatsIndex).map(([key, value]) => ({
      [camelize(key)]: value.prefectures[prefecture.id].value,
    }));

    const objStats = arrayToObject(arrStats) as any;

    await prisma.prefectureStats.upsert({
      where: { id: prefecture.id },
      update: {},
      create: {
        id: prefecture.id,
        ...objStats,
      },
    });
  }

  // Create Prefectures
  for (const prefecture of Object.values(Prefectures)) {
    await prisma.prefecture.upsert({
      where: { id: prefecture.id },
      update: {},
      create: {
        id: prefecture.id,
        name: prefecture.name,
        short: prefecture.short,
        kana: prefecture.kana,
        en: prefecture.en,
        // おかしくない範囲でランダムに適当な値を入れておく
        regionId: prefecture.region.id,
      },
    });
  }

  // Create Neighbors
  for (const prefecture of Object.values(Prefectures)) {
    await prisma.prefecture.update({
      where: { id: prefecture.id },
      data: {
        neighbors: {
          connect: prefecture.neighbors.map((id) => ({ id })),
        },
      },
    });
  }
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });

function camelize(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const strictEntries = <T extends Record<string, any>>(
  object: T
): [keyof T, T[keyof T]][] => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Object.entries(object);
};

const arrayToObject = <T extends Record<string, unknown>[]>(
  array: T
): { [K in keyof T[number]]: T[number][K] } => {
  return array.reduce((acc, cur) => {
    return { ...acc, ...cur };
  }, {}) as { [K in keyof T[number]]: T[number][K] };
};
