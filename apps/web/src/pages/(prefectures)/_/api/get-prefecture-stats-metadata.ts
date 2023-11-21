import { PrefectureStatsMetadataResponse } from 'schema/dist/prefecture/stats/metadata';

import { axios } from '@/lib/axios';
import {
  QUERY_KEYS,
  useQuery,
  type ExtractFnReturnType,
  type QueryConfig,
} from '@/lib/react-query';

export const getPrefectureStatsMetadata = (): Promise<PrefectureStatsMetadataResponse[]> => {
  return axios.get(`/prefecture-stats-metadata`);
};

type QueryFnType = typeof getPrefectureStatsMetadata;

type UsePrefectureStatsMetadataOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const usePrefectureStatsMetadata = ({ config }: UsePrefectureStatsMetadataOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEYS.PREFECTURE_STATS_METADATA],
    queryFn: getPrefectureStatsMetadata,
  });
};
