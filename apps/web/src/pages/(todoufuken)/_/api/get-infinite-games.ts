import {
  PageNumberPaginationMeta,
  PageNumberPaginationOptions,
} from 'schema/dist/common/pagination';
import { GameResponse, GetGamesQueryDto } from 'schema/dist/todoufuken/game';

import { axios } from '@/lib/axios';
import {
  QUERY_KEYS,
  useInfiniteQuery,
  type ExtractFnReturnType,
  type InfiniteQueryConfig,
} from '@/lib/react-query';

export const getInfiniteGames = ({
  params,
  pageParam = 1,
}: {
  params: UseInfiniteGamesOptions['params'];
  pageParam: number;
}): Promise<[GameResponse[], PageNumberPaginationMeta]> => {
  const mergedParams: PageNumberPaginationOptions & UseInfiniteGamesOptions['params'] = {
    ...params,
    page: pageParam,
    limit: 10,
  };

  return axios.get(`/games`, { params: mergedParams });
};

type QueryFnType = typeof getInfiniteGames;

type UseInfiniteGamesOptions = {
  params: Omit<GetGamesQueryDto, 'page' | 'limit'>;
  config?: InfiniteQueryConfig<QueryFnType>;
};

export const useInfiniteGames = ({ params, config }: UseInfiniteGamesOptions) => {
  return useInfiniteQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEYS.TODOUFUKEN_GAMES, params],
    queryFn: ({ pageParam }) => getInfiniteGames({ params, pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage[1].nextPage;
    },
  });
};
