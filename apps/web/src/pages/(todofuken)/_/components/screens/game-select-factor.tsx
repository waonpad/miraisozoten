import { Prefecture } from 'database';
import { PrefectureResponse } from 'schema/dist/prefecture';
import { PrefectureStatsName, PrefectureStatsConfig } from 'schema/dist/prefecture/stats';
import { GameDifficulty, GameDifficultyConfig, GameResponse } from 'schema/dist/todofuken/game';
import { Button } from 'ui/components/ui/button';

import { usePrefectures } from '../../api/get-prefectures';
import { PickCount } from '../../config/game';
import { useGame } from '../../hooks/use-game';

export const GameSelectFactor = () => {
  const { game, changeScreenNext, setTurnAct } = useGame();

  if (!game) throw new Error('game is not found');

  // 都道府県のデータを取得
  const prefecturesQuery = usePrefectures();

  if (!prefecturesQuery.data) {
    return <div>loading...</div>;
  }

  const factors = getAllFactors(prefecturesQuery.data, game);

  const handleClcikSelectFactor = (
    factorPrefectureId: Prefecture['id'],
    factorName: PrefectureStatsName
  ) => {
    setTurnAct((prev) => ({
      ...prev,
      factorPrefectureId,
      factorName,
    }));

    changeScreenNext();
  };

  return (
    <div>
      {factors.map((factor, index) => (
        <Button
          key={index}
          onClick={() => handleClcikSelectFactor(factor.prefecture.id, factor.name)}
        >
          {factor.prefecture.name}
          {factor.label}
          {!game.hideData && (
            <div>
              {factor.value}
              {factor.unit}
            </div>
          )}
        </Button>
      ))}
    </div>
  );
};

/**
 * @description
 * 1. 選択した都道府県のデータを取得
 * 2. 征服した都道府県のデータを取得
 * 3. 1と2のデータをシャッフルして、必要な数だけ取得
 */
const getAllFactors = (prefectures: PrefectureResponse[], game: GameResponse) => {
  const selectedPrefecture = prefectures.find(
    (prefecture) => prefecture.id === game.prefectureId
  ) as PrefectureResponse; // 確実に存在することがわかっている

  const conqueredPrefectures = prefectures.filter((prefecture) => {
    const conqueredPrefectureIds = game.conquereds.map((conquered) => conquered.id);

    return conqueredPrefectureIds.includes(prefecture.id);
  });

  // データを表示しなくてもどんなデータがあるかは必要なので、
  // 別で定義したオブジェクトに対して実際のデータをマッピングする
  const selectedPrefecturefactors = computeFactors(selectedPrefecture, game);

  // 征服した都道府県のデータも表示する
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
    .slice(0, PickCount[game.difficulty]);

  return factors;
};

/**
 * @description
 * 1. 表示するデータの名前が指定されている場合は、そのデータのみを選択する
 * 2. そうでない場合、全てのデータを選択する
 * 3. ゲームの難易度によって、表示するデータを制限する
 * 4. データをマッピングして返す
 */
const computeFactors = (
  prefecture: PrefectureResponse,
  game: GameResponse,
  {
    selectFactorNames,
  }: {
    selectFactorNames?: PrefectureStatsName[];
  } = {}
) => {
  const selectedPrefectureStatsConfig = Object.values(PrefectureStatsConfig).filter((conf) => {
    // 選択するデータの名前が指定されている場合は、そのデータのみを選択する
    // そうでない場合、全てのデータを選択する
    return selectFactorNames ? selectFactorNames.includes(conf.name) : true;
  });

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
