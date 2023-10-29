export const PrefectureStatsName = ['POPULATION', 'AREA'] as const;

export type PrefectureStatsName = (typeof PrefectureStatsName)[number];

export const PrefectureStatsConf = {
  POPULATION: {
    name: 'POPULATION',
    camel: 'population',
    label: '人口',
    unit: '人',
  },
  AREA: {
    name: 'AREA',
    camel: 'area',
    label: '面積',
    unit: 'km2',
  },
} as const;

export type PrefectureStatsNameCamel =
  (typeof PrefectureStatsConf)[keyof typeof PrefectureStatsConf]['camel'];
