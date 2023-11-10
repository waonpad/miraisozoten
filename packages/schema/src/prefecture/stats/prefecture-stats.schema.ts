import { z } from 'nestjs-zod/z';

import { PrefectureStatsConfig } from './prefecture-stats.config';

import type { PrefectureStats } from 'database';

export const PrefectureStatsShema = z.object({
  id: z.number(),
  ...(Object.entries(PrefectureStatsConfig)
    .map(([, value]) => ({
      [value.camel]: z.number(),
    }))
    .reduce((acc, cur) => {
      return { ...acc, ...cur };
    }) as unknown as Record<keyof Omit<PrefectureStats, 'id'>, z.ZodType<number>>),
});

export const PrefectureStatsResponseSchema: z.ZodType<PrefectureStats> = PrefectureStatsShema;

export type PrefectureStatsResponse = z.infer<typeof PrefectureStatsResponseSchema>;
