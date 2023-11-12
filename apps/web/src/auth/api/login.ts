import { UserResponse } from 'schema/dist/user';

import { axios } from '@/lib/axios';
import { queryClient, type MutationConfig, useMutation, QUERY_KEYS } from '@/lib/react-query';

export type LoginCredentialsDTO = {
  authToken: string;
};

export const login = ({ authToken }: LoginCredentialsDTO): Promise<UserResponse> => {
  return axios.post<{ token: string }, UserResponse>(`/auth/login`, null, {
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
