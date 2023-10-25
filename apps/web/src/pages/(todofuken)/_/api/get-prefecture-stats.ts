import { Prefecture } from 'prefecture/dist';

import { axios } from '@/lib/axios';
import { QueryConfig, ExtractFnReturnType, useQuery, QUERY_KEYS } from '@/lib/react-query';

import { PrefectureStat, PrefectureStats } from '../config/game';

type PrefectureStatsResponse = PrefectureStats;

// レスポンスを完全にランダムな値で作って試す

const population: PrefectureStat[] = [];

for (let i = 1; i <= 47; i++) {
  population.push({
    prefectureId: i as Prefecture['id'],
    name: '人口',
    value: Math.floor(Math.random() * (10000000 - 5000000) + 5000000),
    unit: '人',
  });
}

const area: PrefectureStat[] = [];

for (let i = 1; i <= 47; i++) {
  area.push({
    prefectureId: i as Prefecture['id'],
    name: '面積',
    value: Math.floor(Math.random() * (10000000 - 5000000) + 5000000),
    unit: 'km²',
  });
}

export const getPrefectureStats = ({
  id,
  hideData = false,
}: {
  id: Prefecture['id'];
  hideData?: boolean;
}): Promise<PrefectureStatsResponse> => {
  // テスト用
  // 1~4までしか用意していないので注意
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        population: population.find((stat) => stat.prefectureId === id) as PrefectureStat,
        area: area.find((stat) => stat.prefectureId === id) as PrefectureStat,
      });
    }, 1000);
  });

  return axios.get(`/prefectures/${id}/stats`, { params: { hideData } });
};

type QueryFnType = typeof getPrefectureStats;

type UsePrefectureStatsOptions = {
  id: Prefecture['id'];
  hideData?: boolean;
  config?: QueryConfig<QueryFnType>;
};

export const usePrefectureStats = ({ id, hideData, config }: UsePrefectureStatsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEYS.PREFECTURES, id, 'stats'],
    queryFn: () => getPrefectureStats({ id, hideData }),
  });
};
