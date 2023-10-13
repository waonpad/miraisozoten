import { useMutation } from '@tanstack/react-query';
import { Weapon } from 'database';

import { axios } from '@/lib/axios';
import { queryClient, type MutationConfig, QUERY_KEYS } from '@/lib/react-query';

export const deleteWeapon = ({ id }: { id: Weapon['id'] }) => {
  return axios.delete(`/weapons/${id}`);
};

type UseDeleteWeaponOptions = {
  config?: MutationConfig<typeof deleteWeapon>;
};

export const useDeleteWeapon = ({ config }: UseDeleteWeaponOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.WEAPONS]);
    },
    ...config,
    mutationFn: deleteWeapon,
  });
};
