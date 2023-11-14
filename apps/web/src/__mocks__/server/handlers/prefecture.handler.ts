/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DefaultBodyType, MockedRequest, RestHandler, rest } from 'msw';

import { env } from '@/constants/env';

import { Prefectures as PrefecturesSeedData } from '../../../../../../packages/database/seed-data/prefectures';
import { db } from '../db';
import { delayedResponse } from '../utils/delayed-response';

// TODO: statsとneighborsは現状使っていないので後から削除するか・・・

export const prefectureHandlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  rest.get(`${env.VITE_API_URL}/prefectures`, async (_req, _res, ctx) => {
    try {
      // リレーションクエリできない？っぽいので自力でやらないといけなさそう
      const prefectures = db.prefecture.findMany({});

      const includedPrefectures = prefectures.map((prefecture) => {
        const prefectureStats = db.prefectureStats.findFirst({
          where: { id: { equals: prefecture.id } },
        });

        const region = db.region.findFirst({
          where: { id: { equals: prefecture.regionId } },
        });

        const neighbors = db.prefecture.findMany({
          where: {
            id: {
              in: PrefecturesSeedData[prefecture.id as keyof typeof PrefecturesSeedData]
                .neighbors as unknown as number[],
            },
          },
        });

        return {
          ...prefecture,
          region,
          neighbors,
          stats: prefectureStats,
        };
      });

      return delayedResponse(ctx.json(includedPrefectures));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
];
