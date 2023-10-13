import { axios } from '@/lib/axios';
import { MutationConfig, queryClient, QUERY_KEYS, useMutation } from '@/lib/react-query';

import { CreateWeaponInput, WeaponResponse } from '../entity/weapon.entity';

export const createWeapon = ({ data }: { data: CreateWeaponInput }): Promise<WeaponResponse> => {
  return axios.post('weapons', data);
};

type UseCreateWeaponOptions = {
  config?: MutationConfig<typeof createWeapon>;
};

export const useCreateWeapon = ({ config }: UseCreateWeaponOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.WEAPONS]);
    },
    onError: (error) => {
      // これがバリデーションエラーの結果配列
      console.error(error.response?.data.errors);
    },
    ...config,
    mutationFn: createWeapon,
  });
};
