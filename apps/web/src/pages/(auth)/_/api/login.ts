import { User } from 'database';

import { axios } from '@/lib/axios';
import { queryClient, type MutationConfig, useMutation, QUERY_KEYS } from '@/lib/react-query';

export type LoginCredentialsDTO = {
  authToken: string;
};

export const login = ({ authToken }: LoginCredentialsDTO): Promise<User> => {
  return axios.post<{ token: string }, User>(`/auth/login`, null, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

type UseLoginOptions = {
  config?: MutationConfig<typeof login>;
};

export const useLogin = ({ config }: UseLoginOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.AUTH_USER]);
    },
    ...config,
    mutationFn: login,
  });
};
