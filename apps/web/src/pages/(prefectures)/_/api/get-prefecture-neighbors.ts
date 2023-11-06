import { Prefecture } from 'database';
import { PrefectureResponse } from 'schema/dist/prefecture';

import { axios } from '@/lib/axios';
import { QueryConfig, ExtractFnReturnType, useQuery, QUERY_KEYS } from '@/lib/react-query';

export const getPrefectureNeighbors = ({
  id,
}: {
  id: Prefecture['id'];
}): Promise<PrefectureResponse[] | null> => {
  return axios.get(`/prefectures/${id}/neighbors`);
};

type QueryFnType = typeof getPrefectureNeighbors;

type UsePrefectureNeighborsOptions = {
  id: Prefecture['id'];
  config?: QueryConfig<QueryFnType>;
};

export const usePrefectureNeighbors = ({ id, config }: UsePrefectureNeighborsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEYS.PREFECTURES, id, 'neighbors'],
    queryFn: () => getPrefectureNeighbors({ id }),
  });
};
