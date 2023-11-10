import { GameDifficulty } from 'database';

import { PrefectureStatsName } from '../../prefecture/stats/prefecture-stats.enum';

// 難易度ごとにprefectureStatsごとに選択肢に出すかどうかを決める
export const GameDifficultyConfig = {
  prefectureStatsLowestEnableDifficulty: {
    POPULATION: 'EASY',
    AREA: 'EASY',
  } satisfies { [key in PrefectureStatsName]: GameDifficulty },
} as const;
