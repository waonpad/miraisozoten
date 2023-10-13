import { useMutation } from '@tanstack/react-query';
import { Weapon } from 'database';

import { axios } from '@/lib/axios';
import { queryClient, type MutationConfig, QUERY_KEYS } from '@/lib/react-query';

export type UpdateWeaponDTO = {
  data: Weapon;
  id: Weapon['id'];
};

export const updateWeapon = ({ data, id }: UpdateWeaponDTO): Promise<Weapon> => {
  return axios.put(`/weapons/${id}`, data);
};

type UseUpdateWeaponOptions = {
  config?: MutationConfig<typeof updateWeapon>;
};

export const useUpdateWeapon = ({ config }: UseUpdateWeaponOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.WEAPONS]);
    },
    ...config,
    mutationFn: updateWeapon,
  });
};
