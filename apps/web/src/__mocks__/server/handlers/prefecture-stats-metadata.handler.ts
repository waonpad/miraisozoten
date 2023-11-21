/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DefaultBodyType, MockedRequest, RestHandler, rest } from 'msw';

import { env } from '@/constants/env';

import { db } from '../db';
import { delayedResponse } from '../utils/delayed-response';

export const prefectureStatsMetadataHandlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  rest.get(`${env.VITE_API_URL}/prefecture-stats-metadata`, async (_req, _res, ctx) => {
    try {
      const prefectureStatsMetadata = db.prefectureStatsMetadata.findMany({});

      return delayedResponse(ctx.json(prefectureStatsMetadata));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
];
