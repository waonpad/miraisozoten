// import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

import { PrefectureStatsName } from '../prefecture-stats.enum';

import type { PrefectureStatsMetadata } from 'database';

export const PrefectureStatsMetadataShema = z.object({
  id: z.number(),
  name: z.enum(PrefectureStatsName),
  label: z.string(),
  unit: z.string(),
  sourceSiteName: z.string(),
  sourceUrlTitle: z.string(),
  sourceUrl: z.string().url(),
  retrievedAt: z.date(),
});

export const PrefectureStatsMetadataResponseSchema: z.ZodType<PrefectureStatsMetadata> =
  PrefectureStatsMetadataShema;

export type PrefectureStatsMetadataResponse = z.infer<typeof PrefectureStatsMetadataResponseSchema>;
