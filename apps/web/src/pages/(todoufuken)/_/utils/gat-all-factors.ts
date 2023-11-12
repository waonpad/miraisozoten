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
export const getAllFactors = (prefectures: PrefectureResponse[], game: GameResponse) => {
  const selectedPrefecture = prefectures.find((prefecture) => prefecture.id === game.prefectureId)!;

  const conqueredPrefectures = prefectures.filter((prefecture) => {
    const conqueredPrefectureIds = game.conquereds.map((conquered) => conquered.id);

    return conqueredPrefectureIds.includes(prefecture.id);
  });

  // データを表示しなくてもどんなデータがあるかは必要なので、
  // 別で定義したオブジェクトに対して実際のデータをマッピングする
  const selectedPrefecturefactors = computeFactors(selectedPrefecture, game);

  // 制覇した都道府県のデータも表示する
  // が、制覇した都道府県のデータは、制覇した時に利用したデータしか使えない
  const conqueredPrefecturefactors = conqueredPrefectures
    .map((prefecture) => {
      const conqueredGameLog = game.logs.find((log) => log.opponentId === prefecture.id);

      return computeFactors(prefecture, game, {
        selectFactorNames: conqueredGameLog ? [conqueredGameLog.factorName] : undefined,
      });
    })
    .flat();

  const factors = [...selectedPrefecturefactors, ...conqueredPrefecturefactors]
    // シャッフルしてから必要な数だけ取得
    .sort(() => Math.random() - 0.5)
    .slice(0, FactorPickCount[game.difficulty]);

  return factors;
};
