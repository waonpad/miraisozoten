/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { factory, manyOf, nullable, oneOf, primaryKey } from '@mswjs/data';
import {
  Game,
  GameLog,
  Prefecture,
  PrefectureStats,
  PrefectureStatsMetadata,
  Region,
  User,
} from 'database';

import { seedingPrefectureStatsMetadata } from '@/test/seeders/prefecture-stats-metadata.seeder';
import { seedingPrefectureStats } from '@/test/seeders/prefecture-stats.seeder';
import { seedingPrefectures } from '@/test/seeders/prefecture.seeder';
import { seedingRegions } from '@/test/seeders/region.seeder';

const models = {
  user: {
    id: primaryKey(String),
    name: String,
    email: nullable(String),
    emailVerified: Boolean,
    image: nullable(String),
    createdAt: Date,
    updatedAt: Date,
    games: manyOf('game'),
  } satisfies {
    [K in keyof User]: unknown;
  } & {
    [key: string]: unknown;
  },
  prefecture: {
    id: primaryKey(Number),
    name: String,
    short: String,
    kana: String,
    en: String,
    regionId: Number,
    neighbors: manyOf('prefecture'),
    region: oneOf('region'),
    games: manyOf('game'),
    stats: oneOf('prefectureStats', { unique: true }),
  } satisfies {
    [K in keyof Prefecture]: unknown;
  } & {
    [key: string]: unknown;
  },
  prefectureStats: {
    id: primaryKey(Number),
    appleConsumption: Number,
    bridgeCount: Number,
    convenienceStoreCount: Number,
    forestArea: Number,
    kerosenePrice: Number,
    morningReadingEnforcementRate: Number,
    postOfficeCount: Number,
    riceConsumption: Number,
    starbucksCount: Number,
    tunnelCount: Number,
    uniqloCount: Number,
  } satisfies {
    [K in keyof PrefectureStats]: unknown;
  } & {
    [key: string]: unknown;
  },
  prefectureStatsMetadata: {
    id: primaryKey(Number),
    name: String,
    label: String,
    unit: String,
    sourceSiteName: String,
    sourceUrlTitle: String,
    sourceUrl: String,
    retrievedAt: Date,
  } satisfies {
    [K in keyof PrefectureStatsMetadata]: unknown;
  } & {
    [key: string]: unknown;
  },
  region: {
    id: primaryKey(Number),
    name: String,
    prefectures: manyOf('prefecture'),
  } satisfies {
    [K in keyof Region]: unknown;
  } & {
    [key: string]: unknown;
  },
  game: {
    id: primaryKey(String),
    state: String,
    difficulty: String,
    mode: String,
    prefectureId: Number,
    userId: String,
    clearTime: nullable(Number),
    createdAt: Date,
    updatedAt: Date,
  } satisfies {
    [K in keyof Game]: unknown;
  } & {
    [key: string]: unknown;
  },
  gameLog: {
    id: primaryKey(Number),
    gameId: String,
    highLow: String,
    factorPrefectureId: Number,
    factorName: String,
    opponentId: Number,
    result: String,
    createdAt: Date,
    updatedAt: Date,
    game: oneOf('game'),
    factorPrefecture: oneOf('prefecture'),
    opponent: oneOf('prefecture'),
  } satisfies {
    [K in keyof GameLog]: unknown;
  } & {
    [key: string]: unknown;
  },
};

export const db = factory(models);

export type Model = keyof typeof db;

export const loadDb = () =>
  Object.assign(JSON.parse(window.localStorage.getItem('msw-db') || '{}'));

export const persistDb = (model: Model) => {
  if (process.env.NODE_ENV === 'test') return;
  const data = loadDb();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  data[model] = db[model].getAll();
  window.localStorage.setItem('msw-db', JSON.stringify(data));
};

export const initializeDb = () => {
  const database = loadDb();
  Object.entries(db).forEach(([key, model]) => {
    const dataEntres = database[key];
    if (dataEntres) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dataEntres?.forEach((entry: Record<string, any>) => {
        model.create(entry);
      });
    }
  });

  seedingRegions(db);
  seedingPrefectures(db);
  seedingPrefectureStats(db);
  seedingPrefectureStatsMetadata(db);
};

export const resetDb = () => {
  window.localStorage.clear();
};

initializeDb();
