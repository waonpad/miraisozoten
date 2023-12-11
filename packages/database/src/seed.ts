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

  // Call the seedData function to start seeding
  seedData();
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

const toUpperSnakeCase = (str: string) => {
  return str
    .replace(/([A-Z])/g, '_$1')
    .replace(/^_/, '')
    .toUpperCase();
};

async function seedData() {
  try {
    const statsIndexKeys = Object.keys(PrefectureStatsIndex);

    for (const key of statsIndexKeys) {
      const data = PrefectureStatsIndex[key as keyof typeof PrefectureStatsIndex];
      const uppercaseKey = toUpperSnakeCase(key);

      await prisma.prefectureStatsMetadata.create({
        data: {
          // @ts-ignore
          name: uppercaseKey,
          label: data.label,
          unit: data.unit,
          sourceSiteName: data.attribution.sourceSiteName,
          sourceUrlTitle: data.attribution.sourceUrlTitle,
          sourceUrl: data.attribution.sourceUrl,
          retrievedAt: new Date(
            data.attribution.retrievedAt.year,
            data.attribution.retrievedAt.month - 1,
            data.attribution.retrievedAt.day
          ),
        },
      });
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}
