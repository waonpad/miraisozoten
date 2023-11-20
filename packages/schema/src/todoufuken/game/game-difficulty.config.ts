import { GameDifficulty } from 'database';

import { PrefectureStatsName } from '../../prefecture/stats/prefecture-stats.enum';

export const GameDifficultyConfig = {
  // prettier-ignore
  prefectureStatsLowestEnableDifficulty: {
    AREA: 'EASY',
    POPULATION: 'EASY',
    IMPORTANT_CULTURAL_PROPERTY_COUNT: 'EASY',
    ACADEMICABILITY: 'EASY',
    ANNUAL_PRECIPITATION: 'EASY',
    ARTMUSEUM_COUNT: 'EASY',
    ATTRACTIVENESS_RANKING: 'EASY',
    AVERAGE_TEMPERATURE: 'EASY',
    DETACHED_HOUSE_RATE: 'EASY',
    DEVIATION_VALUE: 'EASY',
    ELEMENTARY_SCHOOL_COUNT: 'EASY',
    GARBAGE_RECYCLING_RATE: 'EASY',
    G_D_P: 'EASY',
    HOMETOWN_TAX: 'EASY',
    KOSHIEN_COUNT: 'EASY',
    NATURAL_MONUMENT_COUNT: 'EASY',
    RICE_PRODUCTION_RATE: 'EASY',
    SHRINE_COUNT: 'EASY',
    SOCCER_POPULATION: 'EASY',
    STATION_COUNT: 'EASY',
    SUGAR_CONSUMPTION: 'EASY',
  } satisfies { [key in PrefectureStatsName]: GameDifficulty },
} as const;
