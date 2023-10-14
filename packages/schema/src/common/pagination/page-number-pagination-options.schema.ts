import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const PageNumberPaginationOptionsSchema = z.object({
  page: z
    .number()
    .or(z.string())
    .transform((value) => Number(value))
    .default(1),
  limit: z
    .number()
    .or(z.string())
    .transform((value) => Number(value))
    .default(10),
  includePageCount: z
    .boolean()
    .or(z.string())
    .transform((value) => Boolean(value))
    .default(true),
});

export type PageNumberPaginationOptions = z.infer<typeof PageNumberPaginationOptionsSchema>;

export class PageNumberPaginationOptionsDto extends createZodDto(
  PageNumberPaginationOptionsSchema
) {}
