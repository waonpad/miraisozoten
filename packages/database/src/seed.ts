import { prisma } from './index';
import { Prefectures } from '../seed-data/prefectures';
import { Regions } from '../seed-data/regions';

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
    await prisma.prefectureStats.upsert({
      where: { id: prefecture.id },
      update: {},
      create: {
        id: prefecture.id,
        population: Math.floor(Math.random() * 1000000),
        area: Math.floor(Math.random() * 10000),
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
