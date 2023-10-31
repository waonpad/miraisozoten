export const PrefectureStatsConfig = {
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
  (typeof PrefectureStatsConfig)[keyof typeof PrefectureStatsConfig]['camel'];
