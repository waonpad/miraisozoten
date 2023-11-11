import { Game } from 'database';
import { GameResponse } from 'schema/dist/todoufuken/game';

import { axios } from '@/lib/axios';
import { useMutation, MutationConfig, queryClient, QUERY_KEYS } from '@/lib/react-query';

export const giveUpGame = ({ id }: { id: Game['id'] }): Promise<GameResponse> => {
  return axios.patch(`/games/${id}/give-up`);
};

type UseGiveUpGameOptions = {
  config?: MutationConfig<typeof giveUpGame>;
};

export const useGiveUpGame = ({ config }: UseGiveUpGameOptions = {}) => {
  return useMutation({
    onSuccess: (res) => {
      queryClient.invalidateQueries([QUERY_KEYS.TODOUFUKEN_GAMES, res.id]);
    },
    ...config,
    mutationFn: giveUpGame,
  });
};
