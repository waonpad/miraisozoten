import { CreateGameInput, GameResponse } from 'schema/dist/todofuken/game';

import { axios } from '@/lib/axios';
import { useMutation, MutationConfig } from '@/lib/react-query';

export const startGame = ({ data }: { data: CreateGameInput }): Promise<GameResponse> => {
  return axios.post('games', data);
};

type UseStartGameOptions = {
  config?: MutationConfig<typeof startGame>;
};

export const useStartGame = ({ config }: UseStartGameOptions = {}) => {
  return useMutation({
    // onSuccess: (res) => {
    //   queryClient.invalidateQueries([QUERY_KEYS.TODOFUKEN_GAMES, res.id]);
    // },
    ...config,
    mutationFn: startGame,
  });
};
