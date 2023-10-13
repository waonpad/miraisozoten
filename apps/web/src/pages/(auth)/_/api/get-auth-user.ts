import { User } from 'database';

import { axios } from '@/lib/axios';
import { QueryConfig, ExtractFnReturnType, useQuery, QUERY_KEYS } from '@/lib/react-query';

export const getAuthUser = async (): Promise<User> => {
  return axios.get<null, User>(`/auth/me`);
};

type QueryFnType = typeof getAuthUser;

type UseModelCourseOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useAuthUser = ({ config }: UseModelCourseOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEYS.AUTH_USER],
    queryFn: () => getAuthUser(),
  });
};
