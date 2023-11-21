import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { PageNumberPaginationMeta as OriginMeta } from 'prisma-extension-pagination/dist/types';
import { z as zod } from 'zod';

extendZodWithOpenApi(z as typeof zod);

export const PageNumberPaginationMetachema = z.object({
  isFirstPage: z.boolean().openapi({ example: true }),
  isLastPage: z.boolean().openapi({ example: false }),
  currentPage: z.number().openapi({ example: 1 }),
  previousPage: z.number().nullable().openapi({ example: null }),
  nextPage: z.number().nullable().openapi({ example: 2 }),
  pageCount: z.number().openapi({ example: 10 }),
  totalCount: z.number().openapi({ example: 100 }),
});

export type PageNumberPaginationMeta = OriginMeta<true>;

export const PageNumberPaginationMetaResponseSchema =
  PageNumberPaginationMetachema satisfies z.ZodType<PageNumberPaginationMeta>;

export class PageNumberPaginationMetaDto extends createZodDto(PageNumberPaginationMetachema) {}
