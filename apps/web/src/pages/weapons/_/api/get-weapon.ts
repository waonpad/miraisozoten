import { Weapon } from 'database';

import { axios } from '@/lib/axios';
import { QueryConfig, ExtractFnReturnType, useQuery, QUERY_KEYS } from '@/lib/react-query';

import { WeaponResponse } from '../entity/weapon.entity';

export const getWeapon = ({ id }: { id: Weapon['id'] }): Promise<WeaponResponse> => {
  return axios.get(`/weapons/${id}`);
};

type QueryFnType = typeof getWeapon;

type UseWeaponOptions = {
  id: Weapon['id'];
  config?: QueryConfig<QueryFnType>;
};

export const useWeapon = ({ id, config }: UseWeaponOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEYS.WEAPONS, id],
    queryFn: () => getWeapon({ id }),
  });
};
