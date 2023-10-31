export const PrefectureStatsName = ['POPULATION', 'AREA'] as const;

export type PrefectureStatsName = (typeof PrefectureStatsName)[number];
