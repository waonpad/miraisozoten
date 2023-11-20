export const PrefectureStatsName = [
  'IMPORTANT_CULTURAL_PROPERTY_COUNT',
  'ACADEMICABILITY',
  'ANNUAL_PRECIPITATION',
  'AREA',
  'ARTMUSEUM_COUNT',
  'ATTRACTIVENESS_RANKING',
  'AVERAGE_TEMPERATURE',
  'DETACHED_HOUSE_RATE',
  'DEVIATION_VALUE',
  'ELEMENTARY_SCHOOL_COUNT',
  'GARBAGE_RECYCLING_RATE',
  'G_D_P',
  'HOMETOWN_TAX',
  'KOSHIEN_COUNT',
  'NATURAL_MONUMENT_COUNT',
  'POPULATION',
  'RICE_PRODUCTION_RATE',
  'SHRINE_COUNT',
  'SOCCER_POPULATION',
  'STATION_COUNT',
  'SUGAR_CONSUMPTION',
] as const;

export type PrefectureStatsName = (typeof PrefectureStatsName)[number];
