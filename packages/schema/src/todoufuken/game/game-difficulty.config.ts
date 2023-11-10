import { GameDifficulty } from 'database';

import { PrefectureStatsName } from '../../prefecture/stats/prefecture-stats.enum';

export const GameDifficultyConfig = {
  // prettier-ignore
  prefectureStatsLowestEnableDifficulty: {
    AREA: 'EASY',
    POPULATION: 'EASY',
  } satisfies { [key in PrefectureStatsName]: GameDifficulty },
} as const;
