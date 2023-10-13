import { Weapon } from 'database';
import {
  PageNumberPagination,
  PageNumberPaginationOptions,
} from 'prisma-extension-pagination/dist/types';

import { axios } from '@/lib/axios';
import {
  QUERY_KEYS,
  useInfiniteQuery,
  type ExtractFnReturnType,
  type InfiniteQueryConfig,
} from '@/lib/react-query';

export const getWeapons = ({
  pageParam = 1,
}: {
  pageParam: number;
}): Promise<[Weapon[], PageNumberPagination]> => {
  const params: PageNumberPaginationOptions = {
    page: pageParam,
    limit: 10,
    includePageCount: true,
  };

  return axios.get(`/weapons/pages`, { params });
};

type QueryFnType = typeof getWeapons;

type UseWeaponsOptions = {
  config?: InfiniteQueryConfig<QueryFnType>;
};

export const useWeapons = ({ config }: UseWeaponsOptions = {}) => {
  return useInfiniteQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEYS.WEAPONS],
    queryFn: ({ pageParam }) => getWeapons({ pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage[1].nextPage;
    },
  });
};
