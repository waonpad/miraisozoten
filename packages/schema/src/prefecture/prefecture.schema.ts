import { z } from 'nestjs-zod/z';

import { RegionShema } from './region';

import type { Prefecture } from 'database';

// 厳密な型定義は後でする
export const PrefectureShema = z.object({
  id: z.number(),
  name: z.string(),
  short: z.string(),
  kana: z.string(),
  en: z.string(),
  regionId: z.number(),
});

export const PrefectureResponseSchema = PrefectureShema.merge(
  z.object({
    region: RegionShema,
  })
) satisfies z.ZodType<Prefecture>;

export type PrefectureResponse = z.infer<typeof PrefectureResponseSchema>;
