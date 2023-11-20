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
  IMPORTANT_CULTURAL_PROPERTY_COUNT: {
    name: 'IMPORTANT_CULTURAL_PROPERTY_COUNT',
    camel: 'importantCulturalPropertyCount',
    label: '',
    unit: '',
  },
  ACADEMICABILITY: {
    name: 'ACADEMICABILITY',
    camel: 'academicability',
    label: '',
    unit: '',
  },
  ANNUAL_PRECIPITATION: {
    name: 'ANNUAL_PRECIPITATION',
    camel: 'annualPrecipitation',
    label: '',
    unit: '',
  },
  ARTMUSEUM_COUNT: {
    name: 'ARTMUSEUM_COUNT',
    camel: 'artmuseumCount',
    label: '',
    unit: '',
  },
  ATTRACTIVENESS_RANKING: {
    name: 'ATTRACTIVENESS_RANKING',
    camel: 'attractivenessRanking',
    label: '',
    unit: '',
  },
  AVERAGE_TEMPERATURE: {
    name: 'AVERAGE_TEMPERATURE',
    camel: 'averageTemperature',
    label: '',
    unit: '',
  },
  DETACHED_HOUSE_RATE: {
    name: 'DETACHED_HOUSE_RATE',
    camel: 'detachedHouseRate',
    label: '',
    unit: '',
  },
  DEVIATION_VALUE: {
    name: 'DEVIATION_VALUE',
    camel: 'deviationValue',
    label: '',
    unit: '',
  },
  ELEMENTARY_SCHOOL_COUNT: {
    name: 'ELEMENTARY_SCHOOL_COUNT',
    camel: 'elementarySchoolCount',
    label: '',
    unit: '',
  },
  GARBAGE_RECYCLING_RATE: {
    name: 'GARBAGE_RECYCLING_RATE',
    camel: 'garbageRecyclingRate',
    label: '',
    unit: '',
  },
  G_D_P: {
    name: 'G_D_P',
    camel: 'gDP',
    label: '',
    unit: '',
  },
  HOMETOWN_TAX: {
    name: 'HOMETOWN_TAX',
    camel: 'hometownTax',
    label: '',
    unit: '',
  },
  KOSHIEN_COUNT: {
    name: 'KOSHIEN_COUNT',
    camel: 'koshienCount',
    label: '',
    unit: '',
  },
  NATURAL_MONUMENT_COUNT: {
    name: 'NATURAL_MONUMENT_COUNT',
    camel: 'naturalMonumentCount',
    label: '',
    unit: '',
  },
  RICE_PRODUCTION_RATE: {
    name: 'RICE_PRODUCTION_RATE',
    camel: 'riceProductionRate',
    label: '',
    unit: '',
  },
  SHRINE_COUNT: {
    name: 'SHRINE_COUNT',
    camel: 'shrineCount',
    label: '',
    unit: '',
  },
  SOCCER_POPULATION: {
    name: 'SOCCER_POPULATION',
    camel: 'soccerPopulation',
    label: '',
    unit: '',
  },
  STATION_COUNT: {
    name: 'STATION_COUNT',
    camel: 'stationCount',
    label: '',
    unit: '',
  },
  SUGAR_CONSUMPTION: {
    name: 'SUGAR_CONSUMPTION',
    camel: 'sugarConsumption',
    label: '',
    unit: '',
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
