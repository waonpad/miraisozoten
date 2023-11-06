import { PrefectureResponse } from 'schema/dist/prefecture';

import { axios } from '@/lib/axios';
import {
  QUERY_KEYS,
  useQuery,
  type ExtractFnReturnType,
  type QueryConfig,
} from '@/lib/react-query';

export const getPrefectures = (): Promise<PrefectureResponse[]> => {
  return axios.get(`/prefectures`);
};

type QueryFnType = typeof getPrefectures;

type UsePrefecturesOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const usePrefectures = ({ config }: UsePrefecturesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEYS.PREFECTURES],
    queryFn: getPrefectures,
  });
};
