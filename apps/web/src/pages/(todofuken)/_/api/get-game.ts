import { Game } from 'database';
import { GameResponse } from 'schema/dist/todofuken/game';

import { axios } from '@/lib/axios';
import { QueryConfig, ExtractFnReturnType, useQuery, QUERY_KEYS } from '@/lib/react-query';

export const getGame = ({ id }: { id: Game['id'] }): Promise<GameResponse | null> => {
  return axios.get(`/games/${id}`);
};

type QueryFnType = typeof getGame;

type UseGameOptions = {
  id: Game['id'];
  config?: QueryConfig<QueryFnType>;
};

export const useGame = ({ id, config }: UseGameOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEYS.TODOFUKEN_GAMES, id],
    queryFn: () => getGame({ id }),
  });
};
