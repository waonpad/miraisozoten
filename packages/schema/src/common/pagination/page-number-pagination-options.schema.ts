import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { PageNumberPaginationOptions as OriginOptions } from 'prisma-extension-pagination/dist/types';

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
});

export type PageNumberPaginationOptions = Omit<OriginOptions, 'includePageCount'>;

export class PageNumberPaginationOptionsDto extends createZodDto(
  PageNumberPaginationOptionsSchema
) {}
