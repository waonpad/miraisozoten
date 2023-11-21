import { PrefectureResponse } from 'schema/dist/prefecture';
import { GameResponse } from 'schema/dist/todoufuken/game';

import { FactorPickCount } from '../config/game';

import { computeFactors } from './compute-factors';

/**
 * @description
 * 選択肢に表示するデータを構成する関数
 * 1. 選択した都道府県のデータを取得
 * 2. 征服した都道府県のデータを取得
 * 3. 1と2のデータをシャッフルして、必要な数だけ取得
 */
export const getAllFactors = (
  prefectures: PrefectureResponse[],
  game: GameResponse
): {
  totalValue: number;
  absorbedFactors: ReturnType<typeof computeFactors>[number][];
  prefecture: PrefectureResponse;
  name: ReturnType<typeof computeFactors>[number]['name'];
  label: ReturnType<typeof computeFactors>[number]['label'];
  value: number | null;
  unit: ReturnType<typeof computeFactors>[number]['unit'];
}[] => {
  const selectedPrefecture = prefectures.find((prefecture) => prefecture.id === game.prefectureId)!;

  const conqueredPrefectures = prefectures.filter((prefecture) =>
    game.conquereds.map((conquered) => conquered.id).includes(prefecture.id)
  );

  // データを表示しなくてもどんなデータがあるかは必要なので、
  // 別で定義したオブジェクトに対して実際のデータをマッピングする
  const selectedPrefectureFactors = computeFactors(selectedPrefecture, game);

  // 制覇した都道府県のデータも表示する
  // が、制覇した都道府県のデータは、制覇した時に利用したデータしか使えない
  const conqueredPrefectureFactors = conqueredPrefectures
    .map((prefecture) => {
      const conqueredGameLog = game.logs.find(
        (log) => log.opponentId === prefecture.id && log.result === 'WIN'
      );

      return computeFactors(prefecture, game, {
        selectFactorNames: conqueredGameLog ? [conqueredGameLog.factorName] : undefined,
      });
    })
    .flat();

  // Factorが同じものは、selectedPrefecturefactorsに、conqueredPrefecturefactorsを足していく
  // 例えば、selectedPrefecturefactorsに「人口」があって、conqueredPrefecturefactorsにも「人口」がある場合、
  // 「人口」は1つにまとめる

  const mergedFactors = selectedPrefectureFactors.map((factor) => {
    const sameFactors = conqueredPrefectureFactors.filter(
      (conqueredFactor) => conqueredFactor.name === factor.name
    );

    return {
      ...factor,
      // 全てのデータを足した値
      totalValue: [...sameFactors, factor].reduce((acc, cur) => {
        // accの小数点以下の桁数を取得
        const accDecimalDigits = String(acc).split('.')[1]?.length ?? 0;

        // curの小数点以下の桁数を取得
        const curDecimalDigits = String(cur.value).split('.')[1]?.length ?? 0;

        return Number((acc + cur.value!).toFixed(Math.max(accDecimalDigits, curDecimalDigits)));
      }, 0),
      // どの都道府県のデータが含まれているか
      absorbedFactors: sameFactors,
    };
  });

  const factors = mergedFactors
    // シャッフルしてから必要な数だけ取得
    .sort(() => Math.random() - 0.5)
    .slice(0, FactorPickCount[game.difficulty]);

  return factors;
};
