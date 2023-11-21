import { CreateGameInput, GameResponse } from 'schema/dist/todoufuken/game';

import { axios } from '@/lib/axios';
import { useMutation, MutationConfig } from '@/lib/react-query';

export const startGame = ({ data }: { data: CreateGameInput }): Promise<GameResponse> => {
  return axios.post('games', data);
};

type UseStartGameOptions = {
  config?: MutationConfig<typeof startGame>;
};

/**
 * @description
 * useGameSettingsフック内で明示的にゲームの再取得を行うため、onSuccessは設定しない
 */
export const useStartGame = ({ config }: UseStartGameOptions = {}) => {
  return useMutation({
    // onSuccess: (res) => {
    //   queryClient.invalidateQueries([QUERY_KEYS.TODOUFUKEN_GAMES, res.id]);
    // },
    ...config,
    mutationFn: startGame,
  });
};
