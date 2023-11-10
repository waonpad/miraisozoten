export const PrefectureStatsName = ['AREA', 'POPULATION'] as const;

export type PrefectureStatsName = (typeof PrefectureStatsName)[number];
