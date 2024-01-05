import { PrefectureStatsName } from './prefecture-stats.enum';

// prettier-ignore
export const PrefectureStatsConfig = {
  IMPORTANT_CULTURAL_PROPERTY_COUNT: {
    name: 'IMPORTANT_CULTURAL_PROPERTY_COUNT',
    camel: 'importantCulturalPropertyCount',
    label: '国宝・重要文化財数（建造物）',
    unit: '棟',
  },
  ACADEMICABILITY: {
    name: 'ACADEMICABILITY',
    camel: 'academicability',
    label: '全国学力テスト正答率',
    unit: '%',
  },
  ANNUAL_PRECIPITATION: {
    name: 'ANNUAL_PRECIPITATION',
    camel: 'annualPrecipitation',
    label: '年間降水量',
    unit: 'mm',
  },
  AREA: {
    name: 'AREA',
    camel: 'area',
    label: '面積',
    unit: 'km2',
  },
  ARTMUSEUM_COUNT: {
    name: 'ARTMUSEUM_COUNT',
    camel: 'artmuseumCount',
    label: '美術館数',
    unit: '館',
  },
  ATTRACTIVENESS_RANKING: {
    name: 'ATTRACTIVENESS_RANKING',
    camel: 'attractivenessRanking',
    label: '魅力度ランキング',
    unit: '点',
  },
  AVERAGE_TEMPERATURE: {
    name: 'AVERAGE_TEMPERATURE',
    camel: 'averageTemperature',
    label: '平均気温',
    unit: '℃',
  },
  DETACHED_HOUSE_RATE: {
    name: 'DETACHED_HOUSE_RATE',
    camel: 'detachedHouseRate',
    label: '戸建て率',
    unit: '%',
  },
  DEVIATION_VALUE: {
    name: 'DEVIATION_VALUE',
    camel: 'deviationValue',
    label: '大学偏差値',
    unit: '点',
  },
  ELEMENTARY_SCHOOL_COUNT: {
    name: 'ELEMENTARY_SCHOOL_COUNT',
    camel: 'elementarySchoolCount',
    label: '小学校の数',
    unit: '校',
  },
  GARBAGE_RECYCLING_RATE: {
    name: 'GARBAGE_RECYCLING_RATE',
    camel: 'garbageRecyclingRate',
    label: 'ゴミのリサイクル率',
    unit: '%',
  },
  G_D_P: {
    name: 'G_D_P',
    camel: 'gDP',
    label: 'GDP',
    unit: '100万円',
  },
  HOMETOWN_TAX: {
    name: 'HOMETOWN_TAX',
    camel: 'hometownTax',
    label: 'ふるさと納税利用者数',
    unit: '人',
  },
  KOSHIEN_COUNT: {
    name: 'KOSHIEN_COUNT',
    camel: 'koshienCount',
    label: '甲子園勝利数',
    unit: '勝',
  },
  NATURAL_MONUMENT_COUNT: {
    name: 'NATURAL_MONUMENT_COUNT',
    camel: 'naturalMonumentCount',
    label: '天然記念物数',
    unit: '件',
  },
  POPULATION: {
    name: 'POPULATION',
    camel: 'population',
    label: '人口',
    unit: '人',
  },
  RICE_PRODUCTION_RATE: {
    name: 'RICE_PRODUCTION_RATE',
    camel: 'riceProductionRate',
    label: 'お米生産率',
    unit: 'ｔ',
  },
  SHRINE_COUNT: {
    name: 'SHRINE_COUNT',
    camel: 'shrineCount',
    label: '神社の数',
    unit: '社',
  },
  SOCCER_POPULATION: {
    name: 'SOCCER_POPULATION',
    camel: 'soccerPopulation',
    label: 'サッカー人口',
    unit: '人',
  },
  STATION_COUNT: {
    name: 'STATION_COUNT',
    camel: 'stationCount',
    label: '駅の数',
    unit: '個',
  },
  SUGAR_CONSUMPTION: {
    name: 'SUGAR_CONSUMPTION',
    camel: 'sugarConsumption',
    label: '砂糖消費量',
    unit: 'g',
  },
  APPLE_CONSUMPTION: {
    name: 'APPLE_CONSUMPTION',
    camel: 'appleConsumption',
    label: '林檎の消費量',
    unit: 'g',
  },
  BRIDGE_COUNT: {
    name: 'BRIDGE_COUNT',
    camel: 'bridgeCount',
    label: '橋梁数',
    unit: '本',
  },
  CONVENIENCE_STORE_COUNT: {
    name: 'CONVENIENCE_STORE_COUNT',
    camel: 'convenienceStoreCount',
    label: 'コンビニエンスストア数',
    unit: '店',
  },
  FOREST_AREA: {
    name: 'FOREST_AREA',
    camel: 'forestArea',
    label: '森林面積',
    unit: 'ha',
  },
  KEROSENE_PRICE: {
    name: 'KEROSENE_PRICE',
    camel: 'kerosenePrice',
    label: '灯油価格',
    unit: '円',
  },
  MORNING_READING_ENFORCEMENT_RATE: {
    name: 'MORNING_READING_ENFORCEMENT_RATE',
    camel: 'morningReadingEnforcementRate',
    label: '朝の読書実施率',
    unit: '%',
  },
  POST_OFFICE_COUNT: {
    name: 'POST_OFFICE_COUNT',
    camel: 'postOfficeCount',
    label: '郵便局数',
    unit: '局',
  },
  RICE_CONSUMPTION: {
    name: 'RICE_CONSUMPTION',
    camel: 'riceConsumption',
    label: 'ご飯消費量',
    unit: '杯',
  },
  STARBUCKS_COUNT: {
    name: 'STARBUCKS_COUNT',
    camel: 'starbucksCount',
    label: 'スターバックス店舗数',
    unit: '軒',
  },
  TUNNEL_COUNT: {
    name: 'TUNNEL_COUNT',
    camel: 'tunnelCount',
    label: 'トンネル数',
    unit: '本',
  },
  UNIQLO_COUNT: {
    name: 'UNIQLO_COUNT',
    camel: 'uniqloCount',
    label: 'ユニクロ店舗数',
    unit: '軒',
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
