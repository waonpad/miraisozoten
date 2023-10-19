import {
  PageNumberPaginationMeta,
  PageNumberPaginationOptions,
} from 'schema/dist/common/pagination';
import { WeaponResponse } from 'schema/dist/weapon';

import { axios } from '@/lib/axios';
import {
  QUERY_KEYS,
  useInfiniteQuery,
  type ExtractFnReturnType,
  type InfiniteQueryConfig,
} from '@/lib/react-query';

export const getWeaponsWithPages = ({
  pageParam = 1,
}: {
  pageParam: number;
}): Promise<[WeaponResponse[], PageNumberPaginationMeta]> => {
  const params: PageNumberPaginationOptions = {
    page: pageParam,
    limit: 10,
  };

  return axios.get(`/weapons/pages`, { params });
};

type QueryFnType = typeof getWeaponsWithPages;

type UseWeaponsWithPagesOptions = {
  config?: InfiniteQueryConfig<QueryFnType>;
};

export const useWeaponsWithPages = ({ config }: UseWeaponsWithPagesOptions = {}) => {
  return useInfiniteQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEYS.WEAPONS],
    queryFn: ({ pageParam }) => getWeaponsWithPages({ pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage[1].nextPage;
    },
  });
};
