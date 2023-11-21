import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { z } from 'nestjs-zod/z';
import { z as zod } from 'zod';

import { RegionShema } from './region';
import { PrefectureStatsShema } from './stats';

import type { Prefecture } from 'database';

extendZodWithOpenApi(z as typeof zod);

// 厳密な型定義は後でする
export const PrefectureShema = z.object({
  id: z.number().openapi({ example: 2 }),
  name: z.string().openapi({ example: '青森県' }),
  short: z.string().openapi({ example: '青森' }),
  kana: z.string().openapi({ example: 'アオモリケン' }),
  en: z.string().openapi({ example: 'Aomori' }),
  regionId: z.number().openapi({ example: 1 }),
});

export const PrefectureResponseSchema = PrefectureShema.merge(
  z.object({
    region: RegionShema,
    neighbors: z.array(PrefectureShema),
    stats: PrefectureStatsShema,
  })
) satisfies z.ZodType<Prefecture>;

export type PrefectureResponse = z.infer<typeof PrefectureResponseSchema>;
