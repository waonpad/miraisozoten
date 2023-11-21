import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { z } from 'nestjs-zod/z';
import { z as zod } from 'zod';

import type { Region } from 'database';

extendZodWithOpenApi(z as typeof zod);

// 厳密な型定義は後でする
export const RegionShema = z.object({
  id: z.number().openapi({ example: 1 }),
  name: z.string().openapi({ example: '北海道・東北' }),
});

export const RegionResponseSchema: z.ZodType<Region> = RegionShema;

export type RegionResponse = z.infer<typeof RegionResponseSchema>;
