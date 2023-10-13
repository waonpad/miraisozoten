import { Weapon } from 'database';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient, QUERY_KEYS, useMutation } from '@/lib/react-query';

export type CreateWeaponDTO = {
  data: Omit<Weapon, 'id'>;
};

export const createWeapon = ({ data }: CreateWeaponDTO): Promise<Weapon> => {
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
    ...config,
    mutationFn: createWeapon,
  });
};
