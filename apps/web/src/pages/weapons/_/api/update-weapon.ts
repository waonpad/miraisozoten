import { useMutation } from '@tanstack/react-query';
import { Weapon } from 'database';
import { UpdateWeaponInput, WeaponResponse } from 'schema/dist/weapon';

import { axios } from '@/lib/axios';
import { queryClient, type MutationConfig, QUERY_KEYS } from '@/lib/react-query';

export const updateWeapon = ({
  data,
  id,
}: {
  data: UpdateWeaponInput;
  id: Weapon['id'];
}): Promise<WeaponResponse> => {
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
