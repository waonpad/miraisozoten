import { PageNumberPaginationMeta } from 'schema/dist/common/pagination';

export const getPageNumberPaginationMeta = ({
  page,
  limit,
  total,
}: {
  page: number;
  limit: number;
  total: number;
}): PageNumberPaginationMeta => {
  const meta: PageNumberPaginationMeta = {
    isFirstPage: page === 1,
    isLastPage: page === Math.ceil(total / limit),
    currentPage: page,
    previousPage: page === 1 ? null : page - 1,
    nextPage: page === Math.ceil(total / limit) ? null : page + 1,
    pageCount: Math.ceil(total / limit),
    totalCount: total,
  };

  return meta;
};
