import { z } from 'nestjs-zod/z';

import type { Region } from 'database';

// 厳密な型定義は後でする
export const RegionShema = z.object({
  id: z.number(),
  name: z.string(),
});

export const RegionResponseSchema: z.ZodType<Region> = RegionShema;

export type RegionResponse = z.infer<typeof RegionResponseSchema>;
