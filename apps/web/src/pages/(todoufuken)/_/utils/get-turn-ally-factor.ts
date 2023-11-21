import { PrefectureResponse } from 'schema/dist/prefecture';
import { PrefectureStatsName } from 'schema/dist/prefecture/stats';
import { GameResponse } from 'schema/dist/todoufuken/game';

import { computeFactors } from './compute-factors';

/**
 * @description
 * ターンに使用した統計データに関する、これまでの制覇した都道府県の情報を取得するための関数
 */
export const getTurnAllyFactor = (
  prefectures: PrefectureResponse[],
  game: GameResponse,
  factorName: PrefectureStatsName
): {
  totalValue: number;
  absorbedFactors: ReturnType<typeof computeFactors>[number][];
  prefecture: PrefectureResponse;
  name: ReturnType<typeof computeFactors>[number]['name'];
  label: ReturnType<typeof computeFactors>[number]['label'];
  value: number | null;
  unit: ReturnType<typeof computeFactors>[number]['unit'];
} => {
  const currentTurnGameLog = game.logs[game.logs.length - 1];

  const selectedPrefecture = prefectures.find((prefecture) => prefecture.id === game.prefectureId)!;

  const conqueredPrefectures = prefectures.filter(
    (prefecture) =>
      game.conquereds.map((conquered) => conquered.id).includes(prefecture.id) &&
      // このターンに対戦した相手の都道府県は除外しないといけない
      prefecture.id !== currentTurnGameLog.opponentId
  );

  const selectedPrefectureFactor = computeFactors(
    selectedPrefecture,
    {
      difficulty: 'VERY_HARD',
      hideData: false,
    } as GameResponse, // HACK: 関数をハックしている
    {
      selectFactorNames: [factorName],
    }
  )[0];

  const conqueredPrefectureFactors = conqueredPrefectures
    .map((prefecture) => {
      const conqueredGameLog = game.logs.find(
        (log) =>
          log.opponentId === prefecture.id && log.result === 'WIN' && log.factorName === factorName
      );

      if (!conqueredGameLog) {
        return null;
      }

      return computeFactors(
        prefecture,
        {
          difficulty: 'VERY_HARD',
          hideData: false,
        } as GameResponse, // HACK: 関数をハックしている
        {
          selectFactorNames: [conqueredGameLog.factorName],
        }
      )[0];
    })
    .filter((factor) => factor !== null) as ReturnType<typeof computeFactors>[number][];

  const mergedFactor = {
    totalValue:
      selectedPrefectureFactor.value! +
      conqueredPrefectureFactors.reduce((prev, current) => {
        console.log(current.value, prev);

        // prevの小数点以下の桁数を取得
        const prevDecimalDigits = String(prev).split('.')[1]?.length ?? 0;
        // currentの小数点以下の桁数を取得
        const currentDecimalDigits = String(current.value).split('.')[1]?.length ?? 0;

        return Number(
          (prev + current.value!).toFixed(Math.max(prevDecimalDigits, currentDecimalDigits))
        );
      }, 0),
    absorbedFactors: conqueredPrefectureFactors,
    ...selectedPrefectureFactor,
  };

  return mergedFactor;
};
