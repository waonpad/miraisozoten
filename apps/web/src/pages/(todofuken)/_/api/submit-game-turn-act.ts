import { Game } from 'database';
import { GameLogResponse } from 'schema/dist/todofuken/game/log';
import { CreateGameLogInput } from 'schema/dist/todofuken/game/log';

import { axios } from '@/lib/axios';
import { useMutation, MutationConfig } from '@/lib/react-query';

export const submitGameTurnAct = ({
  id,
  data,
}: {
  id: Game['id'];
  data: CreateGameLogInput;
}): Promise<GameLogResponse> => {
  return axios.post(`games/${id}/logging/turn-act`, data);
};

type UseSubmitGameLogTurnActOptions = {
  config?: MutationConfig<typeof submitGameTurnAct>;
};

export const useSubmitGameTurnAct = ({ config }: UseSubmitGameLogTurnActOptions = {}) => {
  return useMutation({
    // onSuccess: (res) => {
    //   queryClient.invalidateQueries([QUERY_KEYS.TODOFUKEN_GAMES, res.gameId]);
    // },
    ...config,
    mutationFn: submitGameTurnAct,
  });
};
