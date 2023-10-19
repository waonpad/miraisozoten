import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { PageNumberPaginationMeta as OriginMeta } from 'prisma-extension-pagination/dist/types';

export const PageNumberPaginationMetachema = z.object({
  isFirstPage: z.boolean(),
  isLastPage: z.boolean(),
  currentPage: z.number(),
  previousPage: z.number().nullable(),
  nextPage: z.number().nullable(),
  pageCount: z.number(),
  totalCount: z.number(),
});

export type PageNumberPaginationMeta = OriginMeta<true>;

export const PageNumberPaginationMetaResponseSchema =
  PageNumberPaginationMetachema satisfies z.ZodType<PageNumberPaginationMeta>;

export class PageNumberPaginationMetaDto extends createZodDto(PageNumberPaginationMetachema) {}
