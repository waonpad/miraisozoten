import { Game } from 'database';
import { GameLogResponse } from 'schema/dist/todoufuken/game/log';
import { CreateGameLogInput } from 'schema/dist/todoufuken/game/log';

import { axios } from '@/lib/axios';
import { useMutation, MutationConfig } from '@/lib/react-query';

export const submitGameTurnAction = ({
  id,
  data,
}: {
  id: Game['id'];
  data: CreateGameLogInput;
}): Promise<GameLogResponse> => {
  return axios.post(`games/${id}/logging/turn-action`, data);
};

type UseSubmitGameLogTurnActionOptions = {
  config?: MutationConfig<typeof submitGameTurnAction>;
};

/**
 * @description
 * useGameTurnActionフック内で明示的にゲームの再取得を行うため、onSuccessは設定しない
 */
export const useSubmitGameTurnAction = ({ config }: UseSubmitGameLogTurnActionOptions = {}) => {
  return useMutation({
    // onSuccess: (res) => {
    //   queryClient.invalidateQueries([QUERY_KEYS.TODOUFUKEN_GAMES, res.gameId]);
    // },
    ...config,
    mutationFn: submitGameTurnAction,
  });
};
