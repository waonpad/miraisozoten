import { WeaponResponse } from 'schema/dist/weapon';

import { axios } from '@/lib/axios';
import {
  QUERY_KEYS,
  useQuery,
  type ExtractFnReturnType,
  type QueryConfig,
} from '@/lib/react-query';

export const getWeapons = (): Promise<WeaponResponse[]> => {
  return axios.get(`/weapons`);
};

type QueryFnType = typeof getWeapons;

type UseWeaponsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useWeapons = ({ config }: UseWeaponsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEYS.WEAPONS],
    queryFn: getWeapons,
  });
};
