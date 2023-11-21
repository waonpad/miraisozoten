// import { createZodDto } from 'nestjs-zod';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { z } from 'nestjs-zod/z';
import { z as zod } from 'zod';

import { PrefectureStatsName } from '../prefecture-stats.enum';

import type { PrefectureStatsMetadata } from 'database';

extendZodWithOpenApi(z as typeof zod);

export const PrefectureStatsMetadataShema = z.object({
  id: z.number().openapi({ example: 1 }),
  name: z.enum(PrefectureStatsName).openapi({ example: 'POPULATION' }),
  label: z.string().openapi({ example: '人口' }),
  unit: z.string().openapi({ example: '人' }),
  sourceSiteName: z.string().openapi({ example: 'ソースサイト' }),
  sourceUrlTitle: z.string().openapi({ example: 'ソースタイトル' }),
  sourceUrl: z.string().url().openapi({ example: 'https://example.com' }),
  retrievedAt: z.date().openapi({ example: '2021-01-01T00:00:00.000Z' }),
});

export const PrefectureStatsMetadataResponseSchema: z.ZodType<PrefectureStatsMetadata> =
  PrefectureStatsMetadataShema;

export type PrefectureStatsMetadataResponse = z.infer<typeof PrefectureStatsMetadataResponseSchema>;
