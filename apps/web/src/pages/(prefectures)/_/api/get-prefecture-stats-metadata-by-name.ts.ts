import { PrefectureStatsMetadata } from 'database';
import { PrefectureStatsMetadataResponse } from 'schema/dist/prefecture/stats/metadata';

import { axios } from '@/lib/axios';
import { QueryConfig, ExtractFnReturnType, useQuery, QUERY_KEYS } from '@/lib/react-query';

export const getPrefectureStatsMetadata = ({
  name,
}: {
  name: PrefectureStatsMetadata['name'];
}): Promise<PrefectureStatsMetadataResponse | null> => {
  return axios.get(`/prefecture-stats-metadata/name/${name}`);
};

type QueryFnType = typeof getPrefectureStatsMetadata;

type UsePrefectureStatsMetadataOptions = {
  name: PrefectureStatsMetadata['name'];
  config?: QueryConfig<QueryFnType>;
};

export const usePrefectureStatsMetadata = ({ name, config }: UsePrefectureStatsMetadataOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEYS.PREFECTURE_STATS_METADATA, 'name', name],
    queryFn: () => getPrefectureStatsMetadata({ name }),
  });
};
