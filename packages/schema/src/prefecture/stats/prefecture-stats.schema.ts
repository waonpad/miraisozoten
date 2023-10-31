import { z } from 'nestjs-zod/z';

import type { PrefectureStats } from 'database';

export const PrefectureStatsShema = z.object({
  id: z.number(),
  population: z.number(),
  area: z.number(),
});

export const PrefectureStatsResponseSchema: z.ZodType<PrefectureStats> = PrefectureStatsShema;

export type PrefectureStatsResponse = z.infer<typeof PrefectureStatsResponseSchema>;
