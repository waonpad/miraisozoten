import { PrefectureResponse } from 'schema/dist/prefecture';
import { PrefectureStatsName } from 'schema/dist/prefecture/stats';
import { GameResponse } from 'schema/dist/todoufuken/game';

import { computeFactors } from './compute-factors';

/**
 * ターンに使用した統計データを首都kうするための関数
 */
export const getTurnFactor = ({
  factorName,
  prefectures,
  prefectureId,
}: {
  factorName: PrefectureStatsName;
  prefectures: PrefectureResponse[];
  prefectureId: PrefectureResponse['id'];
}) => {
  return computeFactors(
    prefectures.find((prefecture) => prefecture.id === prefectureId)!,
    {
      difficulty: 'VERY_HARD',
      hideData: false,
    } as GameResponse, // HACK: 関数をハックしている
    {
      selectFactorNames: [factorName],
    }
  )[0];
};
