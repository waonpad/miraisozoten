import { Prefecture } from 'database';
import { PrefectureResponse } from 'schema/dist/prefecture';

import { axios } from '@/lib/axios';
import { QueryConfig, ExtractFnReturnType, useQuery, QUERY_KEYS } from '@/lib/react-query';

export const getPrefecture = ({
  id,
}: {
  id: Prefecture['id'];
}): Promise<PrefectureResponse | null> => {
  return axios.get(`/prefectures/${id}`);
};

type QueryFnType = typeof getPrefecture;

type UsePrefectureOptions = {
  id: Prefecture['id'];
  config?: QueryConfig<QueryFnType>;
};

export const usePrefecture = ({ id, config }: UsePrefectureOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEYS.PREFECTURES, id],
    queryFn: () => getPrefecture({ id }),
  });
};
