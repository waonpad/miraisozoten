import { PrefectureResponse } from 'schema/dist/prefecture';
import { PrefectureStatsConfig, PrefectureStatsName } from 'schema/dist/prefecture/stats';
import { GameResponse, GameDifficultyConfig, GameDifficulty } from 'schema/dist/todoufuken/game';

/**
 * @description
 * 統計データをマッピングする関数
 */
export const computeFactors = (
  prefecture: PrefectureResponse,
  game: GameResponse,
  {
    selectFactorNames,
  }: {
    selectFactorNames?: PrefectureStatsName[];
  } = {}
) => {
  /**
   * @description
   * 表示するデータの名前が指定されている場合は、そのデータのみを選択する \
   * そうでない場合、全てのデータを選択する
   */
  const selectedPrefectureStatsConfig = Object.values(PrefectureStatsConfig).filter((conf) => {
    return selectFactorNames ? selectFactorNames.includes(conf.name) : true;
  });

  /**
   * 1. ゲームの難易度によって、表示するデータを制限する
   * 2. データをマッピングして返す
   */
  return selectedPrefectureStatsConfig
    .filter((conf) => {
      // そのデータを表示する最低難易度が、設定配列のどのindexにあるかを取得
      const prefectureStatsLowestEnableDifficultyIndex = GameDifficulty.indexOf(
        GameDifficultyConfig.prefectureStatsLowestEnableDifficulty[conf.name]
      );

      // ゲームの難易度が、設定配列のどのindexにあるかを取得
      const gameDifficultyIndex = GameDifficulty.indexOf(game.difficulty);

      // 表示する最低難易度が、ゲームの難易度以下なら表示する
      return prefectureStatsLowestEnableDifficultyIndex <= gameDifficultyIndex;
    })
    .map((conf) => {
      const stats = prefecture.stats?.[conf.camel];

      return {
        prefecture: prefecture,
        name: conf.name,
        label: conf.label,
        // データを隠す目的はセキュリティのためではないため、JSで簡易的に隠してしまう
        value: game.hideData ? null : stats,
        unit: conf.unit,
      };
    });
};
