import { PrefectureStatsName } from './prefecture-stats.enum';

// prettier-ignore
export const PrefectureStatsConfig = {
  AREA: {
    name: 'AREA',
    camel: 'area',
    label: '面積',
    unit: 'km²',
  },
  POPULATION: {
    name: 'POPULATION',
    camel: 'population',
    label: '人口',
    unit: '人',
  },
} as const satisfies {
  [key in PrefectureStatsName]: {
    name: PrefectureStatsName;
    camel: string;
    label: string;
    unit: string;
  };
};

export type PrefectureStatsNameCamel =
  (typeof PrefectureStatsConfig)[keyof typeof PrefectureStatsConfig]['camel'];
