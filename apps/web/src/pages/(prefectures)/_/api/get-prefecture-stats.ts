import { PrefectureStats } from 'database';
import { PrefectureStatsResponse } from 'schema/dist/prefecture/stats';

import { axios } from '@/lib/axios';
import { QueryConfig, ExtractFnReturnType, useQuery, QUERY_KEYS } from '@/lib/react-query';

export const getPrefectureStats = ({
  id,
}: {
  id: PrefectureStats['id'];
}): Promise<PrefectureStatsResponse | null> => {
  return axios.get(`/prefectures/${id}/stats`);
};

type QueryFnType = typeof getPrefectureStats;

type UsePrefectureStatsOptions = {
  id: PrefectureStats['id'];
  config?: QueryConfig<QueryFnType>;
};

export const usePrefectureStats = ({ id, config }: UsePrefectureStatsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEYS.PREFECTURES, id, 'stats'],
    queryFn: () => getPrefectureStats({ id }),
  });
};
