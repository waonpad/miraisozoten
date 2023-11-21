import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { z } from 'nestjs-zod/z';
import { z as zod } from 'zod';

import { PrefectureStatsConfig } from './prefecture-stats.config';

import type { PrefectureStats } from 'database';

extendZodWithOpenApi(z as typeof zod);

export const PrefectureStatsShema = z.object({
  id: z.number().openapi({ example: 1 }),
  ...(Object.entries(PrefectureStatsConfig)
    .map(([, value]) => ({
      [value.camel]: z.number().openapi({ example: 100 }),
    }))
    .reduce((acc, cur) => {
      return { ...acc, ...cur };
    }) as unknown as Record<keyof Omit<PrefectureStats, 'id'>, z.ZodType<number>>),
});

export const PrefectureStatsResponseSchema: z.ZodType<PrefectureStats> = PrefectureStatsShema;

export type PrefectureStatsResponse = z.infer<typeof PrefectureStatsResponseSchema>;
